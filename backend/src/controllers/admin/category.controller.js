const Category = require("../../models/Category.Schema");

// 👉 ADD PORTFOLIO
exports.create = async (req, res) => {
    try {
        const data = new Category({
            Skills: req.body.Skills,
            status: req.body.status,
        });

        const saved = await data.save();

        res.status(201).json({
            status: true,
            message: "category created successfully",
            data: saved,
        });
    } catch (err) {
        console.error("Create category error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    }
};

// 👉 VIEW ALL PORTFOLIO
exports.view = (req, res) => {
    Category.find().then((data) => {
        res.status(200).json({
            status: true,
            message: "category view successfully",
            data: data,
        });
    }).catch((err) => {
        console.error("Create category error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    })
};

// 👉 STATUS CHANGE
exports.statusChange = async (req, res) => {
    try {
        const result = await Category.updateOne(
            { _id: req.body.id },
            { $set: { status: req.body.status } },
        );

        res.json({
            status: true,
            message: "Status updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }

};

// 👉 DETAIL
exports.detail = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id);
        res.status(200).json({
            status: true,
            message: "category view successfully",
            data: data,
        });
    } catch (err) {
        console.error("Create category error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    }

};

// 👉 UPDATE

exports.update = async (req, res) => {
    try {
        const result = await Category.updateOne(
            { _id: req.params.id },
            { $set: { Skills: req.body.Skills, status: req.body.status } },
        );

        res.json({
            status: true,
            message: "Category updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// 👉 DELETE
exports.delete = async (req, res) => {
    try {
        const result = await Category.deleteOne({ _id: req.params.id });

        res.json({
            status: true,
            message: "Category deleted successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
