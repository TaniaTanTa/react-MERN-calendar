
//rutas de usuarios/auth
//host+/api/auth
const {Router}=require('express');
const {check}=require('express-validator')
const router=Router();
const {crearUsuario,loginUsuario,revalidarToken}=require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT}=require('../middlewares/validar-jwt');
router.post('/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El emails es obligatorio').isEmail(),
        check('password','El pasord e sobligatorio debe de ser 6 caracteres').isLength({
            min:6
        }),
        validarCampos
    ],
    crearUsuario)

router.post('/',
    [
        check('email','Debe de contener un email valido').isEmail(),
        check('password','La contraseña debe ser de 6 caracteres').isLength({
            min:6
        }),
        validarCampos
    ],
    loginUsuario);

router.get('/renew',
    validarJWT,
    revalidarToken);



module.exports=router;