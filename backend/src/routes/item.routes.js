const express = require("express");
const { createItem, getItems, getItem, updateItem, deleteItem } = require("../controllers/item.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/create", authMiddleware, upload.single("videoUrl"), createItem);
router.get("/getAll", getItems);
router.get("/get/:id", getItem);
router.put("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router;
