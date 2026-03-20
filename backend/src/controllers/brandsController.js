const brandController = {};
 
import brandModel from "../models/brands.js"
 
brandController.getBrands = async (req, res) => {
    try {
       
        let brands = await brandModel.find()
        
        return res.status(200).json(brands)
    } catch (error) {
       
        console.log("Error" + error)
       
        return res.status(500).json({message:"Internal Server Error"})
    }
}
 
brandController.postBrand = async (req, res) => {
    try {
        const { name, slogan, address, isActive } = req.body
 
        name = name?.trim()
        slogan = slogan?.trim()
        address = address?.trim()
 
        if(!name || !slogan || !address){
            return res.status(400).json({message:"All fields are required"})
        }

        //Validacion de tamaño
        if(name.length  < 3){
            return res.status(400).json({message:"Name must be at least 3 characters"})
        }
        if(address.length  < 100){
            return res.status(400).json({message:"Address must be at least 100 characters"})
        }

        const newBrand = new brandModel({ name, slogan, address, isActive })
        await newBrand.save()
        
        return res.status(201).json({message:"Brand created successfully"})
 
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message:"Internal Server Error"})
    }
};

//Eliminar 
brandController.deleteBrand = async (req, res) => {
    try {
        let deleteBrand = await brandModel.findByIdAndDelete(req.params.id)
        
        if(!deleteBrand){
            
            return res.status(404).json({message:"Brand not found"})
        }

        
        return res.status(200).json({message:"Brand deleted successfully"})
    } catch (error) {
        
        console.log("Error" + error)
       
        return res.status(500).json({message:"Internal Server Error"})
    }
}; 

//ACTUALIZAR
brandController.updateBrand = async (req, res) => {
    try {

        let { name, slogan, address, isActive } = req.body;

        //2. Validar campos
        //sanitizar
        name = name?.trim();
        slogan = slogan?.trim();
        address = address?.trim();

        //Validacion de tamaño
        if(name.length  < 3){
            return res.status(400).json({message:"Name must be at least 3 characters"})

        }

        if(address.length  < 100){
            return res.status(400).json({message:"Address must be at least 100 characters"})

        }

        const updateBrand = await brandModel.findByIdAndUpdate(
            req.params.id, { 
              name,
              slogan,
              address, 
              isActive }, { new: true }
            );

            //si no se actualiza 
            if(!updateBrand){
                return res.status(404).json({message:"Brand not found"})
            }

            return res.status(200).json({message:"Brand updated successfully"})

    } catch (error) {
        console.log("Error" + error)
        
        return res.status(500).json({message:"Internal Server Error"})
    }
};
 
export default brandController;