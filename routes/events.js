

//eventsa orutes
const {Router}=require('express');
const {check}=require('express-validator')
const {validarJWT}=require('../middlewares/validar-jwt');
const {getEventos,crearEvento,actualizarEvento,eliminarEvento}=require('../controllers/events')
const {isDate}=require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');

const router=Router();
//todas tienen que pasar por la validacion del JWT
//es decir todas las rutas que esteb abajo de validarjwt,si esta rriba de, ya no va a pedir el jwt
router.use(validarJWT);
//obtener eventos
router.get('/',getEventos)
//crear evento
router.post('/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatorio').custom(
            isDate
        ),
        check('end','Fecha de fin es obligatorio').custom(
            isDate
        ),
        validarCampos
    ],
    crearEvento,)
//actualizar evento
router.put('/:id',actualizarEvento)
//borrar evento
router.delete('/:id',eliminarEvento)
module.exports=router