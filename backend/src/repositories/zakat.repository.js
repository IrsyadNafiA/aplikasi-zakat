import prisma from "../config/prisma.js";

const getRemarks = async () => {
  try {
    const remarks = await prisma.remark.findMany({
      where: {
        isDeleted: null,
      },
      select: {
        id: true,
        tipe_zakat: true,
        status: true,
        muzaki_id: true,
        pengurus_id: true,
        tanggal_diajukan: true,
        tanggal_dikonfirmasi: true,
        muzaki: {
          select: {
            nama: true,
          },
        },
        pengurus: {
          select: {
            nama: true,
          },
        },
      },
    });

    const formattedRemarks = remarks.map((r) => ({
      remark_id: r.id,
      muzaki_id: r.muzaki_id,
      muzaki: r.muzaki.nama,
      pengurus_id: r.pengurus_id,
      pengurus: r.pengurus ? r.pengurus.nama : null,
      tipe_zakat: r.tipe_zakat,
      status: r.status,
      tanggal_diajukan: r.tanggal_diajukan,
      tanggal_dikonfirmasi: r.tanggal_dikonfirmasi,
    }));

    return formattedRemarks;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRemarkById = async (id) => {
  try {
    const remark = await prisma.remark.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        tipe_zakat: true,
        status: true,
        muzaki_id: true,
        pengurus_id: true,
        tanggal_diajukan: true,
        tanggal_dikonfirmasi: true,
        muzaki: {
          select: {
            nama: true,
          },
        },
        pengurus: {
          select: {
            nama: true,
          },
        },
      },
    });

    const formattedRemark = {
      remark_id: remark.id,
      muzaki_id: remark.muzaki_id,
      muzaki: remark.muzaki.nama,
      pengurus_id: remark.pengurus_id,
      pengurus: remark.pengurus ? remark.pengurus.nama : null,
      tipe_zakat: remark.tipe_zakat,
      status: remark.status,
      tanggal_diajukan: remark.tanggal_diajukan,
      tanggal_dikonfirmasi: remark.tanggal_dikonfirmasi,
    };

    return formattedRemark;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRemarksByUserId = async (id) => {
  try {
    const remarks = await prisma.remark.findMany({
      where: {
        muzaki_id: Number(id),
        isDeleted: null,
      },
      select: {
        id: true,
        tipe_zakat: true,
        status: true,
        muzaki_id: true,
        pengurus_id: true,
        tanggal_diajukan: true,
        tanggal_dikonfirmasi: true,
        muzaki: {
          select: {
            nama: true,
          },
        },
        pengurus: {
          select: {
            nama: true,
          },
        },
      },
    });

    const formattedRemarks = remarks.map((r) => ({
      remark_id: r.id,
      muzaki_id: r.muzaki_id,
      muzaki: r.muzaki.nama,
      pengurus_id: r.pengurus_id,
      pengurus: r.pengurus ? r.pengurus.nama : null,
      tipe_zakat: r.tipe_zakat,
      status: r.status,
      tanggal_diajukan: r.tanggal_diajukan,
      tanggal_dikonfirmasi: r.tanggal_dikonfirmasi,
    }));

    return formattedRemarks;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getZakatUangByRemarkId = async (id) => {
  try {
    const zakatUang = await prisma.zakat_uang.findMany({
      where: { remark_id: Number(id) },
      select: {
        id: true,
        remark_id: false,
        nama: true,
        hubungan: true,
        nisab: true,
        harga: true,
        jumlah: true,
      },
    });
    return zakatUang;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getZakatMakananByRemarkId = async (id) => {
  try {
    const zakatMakanan = await prisma.zakat_makanan.findUnique({
      where: { remark_id: Number(id) },
      select: {
        id: true,
        remark_id: false,
        tipe: true,
        jumlah_keluarga: true,
        nisab: true,
        jumlah: true,
      },
    });
    return zakatMakanan;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getFidyahByRemarkId = async (id) => {
  try {
    const fidyah = await prisma.fidyah.findUnique({
      where: { remark_id: Number(id) },
      select: {
        id: true,
        remark_id: false,
        nisab: true,
        harga: true,
        jumlah: true,
      },
    });
    return fidyah;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getInfaqByRemarkId = async (id) => {
  try {
    const infaq = await prisma.infaq.findUnique({
      where: { remark_id: Number(id) },
      select: {
        id: true,
        remark_id: false,
        jumlah: true,
      },
    });
    return infaq;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllDataLama = async (id) => {
  try {
    const remark = await getRemarkById(id);

    let formattedData = {
      remark,
      zakatData: {},
    };

    if (remark.tipe_zakat === "UANG") {
      const zakatUang = await getZakatUangByRemarkId(id);
      const fidyah = await getFidyahByRemarkId(id);
      const infaq = await getInfaqByRemarkId(id);

      formattedData.zakatData = {
        zakatUang,
        fidyah,
        infaq,
      };
    }

    if (remark.tipe_zakat === "MAKANAN") {
      const zakatMakanan = await getZakatMakananByRemarkId(id);
      formattedData.zakatData = {
        zakatMakanan,
      };
    }

    return formattedData;
  } catch (error) {
    throw new Error(error.message);
  }
};

// langsung menggunakan join menghindari masalah (N+1) dan meningkatkan performa
const getAllData = async (id) => {
  try {
    const remark = await prisma.remark.findUnique({
      where: { id: Number(id) },
      include: {
        muzaki: {
          select: { nama: true },
        },
        pengurus: {
          select: { nama: true },
        },
        Zakat_uang: {
          select: {
            id: true,
            nama: true,
            hubungan: true,
            nisab: true,
            harga: true,
            jumlah: true,
          },
        },
        Zakat_makanan: {
          select: {
            id: true,
            tipe: true,
            jumlah_keluarga: true,
            nisab: true,
            jumlah: true,
          },
        },
        Fidyah: {
          select: {
            id: true,
            nisab: true,
            harga: true,
            jumlah: true,
          },
        },
        Infaq: {
          select: {
            id: true,
            jumlah: true,
          },
        },
      },
    });

    if (!remark) {
      throw new Error("Remark not found");
    }

    const formattedRemark = {
      remark_id: remark.id,
      muzaki_id: remark.muzaki_id,
      muzaki: remark.muzaki?.nama || null,
      pengurus_id: remark.pengurus_id,
      pengurus: remark.pengurus?.nama || null,
      tipe_zakat: remark.tipe_zakat,
      status: remark.status,
      tanggal_diajukan: remark.tanggal_diajukan,
      tanggal_dikonfirmasi: remark.tanggal_dikonfirmasi,
    };

    let zakatData = {};
    if (remark.tipe_zakat === "UANG") {
      zakatData = {
        zakatUang: remark.Zakat_uang,
        fidyah: remark.Fidyah,
        infaq: remark.Infaq,
      };
    } else if (remark.tipe_zakat === "MAKANAN") {
      zakatData = {
        zakatMakanan: remark.Zakat_makanan,
      };
    }

    return {
      remark: formattedRemark,
      zakatData,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getRemarks, getRemarkById, getRemarksByUserId, getAllData };
