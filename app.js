const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();
require("./db");

app.get('/DocPet', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use(express.json());
const pictureRouter = require("./routs/picture");
app.use("/", pictureRouter);


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


//------------------------------------


// const express = require("express");
// const path = require("path");
// const app = express();

// // Servindo arquivos estáticos , como imagens carregadas
// app.use(express.static('uploads'));

// // Para servir o arquivo HTML na rota principal
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Adicionando suas rotas para as imagens
// const pictureRouter = require("./routs/picture");
// app.use("/pictures", pictureRouter);

// // Configuração da porta
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server started on http://localhost:${port}`);
// });
