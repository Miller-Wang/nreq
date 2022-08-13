const path = require('path');

module.exports = {
  METHODS: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  urlReg: /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i,
  cookiePath: path.resolve(__dirname, 'cookie.txt'),
} 
