const path = require('path')
const handel = require('./handle')
const start = require('./start')
const inquirer = require('./inquirer')
require('./select')
// const argv = require('yargs')
//   .command(
//     'add',
//     'create a file',
//     function(yargs) {
//       return yargs
//         .option('file', {
//           alias: 'f',
//           describe: 'create a file'
//         })
//         .demandOption(['file'], 'Please provide file to work with this tool')
//         .example('node tools/cli add -f test', '创建一个test模板')
//     },
//     async function(argv) {
//       // 控制台交互
//       const data = await inquirer({
//         placementPath: '.'
//       })
//       argv.path = data.placementPath
//       argv.templatePath = data.templatePath
//       // 根据参数，创建模板
//       start(argv)
//     }
//   )
//   .help('h').argv
;(async () => {
  // 控制台交互
  const data = await inquirer({
    placementPath: '.'
  })
  const argv = {
    file: data.file,
    path: data.placementPath,
    templatePath: data.templatePath
  }
  console.log(argv)
  // 根据参数，创建模板
  start(argv)
})()
