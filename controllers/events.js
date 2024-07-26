
const {response}=require('express');
const Evento=require('../models/Evento');
const getEventos=async (req,res=response)=>{
    const eventos=await Evento.find().populate('user','name');
    try{
     res.status(201).json(
        {
            ok:true,
            eventos,
            msg:'obtener eventos'
        }
     )
    } catch (error) {
         res.status(500).json({
             ok:false,
             msg:'Por favor hable con el admin'
         })
    }
};


const crearEvento=async (req,res=response)=>{
    const evento=new Evento(req.body);
    try{
       evento.user=req.uid;
       const eventoGuardado=await evento.save();
     res.status(201).json(
        {
            ok:true,
            evento:eventoGuardado,
            msg:'crear eventos'
        }
     )
    } catch (error) {
         res.status(500).json({
             ok:false,
             msg:'Por favor hable con el admin'
         })
    }
};

const actualizarEvento=async (req,res=response)=>{
    const eventoId=req.params.id;
    const uid=req.uid;

    
    try{
        const evento=await Evento.findById(eventoId);
        if(!evento){
            res.status(404).json({
                ok:false,
                msg:'No existe el evento por ese id'
            })
        }
        if(evento.user.toString()!==uid){
            res.status(401).json({
                ok:false,
                msg:'No tiene privilegios para editar este evento'
            })
        }
        const nuevoEvento={
            ...req.body,
            user:uid
        }
        //new:true que traiga el evento actulizaod, si se le quita si lo actualiza pero sigue trayendo el anterior
        const eventoActualizado=await Evento.findByIdAndUpdate(
            eventoId,nuevoEvento,{new:true}
        )
        res.status(201).json(
        {
            ok:true,
            evento:eventoActualizado,
            msg:'Evento actualizado'
        }
     )
    } catch (error) {
         res.status(500).json({
             ok:false,
             msg:'Por favor hable con el admin'
         })
    }
};




const eliminarEvento=async (req,res=response)=>{
    const eventoId=req.params.id;
    const uid=req.uid;

    try{
        const evento=await Evento.findById(eventoId);
        if(!evento){
            res.status(404).json({
                ok:false,
                msg:'No existe el evento por ese id'
            })
        }
        if(evento.user.toString()!==uid){
            res.status(401).json({
                ok:false,
                msg:'No tiene privilegios para editar este evento'
            })
        }
        const nuevoEvento={
            ...req.body,
            user:uid
        }
        //new:true que traiga el evento actulizaod, si se le quita si lo actualiza pero sigue trayendo el anterior
        const eventoEliminado=await Evento.findByIdAndDelete(
            eventoId
        )
        res.status(201).json(
        {
            ok:true,
            msg:'Evento eliminado'
        }
     )
    } catch (error) {
         res.status(500).json({
             ok:false,
             msg:'Por favor hable con el admin'
         })
    }
}

module.exports={
    getEventos,crearEvento,actualizarEvento,eliminarEvento
}