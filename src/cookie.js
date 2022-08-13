
const fs = require('fs');
const { cookiePath } = require('./constants');

module.exports = function (options) {
  if (options.set) {
    fs.writeFileSync(cookiePath, options.set);
    console.log('write success');
    return;
  }

  if (options.get) {
    const cookie = fs.readFileSync(cookiePath, 'utf-8');
    console.log(cookie);
  }
}