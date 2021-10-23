
const { response } = require('express');
const {validationResult}= require('express-validator');
const Candidato = require('../models/Candidato');


const obtenerCandidatos = async (req, res)=>{

    try {

        const candidatos= await Candidato.find();

        res.status(200).json({
            ok: true,
            candidatos
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor, favor consulte su administrador'
    
        })
        
    }

  
}


const crearCandidato =  async(req, res=response)=>{

    const {identificacion} =req.body;

try {
    let candidato = await Candidato.findOne({identificacion});
        if(candidato){
            return res.status(400).json({
                ok: false,
                msg: 'Existe un candidato creado con ese numero de identificación'
            })
        }

        candidato = new Candidato(req.body);
    
        await candidato.save();
    
        const errors = validationResult(req);
    
        console.log(errors);
    
        if(!errors.isEmpty()){
            return res.status(400).json({
                ok: false,
                errors: errors.mapped()
            });
        }
        return res.status(201).json({
            ok: true,
            candidato
        });
    
} catch (error) {
    console.log(error)
    return res.status(500).json({
        ok: false,
        msg: 'Error interno en el servidor, favor hable con el administrador'

    }); 
  }
}

const actualizarCandidato = async (req, res=response)=>{

 try {

    const idCandidato = req.body.id;
    const candidato= await Candidato.findById(idCandidato);

    if(!candidato){
       return res.status(404).json({
            ok: false,
            msg: 'El candidato existe con ese id' 
        });
    }

    const candidatoActualizado = {
        _id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        empleoActual: req.body.empleoActual,
        expectativaSalarial: req.body.expectativaSalarial,
        observaciones: req.body.observaciones,
        identificacion: req.body.identificacion
       
    }
    const actualizarCandidato = await Candidato.findByIdAndUpdate(idCandidato, candidatoActualizado, {new: true});
   

    res.json({
        ok: true,
        candidato:  actualizarCandidato
    })
     
 } catch (error) {
    return res.status(500).json({
        ok: false,
        msg: 'Error interno en el servidor, favor hable con el administrador',
        error
    }); 
     
 }
}

const eliminarCandidato = async(req, res)=>{



  try {
      const idCandidato = req.params.id;
      const candidato= await Candidato.findById(idCandidato);
  
      if(!candidato){
         return res.status(404).json({
              ok: false,
              msg: 'El candidato existe con ese id' 
          });
      }

      await Candidato.findByIdAndDelete(idCandidato);

    res.status(200).json({
        ok: true,
        id: idCandidato,
    });
      
  } catch (error) {
    return res.status(500).json({
        ok: false,
        msg: 'Error interno en el servidor, favor hable con el administrador',
        error
    }); 
      
  }
}



module.exports ={
    obtenerCandidatos,
    crearCandidato,
    actualizarCandidato,
    eliminarCandidato
}