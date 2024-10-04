// const { createCanvas, loadImage } = require('canvas');
// const fs = require('fs');

// const { nome_pet, date_nasc, type_pet, city, filiacao_mae, filiacao_pai } = req.body;
// const  file = req.file;

// //--------------- identidade - frente

// function createImage(res) {
//   const canvas = createCanvas(800, 1200);
//   const ctx = canvas.getContext('2d');

//   // Carrega e desenha a imagem do gato primeiro
//   loadImage('identidade-frente.png').then((image) => {
//     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//     // Carrega e desenha a nova imagem
//     return loadImage('.'+file.path);
//   }).then((newImage) => {
//     ctx.drawImage(newImage, 268, 220, 273, 330);

//     // Salva o estado do contexto antes da rotação
//     ctx.save();

//     ctx.translate(650, 700);
//     ctx.rotate(-(Math.PI / 2));

//     const textName = nome_pet;
//     const heightName = textName.length < 15 ? 20 - 2 * textName.length : -50 - 2 * textName.length;
//     ctx.font = '40px impact';
//     ctx.fillStyle = '#c94d18';
//     ctx.fillText(textName, heightName, 0);

//     // Salva a imagem no sistema de arquivos
//     const outputPath = `../upload/cpf-frente-${file.filename}`; // Caminho onde a imagem será salva
//     fs.writeFileSync(outputPath, canvas.toBuffer('image/png')); // Salva a imagem

//     // Retorna a imagem como resposta HTTP
//     res.writeHead(200, { 'Content-Type': 'image/png' });
//     res.end(canvas.toBuffer('image/png'));
//   }).catch((err) => {
//     res.writeHead(500, { 'Content-Type': 'text/plain' });
//     res.end('Error loading image');
//     console.error(err);
//   });
// }

// module.exports = { createImage };


const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');


function createImage(img_pet, nome_pet, filename) {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(800, 1200);
    const ctx = canvas.getContext('2d');

    // Carrega e desenha a imagem do template
    
    loadImage('base_documentos/identidadeFrente.png').then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Carrega e desenha a nova imagem (imagem do pet)
      return loadImage(img_pet);
    }).then((newImage) => {
      ctx.drawImage(newImage, 268, 220, 273, 330);

      // Adiciona o nome do pet
      ctx.save();
      ctx.translate(650, 700);
      ctx.rotate(-(Math.PI / 2));
      const textName = nome_pet;
      const heightName = textName.length < 15 ? 20 - 2 * textName.length : -50 - 2 * textName.length;
      ctx.font = '40px impact';
      ctx.fillStyle = '#c94d18';
      ctx.fillText(textName, heightName, 0);

      // Salva a imagem no sistema de arquivos
      const outputPath = `upload/cpf-frente-${filename}`; // Caminho onde a imagem será salva
      fs.writeFileSync(outputPath, canvas.toBuffer('image/png')); // Salva a imagem

      resolve(outputPath); // Retorna o caminho da imagem gerada
    }).catch((err) => {
      console.error('Erro ao gerar imagem:', err);
      reject(err);
    });
  });
}

module.exports = { createImage };




