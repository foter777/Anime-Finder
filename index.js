import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4";

//const API_URL = "https://v2.jokeapi.dev/joke/Any?type=single";
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req,res)=>{
    try{
        const result = await axios.get(API_URL + `/seasons/now`);
        res.render("index.ejs", {content: result.data,name:"Currently Airing"});
    }catch(error){
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});
    }

    
})

app.post("/get-anime", async (req,res) =>{
    try{
        const result = await axios.get(API_URL + `/anime/?q=${req.body.item}`);
        res.render("index.ejs", {content: result.data, name:req.body.item});
    }catch(error){
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});
    }
})

app.get("/get-anime-top", async (req,res) =>{
    try{
        const result = await axios.get(API_URL + `/top/anime`);
        res.render("index.ejs", {content: result.data,name:"Top Anime"});
    }catch(error){
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});
    }
})

app.listen(port);