const mongoose = require("mongoose");

const Schema = mongoose.Schema

const PictureSchema = new Schema({
    id_strip:{type: String, required: true},
    nome_pet: {type: String, required: true},
    src_foto: {type: String, required: true},
    date_nasc: {type: String, required: true},
    type_pet: {type: String, required: true},
    id_pet: {type: String, required: true},
    city: {type: String, required: true},
    filiacao: {type: String, required: true},
    src_img_cpf_frente: {type: String, required: true},
    src_img_cpf_verso: {type: String, required: true},
    src_cnh: {type: String, required: true},
    src_clt: {type: String, required: true},
    num_cpf: {type: String, required: true},
    num_clt: {type: String, required: true},
    num_cnh: {type: String, required: true},
    email: {type: String, required: true},
    status: {type: String, required: true},
})


module.exports = mongoose.model("Picture", PictureSchema)