
// let http = require("http");
// let server= http.createServer(function(req,res){
// res.writeHead(200,{"Content-Type":"text/html"});
// res.end("hello <strong> world </strong>!")
// });

// server.listen(3000);

const express = require('express');
const app= express()
const question=require('../../public/pokedex.json')
let cors=require('cors')
app.use(express.json())
app.use(cors())

app.post('/pokemon/',(req,res)=>{
  question.push(req.body)
  res.status(200).json(question)
});

app.get("/",(req,res)=>{
res.status(200).json(question)
});

app.put('/pokemon/:id',(req,res)=>{
    const id =parseInt(req.params.id)
    let pok=question.find(pokemon=>pokemon.id===id)
    pok.name.english=req.body.name.english
    res.status(200).json(pok)
  });

app.get("/liste/:id/",(req,res)=>{
    let pid = parseInt(req.params.id); // Convertir en nombre entier

    if (Number.isInteger(pid)) {
      const pok= question.find(pokemon=>pokemon.id===pid)
      res.status(200).json(pok)
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>On attend un entier</h1>");
    }
  });
// app.get("/",(req,res)=>{
//     res.writeHead(200,{"Content-Type":"text/html"});
//     res.end("<h1> page d'accueil </h1>");
// });
// app.get("/listepokemon/",(req,res)=>{
//     res.writeHead(200,{"Content-Type":"text/html"});
//     res.end("<h1>la liste  des pokemons </h1>");
// });
// app.get("/liste/:numPage/",(req,res)=>{
    
//     let page = parseInt(req.params.numPage); // Convertir en nombre entier

//     if (Number.isInteger(page)) {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end("<h1>Page " + page + " des pokemons</h1>");
//     } else {
//       res.writeHead(404, { "Content-Type": "text/html" });
//       res.end("<h1>On attend un entier</h1>");
//     }
//   });

app.listen(3000,()=>{
    console.log("Serveur à l'écoute")
})