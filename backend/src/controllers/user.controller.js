import prisma from "../config/prisma.js";
import response from "../utils/response.js";

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    response(200, users, "Users found successfully", res);
  } catch (error) {
    response(500, null, error.message, res);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) return response(404, null, "User not found", res);

    const userData = {
      id: user.id,
      email: user.email,
      nama: user.nama,
      no_hp: user.no_hp,
      alamat: user.alamat,
      rw: user.rw,
      rt: user.rt,
      isAdmin: user.isAdmin,
    };

    response(200, userData, "User found successfully", res);
  } catch (error) {
    response(500, null, error.message, res);
  }
};

export { getUsers, getUserById };
