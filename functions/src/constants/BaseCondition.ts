export enum BaseCondition {
  'Baik' = 'Baik',
  'Belum Ditentukan' = 'Belum Ditentukan',
  'Buruk' = 'Buruk',
}

export enum BaseCondition1 {
  'Baik' = 'Baik',
  'Buruk' = 'Buruk',
}

export enum YesNo {
  yes = 'Ya',
  no = 'Tidak',
}

export enum JenisAnggaran {
  investasi = 'Investasi',
  eksploitasi = 'Eksploitasi',
}

export enum Division {
  'Fixed Asset' = 'Fixed Asset',
  'Procurement' = 'Procurement',
  'General Affair' = 'General Affair',
  'Financial Admin' = 'Financial Admin',
}

export enum DivisionUser {
  'Fixed Asset' = 'Fixed Asset',
  'Procurement' = 'Procurement',
  'General Affair' = 'General Affair',
  'Financial Admin' = 'Financial Admin',
  'All' = 'All',
}

export enum StatusPengadaan {
  'Belum Berjalan' = 'Belum Berjalan',
  'Proses Persetujuan' = 'Proses Persetujuan',
  'Approved oleh Supervisor' = 'Approved oleh Supervisor',
  'Approved oleh Wakabag' = 'Approved oleh Wakabag',
  'Approved oleh Kabag' = 'Approved oleh Kabag',
  // 'Belum Selesai' = 'Belum Selesai',
  'Selesai' = 'Selesai',
}

export enum ApprovalStatus {
  'Unapproved' = 'Unapproved',
  'Approved oleh Supervisor I' = 'Approved oleh Supervisor I',
  'Diajukan Penihilan' = 'Diajukan Penihilan',
  'Approved oleh Supervisor II' = 'Approved oleh Supervisor II',
  'Approved oleh Wakabag' = 'Approved oleh Wakabag',
  'Approved oleh Kabag' = 'Approved oleh Kabag',
}

export enum ApprovalNextStatus {
  'Unapproved' = 'Approved oleh Supervisor I',
  'Approved oleh Supervisor I' = 'Diajukan Penihilan',
  'Diajukan Penihilan' = 'Approved oleh Supervisor II',
}

/**
 *** Approve Penihilan
 * -> Unapproved
 * -> Approved oleh Supervisor I
 * -> Diajukan Penihilan
 * -> Approved oleh Supervisor II
 * -> Approved oleh Kabag /Approved oleh Wakabag
 */
/**
 *** Dashboard
 * belm
 *
 */
