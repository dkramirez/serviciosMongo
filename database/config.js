const mongoose = require('mongoose');


const dbConnection = async()=>{

    try {
       await mongoose.connect(process.env.DB_CONNECT);
       console.log("BD online");

        
    } catch (error) {
        console.log(error);
        throw new Error('Error conectando a la base de datos');
        
    }

}

module.exports ={
    dbConnection
}