import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"

// ITEMS SCHEMA
const itemSchema = new mongoose.Schema({
    name: String,
    detail: String,
    price: String,
    image: String,
})

// CREATE THE MODEL
const Items = mongoose.model("Items", itemSchema);

// CREATE ROUTER
const itemRouter = express.Router();
itemRouter.use(bodyParser.json());

// CREATE ITEM
itemRouter.post('/addItem', async (req, res) => {
    try {
        const newItem = new Items(req.body);
        await newItem.save();
        res.status(201).send(newItem);
    } catch (error) {
        res.status(400).send(error);
    }
})

// GET ALL ITEMS
itemRouter.get("/allItems", async (req, res) => {
    try {
        const allItems = await Items.find();
        res.status(200).send(allItems);
    } catch (error) {
        res.status(500).send(error);
    }
})

// GET ELEMENT BY ID
itemRouter.get("/item/:id", async (req,res) => {
    try {
        const item = await Items.findOne({ _id: req.params.id });
        if(item) {
            return res.status(200).send(item);
        }
        else {
            return res.status(404).send("Item not found");
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

// UPDATE THE ITEM
itemRouter.put("/updateItem/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateItem = await Items.findByIdAndUpdate(id, req.body, {new: true})

        res.status(200).send(updateItem);
    } catch (error) {
        res.status(400).send(error)
    }
})

// DELETE ITEM BY ID
itemRouter.delete('/deleteItem/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const item = await Items.findOneAndDelete({ _id: id });

        res.status(200).json({"message" : "Item has been deleted successfully"})
    } catch (error) {
        res.status(500).send(error)
    }
})

export default itemRouter;