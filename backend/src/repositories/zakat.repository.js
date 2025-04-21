import prisma from "../config/prisma.js";
import response from "../utils/response.js";

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
      pengurus: r.pengurus.nama,
      tipe_zakat: r.tipe_zakat,
      status: r.status,
      tanggal_diajukan: r.tanggal_diajukan,
      tanggal_dikonfirmasi: r.tanggal_dikonfirmasi,
    }));

    return formattedRemarks;
  } catch (error) {
    response(500, null, error.message, res);
  }
};

const getRemarksById = async (id) => {
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
      pengurus: r.pengurus.nama,
      tipe_zakat: r.tipe_zakat,
      status: r.status,
      tanggal_diajukan: r.tanggal_diajukan,
      tanggal_dikonfirmasi: r.tanggal_dikonfirmasi,
    }));

    return formattedRemarks;
  } catch (error) {
    response(500, null, error.message, res);
  }
};

const getAllZakat = async () => {
  const zakat = await prisma.zakat_uang.findMany();
  return zakat;
};

export { getRemarks, getAllZakat, getRemarksById };
