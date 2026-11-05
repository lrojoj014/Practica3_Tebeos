import type { Request, Response } from "express";
import { ObjectId, type Collection } from "mongodb";
import type { Tebeo, ErrorAPI } from "../models/tebeos.model.js";

let tebeosCollection: Collection<Tebeo>;

export const configTebeoCollection = (collection: Collection<Tebeo>) => {
    tebeosCollection = collection;
};

export const getTebeos = (
    req: Request,
    res: Response
) => {
    tebeosCollection.find().toArray().then((tebeos) => {
        res.status(200).json(tebeos);
    }).catch(() => {
        res.status(500).json({
            message: "Error de petición"
        });
    });
};

export const getTebeosId = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if(!ObjectId.isValid(id)){
        const respuesta: ErrorAPI = {
            error: "Invalid ID"
        };
        res.status(400).json(respuesta);
        return
    }

    tebeosCollection.findOne({
        _id: new ObjectId(id)
    }).then((result)=>{
        if(!result){
            const respuesta: ErrorAPI = {
                error: "Tebeo no encontrado"
            };
            res.status(404).json(respuesta);
            return
        }

        res.json(result);
    }).catch((error)=>{
        console.log(error)
        const respuesta: ErrorAPI = {
            error: "Error al buscar el tebeo"
        };
        res.status(500).json(respuesta);
    })
};

export const postTebeo = (
    req: Request,
    res: Response
) => {

    if (!req.body) {
        res.status(400).json({
            error: "Debes enviar un body"
        });
        return;
    }

    if (!req.body.titulo) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'titulo'"
        });
        return;
    }
    else if(req.body.titulo === ""){
        res.status(400).json({
            error: "El parámetro 'titulo' no puede estar vacío"
        });
        return;
    }

    if (!req.body.autor) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'autor'"
        });
        return;
    }
    else if(req.body.autor === ""){
        res.status(400).json({
            error: "El parámetro 'autor' no puede estar vacío"
        });
        return;
    }

    if (!req.body.editorial) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'editorial'"
        });
        return;
    }
    else if(req.body.editorial === ""){
        res.status(400).json({
            error: "El parámetro 'editorial' no puede estar vacío"
        });
        return;
    }

    if (!req.body.numero) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'numero'"
        });
        return;
    }
    else if(typeof req.body.numero != "number" && req.body.numero > 0){
        res.status(400).json({
            error: "El parámetro 'numero' debe ser mayor que 0"
        });
        return;
    }

    if (!req.body.fechaPublicacion){
        res.status(400).json({
            error: "Debes incluir el parámetro 'fechaPublicacion'"
        });
        return;
    }
    else if(req.body.fechaPublicacion.at(4) != "-" || req.body.fechaPublicacion.at(7) != "-"){
        res.status(400).json({
            error: "El parámetro 'fechaPublicacion' debe ser en formato YYYY-MM-DD"
        });
        return;
    }

    if (!req.body.precio) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'precio'"
        });
        return;
    }
    else if(typeof req.body.precio != "number" && req.body.precio >= 0){
        res.status(400).json({
            error: "El parámetro 'numero' debe ser mayor o igual que 0"
        });
        return;
    }

    if (req.body.leido === undefined) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'leido'"
        });
        return;
    }
    else if(typeof req.body.leido != "boolean"){
        res.status(400).json({
            error: "El parámetro 'leido' debe ser Boolean"
        });
        return;
    }

    const newTebeo: Tebeo = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };

    tebeosCollection.insertOne(newTebeo).then((result) => {
        res.status(201).json({
            _id: result.insertedId,
            ...newTebeo
        });
    }).catch(() => {
        res.status(500).json({
            error: "Error al crear el tebeo"
        });
    });
};

export const putTebeo = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Identificador incorrecto"
        });
        return;
    }

    if (!req.body) {
        res.status(400).json({
            error: "Debes enviar un body"
        });
        return;
    }

    if (!req.body.titulo) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'titulo'"
        });
        return;
    }
    else if(req.body.titulo === ""){
        res.status(400).json({
            error: "El parámetro 'titulo' no puede estar vacío"
        });
        return;
    }

    if (!req.body.autor) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'autor'"
        });
        return;
    }
    else if(req.body.autor === ""){
        res.status(400).json({
            error: "El parámetro 'autor' no puede estar vacío"
        });
        return;
    }

    if (!req.body.editorial) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'editorial'"
        });
        return;
    }
    else if(req.body.editorial === ""){
        res.status(400).json({
            error: "El parámetro 'editorial' no puede estar vacío"
        });
        return;
    }

    if (!req.body.numero) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'numero'"
        });
        return;
    }
    else if(typeof req.body.numero != "number" && req.body.numero > 0){
        res.status(400).json({
            error: "El parámetro 'numero' debe ser mayor que 0"
        });
        return;
    }

    if (!req.body.fechaPublicacion){
        res.status(400).json({
            error: "Debes incluir el parámetro 'fechaPublicacion'"
        });
        return;
    }
    else if(req.body.fechaPublicacion.at(4) != "-" || req.body.fechaPublicacion.at(7) != "-"){
        res.status(400).json({
            error: "El parámetro 'fechaPublicacion' debe ser en formato YYYY-MM-DD"
        });
        return;
    }

    if (!req.body.precio) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'precio'"
        });
        return;
    }
    else if(typeof req.body.precio != "number" && req.body.precio >= 0){
        res.status(400).json({
            error: "El parámetro 'numero' debe ser mayor o igual que 0"
        });
        return;
    }

    if (!req.body.leido) {
        res.status(400).json({
            error: "Debes incluir el parámetro 'leido'"
        });
        return;
    }
    else if(typeof req.body.leido != "boolean"){
        res.status(400).json({
            error: "El parámetro 'leido' debe ser Boolean"
        });
        return;
    }

    const tebeoActualizado: Tebeo = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };

    tebeosCollection.replaceOne({
        _id: new ObjectId(id)
    }, tebeoActualizado).then((result) => {

        if (result.matchedCount === 0) {
            res.status(404).json({
                error: "Tebeo no encontrado"
            });
            return;
        }

        res.status(200).json({
            _id: new ObjectId(id),
            ...tebeoActualizado
        });

    }).catch(() => {
        res.status(500).json({
            error: "Error al actualizar el tebeo"
        });
    });
};

export const deleteTebeo = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Identificador incorrecto"
        });
        return;
    }

    tebeosCollection.findOneAndDelete({
        _id: new ObjectId(id)
    }).then((result) => {
        if (!result) {
            res.status(404).json({
                error: "Tebeo no encontrado"
            });
            return;
        }

        res.status(200).json(result);

    }).catch(() => {
        res.status(500).json({
            error: "Error al eliminar el tebeo"
        });
    });
};