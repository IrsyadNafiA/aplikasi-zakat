import prisma from "../config/prisma.js";
import {
  getAllData,
  getRemarkById,
  getRemarks,
  getRemarksByUserId,
} from "../repositories/zakat.repository.js";
import { isObjectEmpty } from "../utils/isObjectEmpty.js";
import response from "../utils/response.js";
import {
  remarksSchema,
  updateRemarksSchema,
} from "../utils/validations/remarksValidation.js";
import {
  updateZakatMakananSchema,
  zakatMakananSchema,
} from "../utils/validations/zakatMakananValidation.js";
import {
  fidyahSchema,
  infaqSchema,
  updateFidyahSchema,
  updateInfaqSchema,
  updateZakatUangSchema,
  zakatUangSchema,
} from "../utils/validations/zakatUangValidation.js";

const createZakat = async (req, res) => {
  try {
    const { muzaki_id, remark, zakatData } = req.body;
    const remarkParsed = remarksSchema.parse(remark);

    // Check existing user
    const user = await prisma.user.findUnique({
      where: { id: muzaki_id },
    });
    if (!user) return response(404, null, "User not found", res);

    // Transaction
    const result = await prisma.$transaction(async (tx) => {
      // Insert Remark
      const insertRemark = {
        muzaki_id: muzaki_id,
        ...remarkParsed,
      };
      const createdRemark = await tx.remark.create({ data: insertRemark });
      const remark_id = createdRemark.id;

      //Prepare semua data zakat
      let insertData = [];

      // Zakat type "UANG"
      if (remarkParsed.tipe_zakat === "UANG") {
        // Zakat
        const zakatParsed = zakatUangSchema.parse(zakatData.zakatList);
        const insertZakat = zakatParsed.map((zakat) => ({
          remark_id, //nanti ganti jadi remarks_id
          ...zakat,
        }));

        if (insertZakat.length) {
          await tx.zakat_uang.createMany({ data: insertZakat });
          insertData.push(...insertZakat);
        }

        // Fidyah
        if (!isObjectEmpty(zakatData.fidyah)) {
          const fidyahParsed = fidyahSchema.parse(zakatData.fidyah);
          const insertFidyah = {
            remark_id,
            ...fidyahParsed,
          };
          await tx.fidyah.create({ data: insertFidyah });
          insertData.push(insertFidyah);
        }

        // Infaq
        if (!isObjectEmpty(zakatData.infaq)) {
          const infaqParsed = infaqSchema.parse(zakatData.infaq);
          const insertInfaq = {
            remark_id,
            ...infaqParsed,
          };
          await tx.infaq.create({ data: insertInfaq });
          insertData.push(insertInfaq);
        }
      }

      // Zakat type "MAKANAN"
      if (remarkParsed.tipe_zakat === "MAKANAN") {
        const zakatParsed = zakatMakananSchema.parse(zakatData);
        const insertZakat = {
          remark_id, //nanti ganti jadi remarks_id
          ...zakatParsed,
        };
        await tx.zakat_makanan.create({ data: insertZakat });
        insertData.push(insertZakat);
      }

      return { remark: createdRemark, zakatData: insertData };
    });
    response(200, result, "Zakat created successfully", res);
  } catch (error) {
    if (error.name === "ZodError") {
      return response(400, null, error.message, res);
    }
    response(500, null, error.message, res);
  }
};

// NANTI BISA COBA TEKNIK DIFFING
const updateZakat = async (req, res) => {
  try {
    const { tipe, zakatData } = req.body;

    // Prepare semua data zakat
    let insertData = [];

    // Zakat type "UANG"
    if (tipe === "UANG") {
      const zakatParsed = updateZakatUangSchema.parse(zakatData);
      await prisma.zakat_uang.update({
        where: { id: zakatParsed.id },
        data: zakatParsed,
      });
      insertData.push(zakatParsed);
    }

    // Zakat type "MAKANAN"
    if (tipe === "MAKANAN") {
      const zakatParsed = updateZakatMakananSchema.parse(zakatData);
      await prisma.zakat_makanan.update({
        where: { id: zakatParsed.id },
        data: zakatParsed,
      });
      insertData.push(zakatParsed);
    }

    // Fidyah
    if (tipe === "FIDYAH") {
      const fidyahParsed = updateFidyahSchema.parse(zakatData);
      await prisma.fidyah.update({
        where: { id: fidyahParsed.id },
        data: fidyahParsed,
      });
      insertData.push(fidyahParsed);
    }

    // Infaq
    if (tipe === "INFAQ") {
      const infaqParsed = updateInfaqSchema.parse(zakatData);
      await prisma.infaq.update({
        where: { id: infaqParsed.id },
        data: infaqParsed,
      });
      insertData.push(infaqParsed);
    }

    response(200, insertData, "Data updated successfully", res);
  } catch (error) {
    if (error.name === "ZodError") {
      return response(400, null, error.message, res);
    }
    response(500, null, error.message, res);
  }
};

const updateRemarkStatus = async (req, res) => {
  try {
    const parsed = updateRemarksSchema.parse(req.body);

    const remark = await prisma.remark.findUnique({
      where: { id: parsed.id },
    });
    if (!remark) return response(404, null, "Remark not found", res);

    const updateData = {
      pengurus_id: parsed.pengurus_id,
      status: parsed.status,
      tanggal_dikonfirmasi: parsed.tanggal_dikonfirmasi,
    };

    await prisma.remark.update({
      where: { id: parsed.id },
      data: updateData,
    });

    response(200, updateData, "Remark updated successfully", res);
  } catch (error) {
    if (error.name === "ZodError") {
      return response(400, null, error.message, res);
    }
    response(500, null, error.message, res);
  }
};

const deleteZakat = async (req, res) => {
  try {
    const { id, tipe } = req.body;

    if (tipe === "UANG") {
      await prisma.zakat_uang.delete({ where: { id } });
    } else if (tipe === "MAKANAN") {
      await prisma.zakat_makanan.delete({ where: { id } });
    } else if (tipe === "FIDYAH") {
      await prisma.fidyah.delete({ where: { id } });
    } else if (tipe === "INFAQ") {
      await prisma.infaq.delete({ where: { id } });
    }

    response(200, id, "Data deleted successfully", res);
  } catch (error) {
    response(500, null, error.message, res);
  }
};

const deleteRemark = async (req, res) => {
  try {
    const { id, isDeleted } = req.body;
    await prisma.remark.update({
      where: { id },
      data: { isDeleted },
    });
    response(200, id, "Data deleted successfully", res);
  } catch (error) {
    response(500, null, error.message, res);
  }
};

// GET
const getAllRemarks = async (req, res) => {
  try {
    const remarks = await getRemarks();
    return response(200, remarks, "Data fetched successfully", res);
  } catch (error) {
    return response(500, null, error.message, res);
  }
};

const getMyRemarks = async (req, res) => {
  try {
    const { id } = req.user;
    const remarks = await getRemarksByUserId(id);
    return response(200, remarks, "Data fetched successfully", res);
  } catch (error) {
    return response(500, null, error.message, res);
  }
};

const getZakatByRemarkId = async (req, res) => {
  try {
    const id = req.params.id;
    const remark = await getAllData(id);
    return response(200, remark, "Data fetched successfully", res);
  } catch (error) {
    return response(500, null, error.message, res);
  }
};

export {
  createZakat,
  updateZakat,
  updateRemarkStatus,
  deleteZakat,
  deleteRemark,
  getAllRemarks,
  getMyRemarks,
  getZakatByRemarkId,
};
