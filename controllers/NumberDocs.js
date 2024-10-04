function gerarCPF() {
    let cpf = '';
    for (let i = 0; i < 11; i++) {
        cpf += Math.floor(Math.random() * 10);
    }
    return cpf;
}

function gerarNclt(){
    let clt = '';
    for (let i = 0; i < 7; i++) {
        clt += Math.floor(Math.random() * 10);
    }
    return clt;
}

function gerarNcnh(){
    let cnh = '';
    for (let i = 0; i < 9; i++) {
        cnh += Math.floor(Math.random() * 10);
    }
    return cnh;

}

// const cpfGerado = gerarCPF();
// const nCLTgerado = gerarNclt();
// const nCNHgerado = gerarNcnh();
// console.log(cpfGerado, nCLTgerado, nCNHgerado); 

module.exports = { gerarCPF, gerarNclt, gerarNcnh };
