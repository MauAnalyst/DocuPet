const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');


function createCpfFrente(img_pet, nome_pet, filename) {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(800, 1200);
    const ctx = canvas.getContext('2d');

    // Carrega e desenha a imagem do template
    
    loadImage('base_documentos/FrenteIdentidade.png').then((image) => {
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
      ctx.font = '50px "Great Vibes"';
      ctx.fillStyle = '#292835';
      ctx.fillText(textName, heightName, 0);

      // Salva a imagem no sistema de arquivos
      const outputPath = `public/uploads/cpf_frente_${filename}`; // Caminho onde a imagem será salva
      fs.writeFileSync(outputPath, canvas.toBuffer('image/png')); // Salva a imagem

      resolve(outputPath); // Retorna o caminho da imagem gerada
    }).catch((err) => {
      console.error('Erro ao gerar imagem:', err);
      reject(err);
    });
  });
}

function createCpfVerso(nome_pet, data_nascimento, filiacao, cidade_estado, cpf, filename) {
  return new Promise((resolve, reject) => {
    // Dimensões do canvas de acordo com a imagem de fundo
    const canvas = createCanvas(800, 1200);
    const ctx = canvas.getContext('2d');

    // Carrega e desenha a imagem de fundo
    loadImage('base_documentos/VersoIdentidade.png').then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Define o estilo de texto
      ctx.font = '35px "Roboto"';
      ctx.fillStyle = '#292835';
      ctx.textAlign = 'left';

      // Rotaciona o canvas para inserir o texto na posição vertical (90 graus)
      ctx.save();
      ctx.translate(200, 400);  // Ajusta a posição para a "Data de Nascimento"
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(data_nascimento, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(200, 1020);  // Ajusta a posição para o "Nome do PET"
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(nome_pet, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(330, 1020);  // Ajusta a posição para a "Filiação"
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(filiacao, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(480, 1020);  // Ajusta a posição para "Cidade - Estado"
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(cidade_estado, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(620, 1020);  // Ajusta a posição para o "CPF"
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(cpf, 0, 0);
      ctx.restore();

      // Salva a imagem no sistema de arquivos
      const outputPath = `public/uploads/cpf_verso_${filename}`; // Caminho onde a imagem será salva
      fs.writeFileSync(outputPath, canvas.toBuffer('image/png')); // Salva a imagem

      resolve(outputPath); // Retorna o caminho da imagem gerada
    }).catch((err) => {
      console.error('Erro ao carregar a imagem:', err);
      reject(err);
    });
  });
}

function createCNH(img_pet, nome_pet, cpf, filiacao, registro, filename) {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(600, 900); // Dimensão do canvas
    const ctx = canvas.getContext('2d');

    // Carrega e desenha a imagem do template
    loadImage('base_documentos/CNH.png').then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Carrega e desenha a nova imagem (imagem do pet)
      return loadImage(img_pet);
    }).then((newImage) => {
      // Salva o estado do contexto antes da rotação
      ctx.save();

      // Move o contexto para o centro da posição onde a rotação deve ocorrer
      ctx.translate(350, 690); // Ajuste a posição conforme necessário

      // Rotaciona o contexto em -90 graus
      ctx.rotate(-Math.PI / 2);

      // Define dimensões padrão para a nova imagem (220x260)
      const newWidth = 220;
      const newHeight = 260;

      // Desenha a nova imagem com as dimensões padrão
      ctx.drawImage(newImage, -newHeight / 2, -newWidth / 2, newWidth, newHeight); 

      // Define a fonte e a cor do texto
      ctx.font = '25px "Open Sans"';
      ctx.fillStyle = '#292835';

      // Adiciona o texto rotacionado
      ctx.fillText(nome_pet, 70, -145); // Ajuste a posição y conforme necessário

      // Adiciona os novos textos
      ctx.fillText(cpf, 200, -70);
      ctx.fillText(filiacao, 150, 50); 
      ctx.fillText('AB', 260, 120); 
      ctx.fillText(registro, 280, 205); 

      // Restaura o contexto para o estado anterior à rotação
      ctx.restore();

      // Salva a imagem no sistema de arquivos
      const outputPath = `public/uploads/cnh_${filename}`; // Caminho onde a imagem será salva
      fs.writeFileSync(outputPath, canvas.toBuffer('image/png')); // Salva a imagem

      resolve(outputPath); // Retorna o caminho da imagem gerada
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

    // Carrega e desenha a imagem do template
    loadImage('base_documentos/CarteiraTrabalho2.png').then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Carrega e desenha a nova imagem (imagem do pet)
      return loadImage(img_pet);
    }).then((newImage) => {
      ctx.drawImage(newImage, 80, 735, 273, 330);

      // Salva o estado do contexto antes da rotação
      ctx.save();

      ctx.translate(300, 650);

      // Adicionando o número PIS/PASEP
      ctx.font = '35px "Arial"';
      ctx.fillStyle = '#292835';
      ctx.fillText(pisPasep, 0, -180);

      // Adicionando o nome
      const heightName = nome.length < 20 ? 30 - 3 * nome.length : -50 - 3 * nome.length;
      ctx.font = '35px sans-serif';
      ctx.fillStyle = '#292835';
      ctx.fillText(nome, heightName, 0);

      // Restaura o contexto para o estado anterior
      ctx.restore();

      // Salva a imagem no sistema de arquivos
      const outputPath = `public/uploads/clt_${filename}`; // Caminho onde a imagem será salva
      fs.writeFileSync(outputPath, canvas.toBuffer('image/png')); // Salva a imagem

      resolve(outputPath); // Retorna o caminho da imagem gerada
    }).catch((err) => {
      console.error('Erro ao gerar imagem:', err);
      reject(err);
    });
  });
}

module.exports = { createCpfFrente, createCpfVerso, createCNH, createCLT };




