import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import sqlite3 from "sqlite3";
import bodyParser from 'body-parser';
import NBA from "./NBA.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const db_name = path.join(__dirname, "database.db");

const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful connection to the database");
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000, ()=>{
    console.log("Server started. Connecting to Localhost:3000");
})

app.use(express.static(__dirname));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.get("/unregister", (req,res)=>{
    res.sendFile(__dirname + "/index2.html");
})

app.get("/unregisterteam", (req,res)=>{
    const nba = NBA.instance(req, res);
    nba.deleteRow();
})

app.post("/register", (req, res) => {
    const nba = NBA.instance(req, res);
    nba.addRow();
});

app.get("/register", (req, res) => {
    const nba = NBA.instance(req, res);
    nba.addRow1();
});

app.get("/update", (req,res)=>{
    res.sendFile(__dirname + "/index3.html");
})

app.get("/updateteam", (req,res)=>{
    const nba = NBA.instance(req, res);
    nba.modifyRow();
})

app.post("/updateteam", (req, res) => {
    const nba = new NBA(req, res);
    nba.modifyRow1();
});

app.get("/search", (req,res)=>{
    res.sendFile(__dirname + "/index1.html");
});

app.get("/nbateams", (req, res) => {
    const nba = NBA.instance(req, res);
    nba.getRow();
});
