const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();
require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/imgs')));
// app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static('public'));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/consultar', (req, res) => {
  //res.sendFile(path.join(__dirname, './public/consulta.html'));
  res.render('consulta', { error: null })
});

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
