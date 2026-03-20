const adminsControllers = {};

import adminModel from "../models/admins.js";


adminsControllers.getAdmins = async (req, res) => {
    try {
        let admins = await adminModel.find()
        return res.status(200).json(admins)
    } catch (error) {

        console.log ("Error" + error )

        return res.status(500).json({message:"Internal Server Error"})
    }

};

adminsControllers.postAdmin = async (req, res) => {
    try {
        let {name,email,password,isverified} = req.body

        name = name?.trim()
        email = email?.trim()
        password = password?.trim()

        if(!name || !email || !password){
            return res.status (400).json({message:"all fields are required"})
        
        }

        if (name.length < 3){
            return res.status(400).json ({message:"Name must be at least 3 characters"})
        }
        if (password.length < 6){
            return res.status(400).json ({message:"Password must be at least 6 characters"})
        }
        if (!email.includes("@")){
            return res.status(400).json ({message:"Email must be valid"})

        }

        const newAdmin = new adminsModel ({name,email,password,isverified})
        await newAdmin.save()

        return res.status(2001).json({message:"Admin created successfully"})
    } catch (error) {
        console.log ("Error" + error)
        return res.status(500).json({message:"Internal Server Error"})
    }

};

adminsControllers.deleteAdmin = async (req, res) => {
    try {
        let deleteAdmin = await adminModel.findByIdAndDelete(req.params.id)
        if(!deleteAdmin){
            
            return res.status(400).json({message:"Admin not found"})
        }
         return res.status(200).json({message:"Admin deleted successfully"})
        
        } catch (error) {
            console.log ("Error" + error)
            
            return res.status(500).json({message:"Internal Server Error"})
    }

};

adminsControllers.updateAdmin = async (req, res) => {
    try {
         let {name, email, password, isverified} = req.body

            name = name?.trim()
            email = email?.trim()
            password = password?.trim()
           
            if(name.length < 3){
                return res.status(400).json({message:"Name must be at least 3 characters"})
            }

            if(password.length < 6){
                return res.status(400).json({message:"Password must be at least 6 characters"})
            }

            if(!email.includes("@")){
                return res.status(400).json({message:"Email must be valid"})
            }

            const updateAdmin = await adminModel.findByIdAndUpdate(
                req.params.id,{
                    name,
                    email,
                    password,
                    isverified }, {new: true}
                );
        
                if (!updateAdmin){
                    return res.status(404).json({message:"Admin not found"})
                }
                return res.status(200).json({message:"Admin updated successfully"})

    } catch (error) {
        console.log("Error" + error)

        return res.status(500).json({message:"Internal server error"})

    }
};

export default adminsControllers;
