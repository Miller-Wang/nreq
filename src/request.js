const axios = require('axios');
const fs = require('fs');
const { urlReg, cookiePath } = require('./constants');


// 解析命令行参数
function parseParams(options, params) {
  const [method, url] = params;

  if (!urlReg.test(url)) {
    console.log('url不合法');
    return false;
  }

  // 获取其他参数
  try {
    if (options.data) {
      options.data = JSON.parse(options.data);
    }
    if (options.headers) {
      options.headers = JSON.parse(options.headers);
    }

    // 请求头没有cookie, 设置默认cookie
    if (!options.headers || !options.headers.cookie) {
      const cookie = fs.readFileSync(cookiePath, 'utf-8');
      options.headers = options.headers || {};
      options.headers.cookie = cookie;
    }

  } catch (error) {
    console.log('[ParseParams Error]:', error);
  }

  return { url, method: method.toUpperCase(), ...options };
}

module.exports = function (options, argvs) {
  const params = parseParams(options, argvs);
  if (params) {
    axios(params)
      .then((res) => res.data)
      .then((res) => {
        try {
          const result = JSON.stringify(res);
          console.log(result);
        } catch (error) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log('[Request Error]:', err);
      });
  }
}

