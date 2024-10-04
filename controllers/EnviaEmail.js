const nodemailer = require('nodemailer');
require("dotenv").config();

const email = process.env.EMAILUSER;
const senha = process.env.EMAILPASS;


function enviarEmail(destinatario, idPet) {
    // Configuração do transportador
    const transporter = nodemailer.createTransport({
        service: 'gmail', // ou outro serviço de e-mail
        auth: {
            user: email,//EMAILUSER, // seu e-mail
            pass: senha //EMAILPASS
        }
    });

    // Conteúdo HTML para o e-mail
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; margin: 50px 0; background-color: #1F2833; padding: 20px 0; border-radius: 15px;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" >
            <h1 style="color: #66FCF1;">Pagamento Confirmado!</h1>
            <p style="color: #fff;">Obrigado pelo pagamento. O ID do seu pet foi gerado com sucesso.</p>
            <p style="color: #fff;">Seu ID do Pet é: <span style="font-size: 1.2em; font-weight: bold; color: #66FCF1;">${idPet}</span></p>
            <p style="color: #fff;">Agora você pode consultar abaixo os documentos do seu PET.</p>
            <a href="https://seusite.com/consultar-pet/${idPet}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 1.1em; text-decoration: none; border-radius: 5px; border: 1.5px solid #66FCF1; color: #fff;">Consultar ID do Pet</a>
        </div>
    </div>
    `;

    const mailOptions = {
        from: email, // Remetente
        to: destinatario, // Destinatário
        subject: 'DocuPet - Documentos do seu pet gerado com sucesso!!!', // Assunto
        html: htmlContent // Conteúdo HTML
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Erro ao enviar o e-mail: ' + error);
        }
        console.log('E-mail enviado: ' + info.response);
    });
}

module.exports = { enviarEmail }