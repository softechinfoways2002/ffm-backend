const Reimbursement = require("../models/reimbursement.model");

// Employee: Create reimbursement claim
exports.createClaim = async (req, res) => {
  try {
    const { amount, description, date, billImage } = req.body;
    const claim = await Reimbursement.create({
      employeeId: req.user._id,
      amount,
      description,
      date,
      billImage,
    });
    res.status(201).json({ success: true, claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Employee: Get own claims
exports.getEmployeeClaims = async (req, res) => {
  try {
    const claims = await Reimbursement.find({ employeeId: req.user._id });
    res.status(200).json({ success: true, claims });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all claims
exports.getAllClaims = async (req, res) => {
  try {
    const claims = await Reimbursement.find()
      .populate("employeeId", "name email");
    res.status(200).json({ success: true, claims });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update claim status
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status, adminRemark } = req.body;
    const claim = await Reimbursement.findByIdAndUpdate(
      req.params.id,
      { status, adminRemark },
      { new: true }
    );
    if (!claim) return res.status(404).json({ success: false, message: "Claim not found" });
    res.status(200).json({ success: true, claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
