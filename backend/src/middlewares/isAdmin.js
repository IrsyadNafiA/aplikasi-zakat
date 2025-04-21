import response from "../utils/response.js";

const isAdmin = (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin == 0) return response(403, null, "You are not admin", res);
  next();
};

export default isAdmin;
