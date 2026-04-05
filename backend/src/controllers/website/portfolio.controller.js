const Portfolio = require("../../models/portfolio.Schema");



// 👉 VIEW ALL PORTFOLIO
exports.view = async (req, res) => {

  try {
    const projects = await Portfolio.find({ status: true }).sort({
      created_at: -1,
    });
    res.status(200).json({
      status: true,
      message: "Projects fetched successfully",
      totalRecords,
      data: projects,
    });
  } catch (err) {
    console.error("View projects error:", err);
    res.status(500).json({
      status: false,
      message: "Failed to fetch projects",
      error: err.message,
    });
  }
};


