const { db } = require('../../utils/admin')
const formatISO = require('date-fns/formatISO')

exports.getAllJenisBarang = (req, res) => {
  let dataJenisBarang = []

  db.collection('jenisBarang')
  .orderBy('createdAt', 'desc')
  .get()
  .then(data => {
    data.forEach(doc => dataJenisBarang.push(doc.data()))

    return res.json({success: true, data: dataJenisBarang})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.getJenisBarang = (req, res) => {
  const { id } = req.params
  let dataJenisBarang = {}

  db.doc(`/jenisBarang/${id}`).get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
    }

    dataJenisBarang = doc.data()
    return res.json({success: true, data: dataJenisBarang})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.createJenisBarang = async (req, res) => {
  const { nama } = req.body

  const newJenisBarang = await db.collection('jenisBarang').add({
    nama,
    createdAt: formatISO(new Date(), {locale: 'id'}),
    updatedAt: formatISO(new Date(), {locale: 'id'})
  })

  db.doc(`/jenisBarang/${newJenisBarang.id}`)
  .update({id: newJenisBarang.id})
  .then(() => {
    return res.json({success: true, message: 'Data berhasil ditambahkan!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.updateJenisBarang = async (req, res) => {
  const { id } = req.params
  const { nama } = req.body

  const dataJenisBarang = await db.doc(`/jenisBarang/${id}`).get()
  if(!dataJenisBarang.exists) {
    return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
  }

  db.doc(`/jenisBarang/${id}`)
  .update({
    nama: nama || dataJenisBarang.nama
  })
  .then(() => {
    return res.json({success: true, message: 'Data berhasil diupdate!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}