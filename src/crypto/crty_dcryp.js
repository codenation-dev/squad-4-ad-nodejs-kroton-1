
const crypto = require("crypto");

const testecript = {}

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "chaveschaves1234chaveschaves1234",
    tipo : "base64"
};

testecript.criptografar = (senha =>
    {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo, iv);
    cipher.update(senha);
    return iv.toString('base64')+':'+cipher.final(DADOS_CRIPTOGRAFAR.tipo);
})

testecript.descriptografar = (senha =>
    {
    const parts = senha.split(":")
    const decipher = crypto.createDecipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo, new Buffer(parts[0], 'base64'));
    decipher.update(parts[1], senha, DADOS_CRIPTOGRAFAR.tipo);
    return decipher.final('utf8');
})

module.exports = testecript

