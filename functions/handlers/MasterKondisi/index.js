const { db } = require('../../utils/admin')
const formatISO = require('date-fns/formatISO')

exports.getAllMasterKondisi = (req, res) => {
  let dataMasterKondisi = []

  db.collection('masterKondisi')
  .orderBy('createdAt', 'desc')
  .get()
  .then(data => {
    data.forEach(doc => dataMasterKondisi.push(doc.data()))

    return res.json({success: true, data: dataMasterKondisi})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.getMasterKondisi = (req, res) => {
  const { id } = req.params
  let dataMasterKondisi = {}

  db.doc(`/masterKondisi/${id}`).get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
    }

    dataMasterKondisi = doc.data()
    return res.json({success: true, data: dataMasterKondisi})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.createMasterKondisi = async (req, res) => {
  const { nama } = req.body

  const newMasterKondisi = await db.collection('masterKondisi').add({
    nama,
    createdAt: formatISO(new Date(), {locale: 'id'}),
    updatedAt: formatISO(new Date(), {locale: 'id'})
  })

  db.doc(`/masterKondisi/${newMasterKondisi.id}`)
  .update({id: newMasterKondisi.id})
  .then(() => {
    return res.json({success: true, message: 'Data berhasil ditambahkan!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.updateMasterKondisi = async (req, res) => {
  const { id } = req.params
  const { nama } = req.body

  const dataMasterKondisi = await db.doc(`/masterKondisi/${id}`).get()
  if(!dataMasterKondisi.exists) {
    return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
  }

  db.doc(`/masterKondisi/${id}`)
  .update({
    nama: nama || dataMasterKondisi.nama
  })
  .then(() => {
    return res.json({success: true, message: 'Data berhasil diupdate!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}