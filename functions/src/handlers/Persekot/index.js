const { db } = require('../../utils/admin')
const formatISO = require('date-fns/formatISO')

exports.getAllPersekot = (req, res) => {
  let dataPersekot = []

  db.collection('persekot')
  .orderBy('createdAt', 'desc')
  .get()
  .then(data => {
    data.forEach(doc => dataPersekot.push(doc.data()))

    return res.json({success: true, data: dataPersekot})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.getPersekot = (req, res) => {
  const {id} = req.params
  let dataPersekot = {}

  db.doc(`/persekot/${id}`).get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
    }

    dataPersekot = doc.data()
    return res.json({success: true, data: dataPersekot})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}


exports.createPersekot = async (req, res) => {
  const {
    tanggal,
	  namaKegiatan,
	  nominalBiaya
  } = req.body

 const newPersekot = await db.collection('persekot').add({
   tanggal,
   namaKegiatan,
   nominalBiaya,
   createdAt: formatISO(new Date(), {locale: 'id'}),
   updatedAt: formatISO(new Date(), {locale: 'id'})
  })

  db.doc(`/persekot/${newPersekot.id}`)
  .update({id: newPersekot.id})
  .then(() => {
    return res.json({ success: true, message: "Persekot berhasil ditambahkan" })
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}

exports.updatePersekot = async (req, res) => {
  const { id } = req.params
  const {
    tanggal,
	  namaKegiatan,
	  nominalBiaya
  } = req.body

  const dataPersekot = await db.doc(`/persekot/${id}`).get()
  if(!dataPersekot.exists) {
    return res.status(404).json({success: false, message: 'Data tidak ditemukan!'})
  }

  db.doc(`/persekot/${id}`)
  .update({
    tanggal: tanggal || dataPersekot.tanggal,
    namaKegiatan: namaKegiatan || dataPersekot.namaKegiatan,
    nominalBiaya: nominalBiaya || dataPersekot.nominalBiaya,
    updatedAt: formatISO(new Date(), {locale: 'id'})
  })
  .then(() => {
    return res.json({success: true, message: 'Data berhasil diupdate!'})
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({success: false, message: err.message})
  })
}