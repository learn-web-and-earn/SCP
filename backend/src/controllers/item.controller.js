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
      video: fileuploadResult.url,
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

const getItems = async (req, res) => { };

const getItem = async (req, res) => { };

const updateItem = async (req, res) => { };

const deleteItem = async (req, res) => { };

module.exports = { createItem, getItems, getItem, updateItem, deleteItem };
