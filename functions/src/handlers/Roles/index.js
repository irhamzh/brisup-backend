const { db } = require('../../utils/admin')
const formatISO = require('date-fns/formatISO')

exports.getAllRoles = (req, res) => {
  let dataRoles = []

  db.collection('roles')
  .orderBy('createdAt', 'desc')
  .get()
  .then(data => {
    data.forEach(doc => dataRoles.push(doc.data()))

    return res.json({success: true, data: dataRoles})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.getRole = (req, res) => {
  const { id } = req.params
  let dataRole = {}

  db.doc(`/roles/${id}`).get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
    }

    dataRole = doc.data()
    return res.json({success: true, data: dataRole})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.createRole = async (req, res) => {
  const { nama } = req.body

  const newRole = await db.collection('roles').add({
    nama,
    createdAt: formatISO(new Date(), {locale: 'id'}),
    updatedAt: formatISO(new Date(), {locale: 'id'})
  })

  db.doc(`/roles/${newRole.id}`)
  .update({id: newRole.id})
  .then(() => {
    return res.json({success: true, message: 'Data berhasil ditambahkan!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.updateRole = async (req, res) => {
  const { id } = req.params
  const { nama } = req.body

  const dataRole = await db.doc(`/roles/${id}`).get()
  if(!dataRole.exists) {
    return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
  }

  db.doc(`/roles/${id}`)
  .update({
    nama: nama || dataRole.nama
  })
  .then(() => {
    return res.json({success: true, message: 'Data berhasil diupdate!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}