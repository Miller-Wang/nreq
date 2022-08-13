const { version, name } = require('../package.json'); //获取版本号
const { program } = require('commander');
const { METHODS, urlReg } = require('./constants');

const argvs = process.argv.slice(2);

if (argvs.length > 0 && urlReg.test(argvs[0])) {
  // 第一个参数是url, 默认get请求
  require('./request')(program, ['GET', ...argvs]);
  return;
}

function init() {
  program.name(name).description('node curl').version(version);
  //用户监听help事件打印出信息  运行 --help
  program.on('--help', () => {
    console.log('\r\nExamples: ncurl GET http://www.baidu.com');
  });    

  // 设置cookie
  program
    .command('cookie')
    .description('set/get cookie for global request')
    .option('-s, --set <value>', 'set cookie')
    .option('-g, --get', 'get cookie')
    .action((options) => {
      require('./cookie')(options);
    });


  METHODS.forEach(method => {
    program
      .command(method)
      .alias(method.toLowerCase())
      .description(method + ' method')
      .option('-h, --headers <value>', 'set headers')
      .option('-d, --data <value>', 'set data')
      .action((options) => {
        require('./request')(options, argvs);
      });
  });

  program.parse();
}

init();
