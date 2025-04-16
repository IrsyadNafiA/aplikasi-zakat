import response from "../utils/response.js";
import prisma from "../config/prisma.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { registerSchema } from "../utils/validations/authValidation.js";

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
  const { email, password } = req.body;
  const user = await prisma.user({ where: { email } });

  if (!user || !comparePassword(password, user.password)) {
    res.status(401).json({ error: "Invalid credentials" });
  }

  const accesToken = signAccessToken({ id: user.id, email: user.email });
  const refreshToken = signRefreshToken({ id: user.id });

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  res.json({ accesToken, refreshToken });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ error: "Missing refresh token" });

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = signAccessToken({ id: user.id, email: user.email });
    res.json({ accesToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

const logout = async (req, res) => {
  const { id } = req.body;
  await prisma.user.update({
    where: { id },
    data: { refreshToken: null },
  });
  res.json({ massage: "Logout successfully" });
};

export { register, login, refresh, logout };
