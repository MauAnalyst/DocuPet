function gerarCPF() {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }

    // Cálculo dos dígitos verificadores
    let soma1 = 0;
    for (let i = 0; i < 9; i++) {
        soma1 += parseInt(cpf[i]) * (10 - i);
    }
    let digito1 = 11 - (soma1 % 11);
    digito1 = digito1 >= 10 ? 0 : digito1;

    let soma2 = 0;
    for (let i = 0; i < 9; i++) {
        soma2 += parseInt(cpf[i]) * (11 - i);
    }
    soma2 += digito1 * 2;
    let digito2 = 11 - (soma2 % 11);
    digito2 = digito2 >= 10 ? 0 : digito2;

    cpf += digito1 + '' + digito2;

    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
}

function gerarNclt() {
    let clt = '';
    for (let i = 0; i < 7; i++) {
        clt += Math.floor(Math.random() * 10);
    }

    // Cálculo do dígito verificador (apenas um exemplo)
    const dVerificador = Math.floor(Math.random() * 10);
    const dSuffix = Math.floor(Math.random() * 10);
    
    return `${clt.slice(0, 3)}.${clt.slice(3, 7)}.${dVerificador}-${dSuffix}`;
}

function gerarNcnh() {
    let cnh = '';
    for (let i = 0; i < 6; i++) {
        cnh += Math.floor(Math.random() * 10);
    }
    return `00${cnh}`;
}

// Testando as funções
// const cpfGerado = gerarCPF();
// const nCLTgerado = gerarNclt();
// const nCNHgerado = gerarNcnh();
// console.log(cpfGerado, nCLTgerado, nCNHgerado);

module.exports = { gerarCPF, gerarNclt, gerarNcnh };
