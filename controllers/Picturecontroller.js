const { json } = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Picture = require('../models/Pictures');
const PictureEdit = require("../controllers/PictureEdit");
const NumberDocs = require('../controllers/NumberDocs');
const enviarEmail = require('../controllers/EnviaEmail');


exports.create = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: { 
                        currency: 'brl',
                        product_data: {
                            name: 'Carteira de identidade (CPF)'
                        },
                        unit_amount: 4.99 * 100
                    },
                    quantity: 1
                },
                // {
                //     price_data: {
                //         currency: 'brl',
                //         product_data: {
                //             name: 'JavaScript T-Shirt'
                //         },
                //         unit_amount: 20 * 100
                //     },
                //     quantity: 2
                // }            
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/cancel`
        })
    
        //console.log(session.id)
        const id_strip = session.id;
        const { nome_pet, date_nasc, type_pet, city, filiacao_mae, filiacao_pai } = req.body;
        const  file = req.file;
        const id_pet = `${nome_pet.split(" ")[0]}-${file.filename.slice(0, file.filename.indexOf("."))}`;

        const num_cpf = NumberDocs.gerarCPF();
        const num_clt = NumberDocs.gerarNclt();
        const num_cnh = NumberDocs.gerarNcnh();

        const editedImagePath = await PictureEdit.createImage(file.path, nome_pet,file.filename);

        const picture = new Picture({
            id_strip,
            nome_pet,
            src_foto: file.path,
            date_nasc,
            type_pet,
            id_pet,
            city,
            filiacao_mae,
            filiacao_pai,
            src_img_cpf_frente: editedImagePath,
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

exports.sucesse = async (req, res) => {
    try {
        console.log('chegou aq');
        const result = Promise.all([
            stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
            stripe.checkout.sessions.listLineItems(req.query.session_id)
        ]);
    
        const resultImport = JSON.parse(JSON.stringify(await result));
        const id_strip = resultImport[0].id;
        const status = resultImport[0].status;
        const email = resultImport[0].customer_details.email;

        const picture = await Picture.findOneAndUpdate(
            { id_strip }, 
            { status: 'pagamento confirmado', email }, 
            { new: true }
        );

        enviarEmail.enviarEmail(email, 'id_pet')

        if (!picture) {
            return res.status(404).json({ message: "Nenhuma imagem encontrada para este id" });
        }
    } catch (error) {
        console.log('erro')
    }
    
    res.send('Your payment was successful');
}

exports.findAll = async (req, res) => {
    try {
        const id_pet = req.params;
        const picture = await Picture.find(id_pet);

        if (!picture || picture.length === 0) {
            return res.status(404).json({ message: "Nenhuma imagem encontrada para este id" });
        }

        
        const x = JSON.parse(JSON.stringify(picture))
        if (x[0].status === 'aguardando pagamento'){
            return res.json({message: "O pagamento não foi efetuado"})
        }else{
            res.json(picture);
        }
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar imagem"}, error)
    }
}

exports.updateStatus = async (req, res) => {
    try {

        console.log('chegou aq');
        const result = Promise.all([
            stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
            stripe.checkout.sessions.listLineItems(req.query.session_id)
        ]);
    
        const resultImport = JSON.parse(JSON.stringify(await result));
        const id_strip = resultImport[0].id;
        const status = resultImport[0].status;
        const email = resultImport[0].customer_details.email;
    
        console.log(email)
        console.log(status)

        // const { email } = req.headers; 
        // const { id_pet } = req.params;
        // const pictures = await Picture.find();

        // Atualiza apenas o campo status no banco de dados
        // const picture = await Picture.findOneAndUpdate(
        //     { id_pet }, 
        //     { status: 'pagamento confirmado' }, 
        //     { new: true }
        // );

        const picture = await Picture.findOneAndUpdate(
            { id_strip }, 
            { status: 'pagamento confirmado', email }, 
            { new: true }
        );

        enviarEmail.enviarEmail(email, 'id_pet')

        if (!picture) {
            return res.status(404).json({ message: "Nenhuma imagem encontrada para este id" });
        }

        //res.json({ picture, msg: "Status atualizado para 'pagamento confirmado'" });
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.status(500).json({ message: "Erro ao atualizar status" });
    }
};


