const { db } = require('../../utils/admin')
const formatISO = require('date-fns/formatISO')

exports.getAllAsset = (req, res) => {
  let dataAsset = []

  db.collection('assets')
  .orderBy('createdAt', 'desc')
  .get()
  .then(data => {
    data.forEach(doc => dataAsset.push(doc.data()))

    return res.json({success: true, data: dataAsset})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.getAsset = (req, res) => {
  const { id } = req.params
  let dataAsset = {}

  db.doc(`/assets/${id}`).get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
    }

    dataAsset = doc.data()
    return res.json({success: true, data: dataAsset})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.createAsset = async (req, res) => {
  const { nama, kodeAset } = req.body

  const newAsset = await db.collection('roles').add({
    nama,
    kodeAset,
    createdAt: formatISO(new Date(), {locale: 'id'}),
    updatedAt: formatISO(new Date(), {locale: 'id'})
  })

  db.doc(`/assets/${newAsset.id}`)
  .update({id: newAsset.id})
  .then(() => {
    return res.json({success: true, message: 'Data berhasil ditambahkan!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.updateAsset = async (req, res) => {
  const { id } = req.params
  const { nama, kodeAset } = req.body

  const dataAsset = await db.doc(`/assets/${id}`).get()
  if(!dataAsset.exists) {
    return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
  }

  db.doc(`/assets/${id}`)
  .update({
    nama: nama || dataAsset.nama,
    kodeAset: kodeAset || dataAsset.kodeAset
  })
  .then(() => {
    return res.json({success: true, message: 'Data berhasil diupdate!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}