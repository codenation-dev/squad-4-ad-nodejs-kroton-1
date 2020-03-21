
const crypto = require("crypto");
const cipher = crypto.createCipher();

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "chaves",
    tipo : "hex"
};

module.exports = {criptografar:(senha)=> {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    cipher.update(senha);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
}}

module.exports = {descriptografar : (senha) => {
    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);
    return decipher.final();
}}