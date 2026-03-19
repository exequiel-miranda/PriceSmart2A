const branchesController = {};
//importo el Schema de la colleción que voy a ocupar

import branchesModel from "../models/branches.js";

//SELECT
branchesController.getBranches = async (req, res) => {
  const branches = await branchesModel.find();
  res.json(branches);
};

//INSERT
branchesController.insertBranches = async (req, res) => {
  const { name, address, schedule, isActive } = req.body;
  const newBranch = new branchesModel({ name, address, schedule, isActive });
  await newBranch.save();
  res.json({ message: "Branch save" });
};

//UPDATE
branchesController.updateBranches = async (req, res) => {
  const { name, address, schedule, isActive } = req.body;
  await branchesModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      address,
      schedule,
      isActive,
    },
    { new: true },
  );

  res.json({ message: "branch updated" });
};

//DELETE
branchesController.deleteBranches = async (req, res) => {
  await branchesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "branch deleted" });
};

export default branchesController;
