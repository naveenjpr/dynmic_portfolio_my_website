const ConnectMe = require("../../models/ConnectMe.Schema");

// 👉 ADD PORTFOLIO
exports.create = async (req, res) => {
    try {
        const data = new ConnectMe({
            Address: req.body.Address,
            Email: req.body.Email,
            Phone: req.body.Phone,
            status: req.body.status,
        });

        const saved = await data.save();

        res.status(201).json({
            status: true,
            message: "ConnectMe created successfully",
            data: saved,
        });
    } catch (err) {
        console.error("Create ConnectMe error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    }
};

// 👉 VIEW ALL PORTFOLIO
exports.view = (req, res) => {
    ConnectMe.find().then((data) => {
        res.status(200).json({
            status: true,
            message: "ConnectMe view successfully",
            data: data,
        });
    }).catch((err) => {
        console.error("Create ConnectMe error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    })
};

// 👉 STATUS CHANGE
exports.statusChange = async (req, res) => {
    try {
        const result = await ConnectMe.updateOne(
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
        const data = await ConnectMe.findById(req.params.id);
        res.status(200).json({
            status: true,
            message: "ConnectMe view successfully",
            data: data,
        });
    } catch (err) {
        console.error("Create ConnectMe error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    }

};

// 👉 UPDATE

exports.update = async (req, res) => {
    try {
        const result = await ConnectMe.updateOne(
            { _id: req.params.id },
            { $set: { Address: req.body.Address, Email: req.body.Email, Phone: req.body.Phone, status: req.body.status } },
        );

        res.json({
            status: true,
            message: "ConnectMe updated successfully",
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
        const result = await ConnectMe.deleteOne({ _id: req.params.id });

        res.json({
            status: true,
            message: "ConnectMe deleted successfully",
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
