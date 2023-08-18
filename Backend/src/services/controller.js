import json from "express";
import asyncHandler from 'express-async-handler';

const insert = asyncHandler(async (req,res)=>{
    const name = req.params.name;
    const lastName = req.params.lastName;
    const dpi = req.params.dpi;
    const dir = req.params.dir;


    try {
        console.log(`Hola  desde insert este es el name `+ name + ` este es el lastname ` + lastName + ` este es el dpi `+ dpi + ` esta es la dir `+ dir);
    } catch (error) {
        return error;
    }
})

const deleteData = asyncHandler(async (req,res)=>{
    const name = req.params.name;
    const lastName = req.params.lastName;
    const dpi = req.params.dpi;
    const dir = req.params.dir;

    try {
        res.send(`Hola  desde delete este es el name `+ name + ` este es el lastname ` + lastName + ` este es el dpi `+ dpi + ` esta es la dir `+ dir)
        console.log(`Hola  desde delete este es el name `+ name + ` este es el lastname ` + lastName + ` este es el dpi `+ dpi + ` esta es la dir `+ dir);
    } catch (error) { 
        return error;
    }
})


const patch = asyncHandler(async (req,res)=>{
    const name = req.params.name;
    const lastName = req.params.lastName;
    const dpi = req.params.dpi;
    const dir = req.params.dir;


    try {
        console.log(`Hola  desde patch este es el name `+ name + ` este es el lastname ` + lastName + ` este es el dpi `+ dpi + ` esta es la dir `+ dir);
    } catch (error) {
        return error;
    }
})


const read = asyncHandler(async (req,res)=>{
    const name = req.params.name;
    const lastName = req.params.lastName;
    const dpi = req.params.dpi;
    const dir = req.params.dir;


    try {
        console.log(`Hola  desde read este es el name `+ name + ` este es el lastname ` + lastName + ` este es el dpi `+ dpi + ` esta es la dir `+ dir);
    } catch (error) {
        return error;
    }
})

export {
    insert,
    deleteData,
    patch,
    read
}