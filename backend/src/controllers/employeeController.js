//#1- array de funciones
const employeeController = {};

//Import de la colección que vamos a utilizar
import employeeModel from "../models/employees.js";

//SELECT
employeeController.getEmployees = async (req, res) => {
  const employees = await employeeModel.find();
  res.json(employees);
};

//INSERT
employeeController.insertEmployees = async (req, res) => {
  //#1- Solicito los datos
  const { name, lastName, salary, DUI, phone, email, password, idBranches } =
    req.body;
  //#2- lleno mi modelo con los datos que acabo de pedir
  const newEmployee = new employeeModel({
    name,
    lastName,
    salary,
    DUI,
    phone,
    email,
    password,
    idBranches,
  });

  //#3- Guardo todo en la base de datos
  await newEmployee.save();

  res.json({ message: "Employee saved" });
};

//ELIMINAR
employeeController.deleteEmployee = async (req, res) => {
  await employeeModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};

//UPDATE
employeeController.updateEmployees = async (req, res) => {
  //Solicito los nuevos datos
  const { name, lastName, salary, DUI, phone, email, password, idBranches } =
    req.body;
  //Actualizo
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      lastName,
      salary,
      DUI,
      phone,
      email,
      password,
      idBranches,
    },
    { new: true },
  );

  res.json({ message: "Employee updated" });
};

export default employeeController;
