
const documentos = 'Todos os Documentos - R$ 9,99';

// const name_produto = documentos.split("-")[0];
// const price_produto = +(documentos.split("-")[1].split(" ").replace(",", "."));
console.log(+documentos.split("-")[1].split(" ")[2].split(" ")[0].replace(",", "."))
