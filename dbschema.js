const { stringify } = require('querystring');

let db = {
  users: [
    {
      userId: 'string',
      name: 'string',
      email: 'string',
      password: 'string',
      imageUrl: 'string',
      role: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
  ],
  vendors: [
    {
      vendorId: 'string',
      nama: 'string',
      alamat: 'string',
      nomorKontak: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
  ],
  persekots: [
    {
      persekotId: 'string',
      tanggal: 'date',
      namaKegiatan: 'string',
      nominalBiaya: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
  ],
};
