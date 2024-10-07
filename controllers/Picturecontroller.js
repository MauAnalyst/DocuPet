const { json } = require('express');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Picture = require('../models/Pictures');
const PictureEdit = require("../controllers/PictureEdit");
const NumberDocs = require('../controllers/NumberDocs');
const enviarEmail = require('../controllers/EnviaEmail');


exports.create = async (req, res) => {
    try {
        const { documentos } = req.body
        const name_produto = documentos.split("-")[0];
        const price_produto = +documentos.split("-")[1].split(" ")[2].split(" ")[0].replace(",", ".");

        if(price_produto != 9.99 && price_produto != 4.99){
            return res.json({msg:"valor do produto está divergente"});
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: { 
                        currency: 'brl',
                        product_data: {
                            name: name_produto
                        },
                        unit_amount: price_produto * 100
                    },
                    quantity: 1
                }          
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/`
        });
    
        const id_strip = session.id;
        const { nome_pet, date_nasc, type_pet, city, filiacao } = req.body;
        const  file = req.file;
        const id_pet = `${nome_pet.split(" ")[0]}-${file.filename.slice(0, file.filename.indexOf("."))}`;

        const num_cpf = NumberDocs.gerarCPF();
        const num_clt = NumberDocs.gerarNclt();
        const num_cnh = NumberDocs.gerarNcnh();

        let cpf_frente_path = ''
        let cpf_verso_path = ''
        let cnh_path = 'public/uploads/naoAdquirido.png'
        let clt_path = 'public/uploads/naoAdquirido.png'

        if(price_produto == 4.99){
            const img_cpf_frete = await PictureEdit.createCpfFrente(file.path, nome_pet,file.filename);
            const img_cpf_verso = await PictureEdit.createCpfVerso(nome_pet, date_nasc, filiacao, city, num_cpf, file.filename);
            cpf_frente_path = img_cpf_frete;
            cpf_verso_path = img_cpf_verso;

        }else{
            const img_cpf_frete = await PictureEdit.createCpfFrente(file.path, nome_pet,file.filename);
            const img_cpf_verso = await PictureEdit.createCpfVerso(nome_pet, date_nasc, filiacao, city, num_cpf, file.filename);
            const img_cnh = await PictureEdit.createCNH(file.path, nome_pet, num_cpf, filiacao, num_cnh, file.filename);
            const img_clt = await PictureEdit.createCLT(file.path, nome_pet, num_clt, file.filename);
            cpf_frente_path = img_cpf_frete;
            cpf_verso_path = img_cpf_verso;
            cnh_path = img_cnh;
            clt_path = img_clt;
        }
        

        const picture = new Picture({
            id_strip,
            nome_pet,
            src_foto: file.path,
            date_nasc,
            type_pet,
            id_pet,
            city,
            filiacao,
            src_img_cpf_frente: cpf_frente_path,
            src_img_cpf_verso: cpf_verso_path,
            src_cnh: cnh_path,
            src_clt: clt_path,
            num_cpf,
            num_clt,
            num_cnh,
            email: 'aguardando usuario',
            status: 'aguardando pagamento',
        });
        

        await picture.save();

        //res.json({picture, msg:"imagem salva com sucesso"})
        res.redirect(session.url)
        

    } catch (error) {
        console.error("Erro ao salvar imagem:", error); 
        res.status(500).json({message: "Erro ao salvar imagem"})
    }
}

exports.success = async (req, res) => {
    try {
        const result = Promise.all([
            stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
            stripe.checkout.sessions.listLineItems(req.query.session_id)
        ]);
    
        const resultImport = JSON.parse(JSON.stringify(await result));
        const id_strip = resultImport[0].id;
        const status = resultImport[0].status;
        const email = resultImport[0].customer_details.email;

        const x = await Picture.findOne({id_strip})
        const id_pet = x.id_pet

        const picture = await Picture.findOneAndUpdate(
            { id_strip }, 
            { status: 'pagamento confirmado', email }, 
            { new: true }
        );

        if (!picture) {
            return res.status(404).json({ message: "Nenhuma imagem encontrada para este id" });
        }

        enviarEmail.enviarEmail(email, id_pet);

        res.render('success', { x });

        
    } catch (error) {
        console.log('erro')
    }

}

exports.consultaPet = async (req, res) => {
    const { consulta_pet } = req.body;

    const consulta_id = consulta_pet.trim();

    try {
        // Verifica se o input é um email ou um ID_pet
        let picture = await Picture.findOne({ id_pet: consulta_id });

        if (!picture) {
            //return res.status(404).json({ message: "Nenhuma imagem encontrada para este ID" });
            return res.render('consulta', { error: "ID_PET inválido" });

        } else {
            if (picture.status === 'pagamento confirmado') {
                return res.redirect(`/consultar/${picture.id_pet}`);
            } else {
                return res.json({ message: "O pagamento não foi efetuado" });
            }
        }

        
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar imagem", error });
    }
}

exports.exibeConsulta = async (req, res) => {
    const id_pet = req.params.id_pet;
    try {
        const picture = await Picture.findOne({ id_pet });

        if (!picture) {
            return res.status(404).json({ message: "Nenhuma imagem encontrada para este id" });
        }

        const cpf_frete = picture.src_img_cpf_frente
        console.log(cpf_frete)
        res.render('exibeConsulta', { picture });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar imagem", error });
    }
}

// exports.updateStatus = async (req, res) => {
//     try {

//         console.log('chegou aq');
//         const result = Promise.all([
//             stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
//             stripe.checkout.sessions.listLineItems(req.query.session_id)
//         ]);
    
//         const resultImport = JSON.parse(JSON.stringify(await result));
//         const id_strip = resultImport[0].id;
//         const status = resultImport[0].status;
//         const email = resultImport[0].customer_details.email;
    
//         console.log(email)
//         console.log(status)

//         // const { email } = req.headers; 
//         // const { id_pet } = req.params;
//         // const pictures = await Picture.find();

//         // Atualiza apenas o campo status no banco de dados
//         // const picture = await Picture.findOneAndUpdate(
//         //     { id_pet }, 
//         //     { status: 'pagamento confirmado' }, 
//         //     { new: true }
//         // );

//         const picture = await Picture.findOneAndUpdate(
//             { id_strip }, 
//             { status: 'pagamento confirmado', email }, 
//             { new: true }
//         );

//         enviarEmail.enviarEmail(email, 'id_pet')

//         if (!picture) {
//             return res.status(404).json({ message: "Nenhuma imagem encontrada para este id" });
//         }

//         //res.json({ picture, msg: "Status atualizado para 'pagamento confirmado'" });
//         //res.sendFile(path.join(__dirname, '../public/success.html'));

//     } catch (error) {
//         console.error("Erro ao atualizar status:", error);
//         res.status(500).json({ message: "Erro ao atualizar status" });
//     }
// };


