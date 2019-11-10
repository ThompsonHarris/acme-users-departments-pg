const express = require('express')
const pg = require('pg')
const uuid = require('uuid')
const path = require('path')
const {sync,getAllDepartments,getAllUsers} = require('./db.js')


const app = express()

sync()


app.get('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/api/users', async (req, res, next)=>{
    res.send(await getAllUsers())
})

app.get('/api/departments',async (req, res, next)=>{
    res.send(await getAllDepartments())
})

app.listen(3000,()=>{
    console.log('running on port 3000')
})