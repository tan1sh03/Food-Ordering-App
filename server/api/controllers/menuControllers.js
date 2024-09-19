const Menu = require("../models/Menu");


const getAllMenuItems = async (req, res) => {
    try {
        const menus = await Menu.find({}).sort({ createdAt: -1 });
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// post a new menu item
const postMenuItem = async (req, res) => {
    const newItem = req.body;
    console.log(newItem)
    console.log("found")
    try {
        console.log("inside try")
        const result = await Menu.create(newItem);
        console.log(result);
        res.status(200).json(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete a menu item
const deleteMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const deletedItem = await Menu.findByIdAndDelete(menuId);
        if (!deletedItem) {
            return res.status(404).json({ message: "Menu not found" })
        }
        res.status(200).json({ message: "Menu Item deleted successfully!" })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single menu item
const singleMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const menu = await Menu.findById(menuId);
        console.log(menuId)
        console.log("found")
        console.log(menu)
        res.status(200).json(menu)
    } catch (error) {
        console.log("error")
        res.status(500).json({ message: error.message });
    }
};

// update single menu item
const updateMenuItem = async (req, res) => {
    const menuId = req.params.id;
    const { name, recipe, image, category, price } = req.body;
    try {
        const updateMenu = await Menu.findByIdAndUpdate(menuId,
            { name, recipe, image, category, price },
            { new: true, runValidators: true }
        );
        if (!updateMenu) {
            return res.status(404).json({ message: "Menu not found" })
        }
        res.status(200).json(updateMenu)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMenuItems,
    postMenuItem,
    deleteMenuItem,
    singleMenuItem,
    updateMenuItem,
}