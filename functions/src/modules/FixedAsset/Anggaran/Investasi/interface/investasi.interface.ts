export interface IInvestasiAnggaran {
  kode: string;
  deskripsi: string;
  tanggal: Date;
  //bri corpu
  briCorpuBreakdownAnggaranBiayaSatuan: number;
  briCorpuBreakdownAnggaranJumlah: number;
  briCorpuBreakdownAnggaranTotalBiaya: number;
  briCorpuRealisasiAnggaranBiayaSatuan: number;
  briCorpuRealisasiAnggaranJumlah: number;
  briCorpuRealisasiAnggaranTotalBiaya: number;
  briCorpuSisaAnggaran: number;
  briCorpu: string;
  //medan
  campusMedanBreakdownAnggaranBiayaSatuan: number;
  campusMedanBreakdownAnggaranJumlah: number;
  campusMedanBreakdownAnggaranTotalBiaya: number;
  campusMedanRealisasiAnggaranBiayaSatuan: number;
  campusMedanRealisasiAnggaranJumlah: number;
  campusMedanRealisasiAnggaranTotalBiaya: number;
  campusMedanSisaAnggaran: number;
  campusMedan: string;
  //padang
  campusPadangBreakdownAnggaranBiayaSatuan: number;
  campusPadangBreakdownAnggaranJumlah: number;
  campusPadangBreakdownAnggaranTotalBiaya: number;
  campusPadangRealisasiAnggaranBiayaSatuan: number;
  campusPadangRealisasiAnggaranJumlah: number;
  campusPadangRealisasiAnggaranTotalBiaya: number;
  campusPadangSisaAnggaran: number;
  campusPadang: string;
  //jakarta
  campusJakartaBreakdownAnggaranBiayaSatuan: number;
  campusJakartaBreakdownAnggaranJumlah: number;
  campusJakartaBreakdownAnggaranTotalBiaya: number;
  campusJakartaRealisasiAnggaranBiayaSatuan: number;
  campusJakartaRealisasiAnggaranJumlah: number;
  campusJakartaRealisasiAnggaranTotalBiaya: number;
  campusJakartaSisaAnggaran: number;
  campusJakarta: string;
  //Bandung
  campusBandungBreakdownAnggaranBiayaSatuan: number;
  campusBandungBreakdownAnggaranJumlah: number;
  campusBandungBreakdownAnggaranTotalBiaya: number;
  campusBandungRealisasiAnggaranBiayaSatuan: number;
  campusBandungRealisasiAnggaranJumlah: number;
  campusBandungRealisasiAnggaranTotalBiaya: number;
  campusBandungSisaAnggaran: number;
  campusBandung: string;
  //yogyakarta
  campusYogyakartaBreakdownAnggaranBiayaSatuan: number;
  campusYogyakartaBreakdownAnggaranJumlah: number;
  campusYogyakartaBreakdownAnggaranTotalBiaya: number;
  campusYogyakartaRealisasiAnggaranBiayaSatuan: number;
  campusYogyakartaRealisasiAnggaranJumlah: number;
  campusYogyakartaRealisasiAnggaranTotalBiaya: number;
  campusYogyakartaSisaAnggaran: number;
  campusYogyakarta: string;
  //surabaya
  campusSurabayaBreakdownAnggaranBiayaSatuan: number;
  campusSurabayaBreakdownAnggaranJumlah: number;
  campusSurabayaBreakdownAnggaranTotalBiaya: number;
  campusSurabayaRealisasiAnggaranBiayaSatuan: number;
  campusSurabayaRealisasiAnggaranJumlah: number;
  campusSurabayaRealisasiAnggaranTotalBiaya: number;
  campusSurabayaSisaAnggaran: number;
  campusSurabaya: string;
  //makassar
  campusMakassarBreakdownAnggaranBiayaSatuan: number;
  campusMakassarBreakdownAnggaranJumlah: number;
  campusMakassarBreakdownAnggaranTotalBiaya: number;
  campusMakassarRealisasiAnggaranBiayaSatuan: number;
  campusMakassarRealisasiAnggaranJumlah: number;
  campusMakassarRealisasiAnggaranTotalBiaya: number;
  campusMakassarSisaAnggaran: number;
  campusMakassar: string;
  //total
  totalCampusBreakdownAnggaranBiayaSatuan: number;
  totalCampusBreakdownAnggaranJumlah: number;
  totalCampusBreakdownAnggaranTotalBiaya: number;
  totalCampusRealisasiAnggaranBiayaSatuan: number;
  totalCampusRealisasiAnggaranJumlah: number;
  totalCampusRealisasiAnggaranTotalBiaya: number;
  totalCampusSisaAnggaran: number;
  totalCampus: string;
  createdAt?: Date;
  updatedAt?: Date;
}
