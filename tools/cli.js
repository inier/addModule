// 文档地址：https://github.com/yargs/yargs/blob/HEAD/docs/api.md#demandOption
const path = require('path')
const handel = require('./handle')
const start = require('./start')
/**
 * cli.js
 * 第一步：需要传递的参数
 * 存在三个参数
 * file: 文件夹以及模块名(必填)
 * path: 文件存放路径
 * type: 模板类型
 * */
/**
 * 第二步：创建一个命令，并且处理传入的参数
 * command(cmd, desc, [builder], [handler])
 * 用command方法创建了一个add命令，将先前定义的参数放到command的bulider里面
 * 在处理函数里面处理传参
 *
 */
/**
 * 第三步：处理参数
 *    1.创建文件夹
 *    2.创建文件
 */
/**
 * 第四步：自定义模板
 *  能够创建文件是不够的，我们需要文件内容是我们定义好的模板内容，所以我们先定义好模板
 *  人机交互process
 */
/**
 * 第五步：做一些体验优化
 */
const argv = require('yargs')
  .command(
    'add',
    'create a file',
    function(yargs) {
      return yargs
        .option('file', {
          alias: 'f',
          describe: 'create a file'
        })
        .option('path', {
          alias: 'p',
          describe: 'file path',
          default: ''
        })
        .option('type', {
          alias: 't',
          describe: 'file‘s type',
          choices: ['vue', 'react'], // 现在有两个模板供选择，可以根据自己的项目情况设计模板
          default: 'vue'
        })
        .demandOption(['file'], 'Please provide file to work with this tool')
        .example(
          'node tools/cli add  -p views -f test -t vue',
          '在views目录下创建一个test模板'
        )
    },
    function(argv) {
      // 根据参数，创建模板
      start(argv)
    }
  )
  .help('h').argv
