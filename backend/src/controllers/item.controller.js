const Item = require("../models/item.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid")

const createItem = async (req, res) => {

  try {
    const { name, description } = req.body;
    const userId = req.user.id;


    const fileuploadResult = await uploadFile(req.file.buffer, uuid());

    const item = await Item.create({
      name,
      description,
      videoUrl: fileuploadResult.url,
      User: userId,
    });
    res.status(201).json({
      error: false,
      message: "Item created successfully",
      item
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Internal server error"
    })
  }

};

const getItems = async (_, res) => {
  try {
    const items = await Item.find().populate("User", "name email").sort({ createdAt: -1 });
    res.status(200).json({
      error: false,
      message: "Items fetched successfully",
      items
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Internal server error"
    })
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.status(200).json({
      error: false,
      message: "Item fetched successfully",
      item
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Internal server error"
    })
  }
};

const updateItem = async (req, res) => { };

const deleteItem = async (req, res) => { };

module.exports = { createItem, getItems, getItem, updateItem, deleteItem };
