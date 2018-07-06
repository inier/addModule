'use strict'
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const colors = require('colors')
const handel = require('./handle')
/**
 * @param args
 * placementPath: 放置模板地址
 */
module.exports = async function run({ placementPath }) {
  // 模板文件名
  const template = await handel.getFolder('tools3/Template')
  const templateChoice = [].concat(template)
  const inputName = [
    {
      type: 'input',
      name: 'file',
      message: '请输入文件名称'
    }
  ]
  const selectTemplate = [
    {
      type: 'list',
      name: 'template',
      message: '请选择模板?',
      choices: templateChoice
    }
  ]
  const selectPlacementPath = [
    {
      type: 'fuzzypath',
      name: 'path',
      pathFilter: (isDirectory, nodePath) => isDirectory,
      // pathFilter :: (Bool, String) -> Bool
      // pathFilter allows to filter FS nodes by type and path
      rootPath: 'src',
      // rootPath :: String
      // Root search directory
      message: '请选择放置文件夹:',
      default: '',
      suggestOnly: false
      // suggestOnly :: Bool
      // Restrict prompt answer to available choices or use them as suggestions
    }
  ]
  // prompts执行步骤
  const prompts = []
    .concat(inputName)
    .concat(selectTemplate)
    .concat(selectPlacementPath)
  return new Promise(async function(resolve, reject) {
    const answers = await inquirer.prompt(prompts)
    resolve({
      file: answers.file,
      placementPath: answers.path,
      templatePath: `./Template/${answers.template}` // 这里暂时鞋子模板地址，也可以换成选择放置地址的方法
    })
  })
}
