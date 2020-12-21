export interface IEksploitasiAnggaran {
  kode: string;
  deskripsi: string;
  tanggal: Date;
  //bri corpu
  briCorpuBreakdownAnggaran: number;
  briCorpuRealisasiAnggaran: number;
  briCorpuSisaAnggaran: number;
  briCorpu: string;
  //medan
  campusMedanBreakdownAnggaran: number;
  campusMedanRealisasiAnggaran: number;
  campusMedanSisaAnggaran: number;
  campusMedan: string;
  //padang
  campusPadangBreakdownAnggaran: number;
  campusPadangRealisasiAnggaran: number;
  campusPadangSisaAnggaran: number;
  campusPadang: string;
  //jakarta
  campusJakartaBreakdownAnggaran: number;
  campusJakartaRealisasiAnggaran: number;
  campusJakartaSisaAnggaran: number;
  campusJakarta: string;
  //Bandung
  campusBandungBreakdownAnggaran: number;
  campusBandungRealisasiAnggaran: number;
  campusBandungSisaAnggaran: number;
  campusBandung: string;
  //yogyakarta
  campusYogyakartaBreakdownAnggaran: number;
  campusYogyakartaRealisasiAnggaran: number;
  campusYogyakartaSisaAnggaran: number;
  campusYogyakarta: string;
  //surabaya
  campusSurabayaBreakdownAnggaran: number;
  campusSurabayaRealisasiAnggaran: number;
  campusSurabayaSisaAnggaran: number;
  campusSurabaya: string;
  //makassar
  campusMakassarBreakdownAnggaran: number;
  campusMakassarRealisasiAnggaran: number;
  campusMakassarSisaAnggaran: number;
  campusMakassar: string;
  //total
  totalCampusBreakdownAnggaran: number;
  totalCampusRealisasiAnggaran: number;
  totalCampusSisaAnggaran: number;
  totalCampus: string;
  createdAt?: Date;
  updatedAt?: Date;
}
