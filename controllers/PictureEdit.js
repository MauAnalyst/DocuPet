const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');


function createCpfFrente(img_pet, nome_pet, filename) {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(800, 1200);
    const ctx = canvas.getContext('2d');
    
    loadImage('base_documentos/FrenteIdentidade.png').then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      return loadImage(img_pet);
    }).then((newImage) => {
      ctx.drawImage(newImage, 268, 220, 273, 330);

      ctx.save();
      ctx.translate(650, 700);
      ctx.rotate(-(Math.PI / 2));
      const textName = nome_pet;
      const heightName = textName.length < 15 ? 20 - 2 * textName.length : -50 - 2 * textName.length;
      ctx.font = '50px "Great Vibes"';
      ctx.fillStyle = '#292835';
      ctx.fillText(textName, heightName, 0);

      const outputPath = `public/uploads/cpf_frente_${filename}`; 
      fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));

      resolve(outputPath);
    }).catch((err) => {
      console.error('Erro ao gerar imagem:', err);
      reject(err);
    });
  });
}

function createCpfVerso(nome_pet, data_nascimento, filiacao, cidade_estado, cpf, filename) {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(800, 1200);
    const ctx = canvas.getContext('2d');

    loadImage('base_documentos/VersoIdentidade.png').then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      ctx.font = '35px "Roboto"';
      ctx.fillStyle = '#292835';
      ctx.textAlign = 'left';

      ctx.save();
      ctx.translate(200, 400); 
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(data_nascimento, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(200, 1020); 
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(nome_pet, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(330, 1020); 
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(filiacao, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(480, 1020);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(cidade_estado, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(620, 1020); 
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(cpf, 0, 0);
      ctx.restore();

      const outputPath = `public/uploads/cpf_verso_${filename}`; 
      fs.writeFileSync(outputPath, canvas.toBuffer('image/png')); 

      resolve(outputPath);
    }).catch((err) => {
      console.error('Erro ao carregar a imagem:', err);
      reject(err);
    });
  });
}

function createCNH(img_pet, nome_pet, cpf, filiacao, registro, filename) {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(600, 900); 
    const ctx = canvas.getContext('2d');

    loadImage('base_documentos/CNH.png').then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      return loadImage(img_pet);
    }).then((newImage) => {
      ctx.save();
      ctx.translate(350, 690); 
      ctx.rotate(-Math.PI / 2);

      const newWidth = 220;
      const newHeight = 260;

      ctx.drawImage(newImage, -newHeight / 2, -newWidth / 2, newWidth, newHeight); 

      ctx.font = '25px "Open Sans"';
      ctx.fillStyle = '#292835';

      ctx.fillText(nome_pet, 70, -145); 

      ctx.fillText(cpf, 200, -70);
      ctx.fillText(filiacao, 150, 50); 
      ctx.fillText('AB', 260, 120); 
      ctx.fillText(registro, 280, 205); 

      ctx.restore();

      const outputPath = `public/uploads/cnh_${filename}`; 
      fs.writeFileSync(outputPath, canvas.toBuffer('image/png')); 

      resolve(outputPath); 
    }).catch((err) => {
      console.error('Erro ao gerar imagem:', err);
      reject(err);
    });
  });
}

function createCLT(img_pet, nome, pisPasep, filename) {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(800, 1200);
    const ctx = canvas.getContext('2d');

    loadImage('base_documentos/CarteiraTrabalho2.png').then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      return loadImage(img_pet);
    }).then((newImage) => {
      ctx.drawImage(newImage, 80, 735, 273, 330);

      ctx.save();

      ctx.translate(300, 650);

      ctx.font = '35px "Arial"';
      ctx.fillStyle = '#292835';
      ctx.fillText(pisPasep, 0, -180);

      const heightName = nome.length < 20 ? 30 - 3 * nome.length : -50 - 3 * nome.length;
      ctx.font = '35px sans-serif';
      ctx.fillStyle = '#292835';
      ctx.fillText(nome, heightName, 0);

      ctx.restore();

      const outputPath = `public/uploads/clt_${filename}`; 
      fs.writeFileSync(outputPath, canvas.toBuffer('image/png')); 

      resolve(outputPath); 
    }).catch((err) => {
      console.error('Erro ao gerar imagem:', err);
      reject(err);
    });
  });
}

module.exports = { createCpfFrente, createCpfVerso, createCNH, createCLT };




