const router = require("express").Router();
const { body } = require("express-validator");
const { sendMessage, getMessages, markRead, deleteMessage } = require("../controllers/contactController");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("message").trim().isLength({ min: 10 }).withMessage("Message must be at least 10 characters"),
  ],
  sendMessage
);
router.get("/messages", auth, getMessages);
router.patch("/messages/:id/read", auth, markRead);
router.delete("/messages/:id", auth, deleteMessage);

module.exports = router;
