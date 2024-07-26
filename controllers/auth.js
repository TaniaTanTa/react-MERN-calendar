const {response}=require('express');
const {validationResult}=require('express-validator');
const Usuario=require('../models/Usuario')
const bcrypt=require('bcryptjs');
const {generarJWT}=require('../helpers/jwt')
const crearUsuario=async (req,res=response)=>{
    const {name,email,password}=(req.body)
   try {
    let usuario=await Usuario.findOne({
       email
    })
    console.log(usuario)
    if(usuario){
        return res.status(400).json({
            ok:false,
            msg:'Un usuario existe con ese correo'
        })
    }
    usuario= new Usuario(req.body);
    //encriptar contraseña
    const salt=bcrypt.genSaltSync();
    usuario.password=bcrypt.hashSync(password,salt);
    await usuario.save();
    //generar nuestor json web token JWT

    const token=await generarJWT(usuario.id,usuario.name)
    res.status(201).json({
        ok:true,
        uid:usuario.id,
        name:usuario.name,
        msg:'registro',
        email,
        password,
        token
    })
   } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el admin'
        })
   }
   
};
const loginUsuario=async (req,res=response)=>{
    const {email,password}=(req.body)
    try {
     const usuario=await Usuario.findOne({
        email
     })
     console.log(usuario)
     if(!usuario){
         return res.status(400).json({
             ok:false,
             msg:'Un usuario no existe con ese correo'
         })
     }
     const validPassword=bcrypt.compareSync(password,usuario.password);
     if(!validPassword){
        return res.status(400).json({
            ok:false,
            msg:'Contraseña incorrecta'
        })
     }
     //generar nuestor json web token JWT
     const token=await generarJWT(usuario.id,usuario.name)
     res.status(201).json({
         ok:true,
         uid:usuario.id,
         name:usuario.name,
         msg:'login',
         email,
         password,
         token
     })
    } catch (error) {
         res.status(500).json({
             ok:false,
             msg:'Por favor hable con el admin'
         })
    }
};


const revalidarToken=async(req,res=response)=>{
    const uid=req.uid;
    const name=req.name;

    const token=await generarJWT(uid,name)


    res.json({
        ok:true,
       uid:uid,
       name:name,
       token:token
    })
};


module.exports={
    crearUsuario:crearUsuario,
    loginUsuario,revalidarToken
}