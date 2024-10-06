const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true)

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.qj1jx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);


    console.log('conectado com sucesso')
}

main().catch((error)=> {
    console.log(error)
})