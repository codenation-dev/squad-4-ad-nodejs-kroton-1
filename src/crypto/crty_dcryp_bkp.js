
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
    const crypted = cipher.update(senha, 'utf8', 'base64') + cipher.final('base64');
    return iv.toString('base64')+':'+crypted;
})

testecript.descriptografar = (senha =>
    {
    const parts = senha.split(":")
    const decipher = crypto.createDecipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo, new Buffer.from(parts[0], 'base64'));
    const plain = decipher.update(parts[1], 'base64', 'utf8')+decipher.final('utf8');
    return plain;
})

module.exports = testecript

