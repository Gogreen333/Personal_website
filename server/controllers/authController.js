const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, await bcrypt.hash(process.env.ADMIN_PASSWORD, 10));
  // Simple check: compare plain passwords for demo (use hashed in production)
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ success: true, token, user: { email, role: "admin" } });
};
