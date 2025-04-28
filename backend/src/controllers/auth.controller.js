import response from "../utils/response.js";
import prisma from "../config/prisma.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import {
  loginSchema,
  registerSchema,
} from "../utils/validations/authValidation.js";

const register = async (req, res) => {
  try {
    // Zod Validation Input
    const parsed = registerSchema.parse(req.body);

    // Check Existing User
    const existing = await prisma.user.findUnique({
      where: { email: parsed.email },
    });
    if (existing) return response(400, null, "User already exists", res);

    // Hash Password
    const hashedPassword = hashPassword(parsed.password);

    // Save user to Database
    const user = await prisma.user.create({
      data: {
        nama: parsed.nama,
        email: parsed.email,
        password: hashedPassword,
        no_hp: parsed.no_hp,
        alamat: parsed.alamat,
        rw: parsed.rw,
        rt: parsed.rt,
        isAdmin: parsed.isAdmin,
      },
    });

    response(201, user, "User created successfully", res);
  } catch (error) {
    if (error.name === "ZodError") {
      return response(400, null, error.message, res);
    }

    response(500, null, error.message, res);
  }
};

const login = async (req, res) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (!user || !comparePassword(parsed.password, user.password)) {
      return response(401, null, "Invalid credentials", res);
    }

    const accessToken = signAccessToken({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    const refreshToken = signRefreshToken({ id: user.id });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    response(200, { accessToken, refreshToken }, "Login successfully", res);
  } catch (error) {
    if (error.name === "ZodError") {
      return response(400, null, error.message, res);
    }

    response(500, null, error.message, res);
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return response(401, null, "Missing refresh token", res);

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user || user.refreshToken !== refreshToken) {
      return response(403, null, "Invalid refresh token", res);
    }

    const newAccessToken = signAccessToken({ id: user.id, email: user.email });
    response(
      200,
      { accessToken: newAccessToken },
      "Refresh token successfully",
      res
    );
  } catch (error) {
    response(403, null, error.message, res);
  }
};

const logout = async (req, res) => {
  const { id } = req.user;
  await prisma.user.update({
    where: { id },
    data: { refreshToken: null },
  });
  res.json({ massage: "Logout successfully" });
};

const authMe = async (req, res) => {
  const { id } = req.user;
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

export { register, login, refresh, logout, authMe };
