import prisma from "../config/prisma.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

// const register = async (req, res) => {
//     const { }
// }

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

export { login, refresh, logout };
