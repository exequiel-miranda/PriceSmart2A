import branchesModel from "../models/branches.js";

//SELECT
export const getBranches = async (req, res) => {
  const branches = await branchesModel.find();
  res.json(branches);
};

//INSERT
 export const insertBranches = async (req, res) => {
  const { name, address, schedule, isActive } = req.body;
  const newBranch = new branchesModel({ name, address, schedule, isActive });
  await newBranch.save();
  res.json({ message: "Branch save" });
};

//UPDATE
export const updateBranches = async (req, res) => {
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
export const  deleteBranches = async (req, res) => {
  await branchesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "branch deleted" });
};


