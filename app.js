const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();
require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('upload'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/politc-priv', (req, res) => {
  res.render('politic', { error: null })
});

app.get('/consultar', (req, res) => {
  res.render('consulta', { error: null })
});

const pictureRouter = require("./routs/picture");
app.use("/", pictureRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
