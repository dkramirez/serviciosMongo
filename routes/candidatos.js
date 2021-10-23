/*
    Rutas de candidatos /candidatos
    hots +/api/candidatos 
 */

const {Router} = require('express')
const router = Router();
const {check} = require('express-validator')
const {obtenerCandidatos, 
       crearCandidato, 
       actualizarCandidato, 
       eliminarCandidato}= require('../controllers/candidatos')


router.get('/obtenerCandidatos', obtenerCandidatos);

router.post('/crearCandidato', 
[
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('apellido', 'El apellido es requerido').not().isEmpty(),
    check('identificacion', 'La identificacion es requerido').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es requerido').not().isEmpty()
],
crearCandidato);

router.put('/actualizarCandidato',
[
    check('id', 'El id es requerido').not().isEmpty(),
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('apellido', 'El apellido es requerido').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es requerido').not().isEmpty()
],
actualizarCandidato);


router.delete('/eliminarCandidato/:id', eliminarCandidato);




module.exports= router;