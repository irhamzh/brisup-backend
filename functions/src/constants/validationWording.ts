const aprroveStatusDashboard: {
  [key: string]: string;
} = {
  'Proses Persetujuan':
    'Untuk mengubah status ke "Proses Persetujuan" pastikan kegiatan sedang dalam Proses "Belum Berjalan"',
  'Approved oleh Supervisor':
    'Untuk mengubah status ke "Approved oleh Supervisor" pastikan kegiatan sedang dalam Proses "Proses Persetujuan"',
  'Approved oleh Wakabag':
    'Untuk mengubah status ke "Approved oleh Wakabag" pastikan kegiatan sedang dalam Proses "Approved oleh Supervisor"',
  'Approved oleh Kabag':
    'Untuk mengubah status ke "Approved oleh Kabag" pastikan kegiatan sedang dalam Proses "Approved oleh Supervisor"',
  Selesai:
    'Untuk mengubah status ke "Selesai" pastikan kegiatan sedang dalam Proses "Approved oleh Kabag" atau "Approved oleh Wakabag"',
};

export default {
  invalid: (name: string) => `${name} tidak valid`,
  minLength: (min: number) => `Password minimal ${min} angka`,
  required: (name: string) => `${name} tidak boleh kosong`,
  notFound: (name: string) => `${name} tidak ditemukan`,
  incorrect: (name: string) => `${name} salah`,
  invalidNextStatus: (currentStatus: string, targetStatus: string) =>
    `Tidak bisa mengubah status. Status sekarang "${currentStatus}". ${aprroveStatusDashboard[targetStatus]}`,
  duplicate: (name: string, value: string) => `${name} ${value} telah dipakai`,
  oneOf: (name: string, ...args: Array<string | number>) =>
    `${name} harus salah satu diantara ${args.map((v) => `'${v}'`).join(', ')}`,
};
