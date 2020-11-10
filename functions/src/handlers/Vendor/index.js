const { db } = require('../../utils/admin')
const formatISO = require('date-fns/formatISO')

exports.getAllVendor = (req, res) => {
  let dataVendor = []

  db.collection('vendors')
  .orderBy('createdAt', 'desc')
  .get()
  .then(data => {
    data.forEach(doc => dataVendor.push(doc.data()))

    return res.json({success: true, data: dataVendor})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.getVendor = (req, res) => {
  const { id } = req.params
  let dataVendor = {}

  db.doc(`/vendors/${id}`)
  .get()
  .then(dox => {
    if(!doc.exists) {
      return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
    }

    dataVendor = doc.data()
    return res.json({success: true, data: dataVendor})
  })
  .catch(err => {
    console.log(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.createVendor = async (req, res) => {
  const {
    nama,
	  alamat,
    nomorKontak,
  } = req.body

  const newVendor = await db.collection('vendors')
  .add({
    nama,
    alamat,
    nomorKontak,
    createdAt: formatISO(new Date(), {locale: 'id'}),
    updatedAt: formatISO(new Date(), {locale: 'id'})
  })

  db.doc(`/vendors/${newVendor.id}`)
  .update({id : newVendor.id})
  .then(() => {
    return res.json({success: true, message: 'Vendor berhasil ditambahkan!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.updateVendor = async (req, res) => {
  const { id } = req.params
  const {
    nama,
	  alamat,
    nomorKontak,
  } = req.body

  const dataVendor = await db.doc(`/vendors/${id}`).get()

  if(!dataVendor.exists){
    return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
  }

  db.doc(`/vendors/${id}`)
  .update({
    nama: nama || dataVendor.nama,
	  alamat: alamat || dataVendor.alamat,
    nomorKontak: nomorKontak || dataVendor.nomorKontak,
  })
  .then(() => {
    return res.json({success: true, message: 'Data berhasil diupdate!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}