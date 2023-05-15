const ethers = require('ethers');
const crypto = require('crypto');
const sf = require('./saveFile');


const list = [];
const count = 80;

for (let i = 0; i < count; i++) {
  const id = crypto.randomBytes(32).toString('hex');
  const privateKey = '0x' + id;
  const wallet = new ethers.Wallet(privateKey);
  list.push(wallet.address);
}

sf('./src/lists/ourFreelist.json', JSON.stringify(list));


module.exports = list;
