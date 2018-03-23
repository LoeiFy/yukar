var CryptoJS = require("crypto-js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my messa【喵鲜生】霜凌测试水果-柠檬类目常温商品，请不要拍，2-18【喵鲜生】霜凌测试水果-柠檬类目常温商品，请不要拍，2-18【喵鲜生】霜凌测试水果-柠檬类目常温商品，请不要拍，2-18ge 加中文', 'secret key 123');

console.log(ciphertext.toString())

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);

console.log(plaintext);
