'use strict'
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const handel = require('./handle')

const placementPath = './'

run(placementPath, true)
async function run(placementPath, needTemplate) {
  console.log(placementPath, path.resolve(placementPath))
  // 模板文件名
  const template = await handel.getFolder('tools/Template')
  const templateChoice = [].concat(template)
  // 源文件名
  const placement = await handel.getFolder(placementPath)

  const selectTemplate = [
    {
      type: 'list',
      name: 'template',
      message: '请选择模板?',
      choices: templateChoice
    }
  ]

  const selectPlacement = [
    {
      type: 'list',
      name: 'placement',
      message: '请选择放置地址?',
      choices: placement,
      filter: function(val) {
        return val.toLowerCase()
      }
    },
    {
      type: 'confirm',
      name: 'askAgain',
      message: '是否选择当前文件夹? y/是 n/进入下一层',
      default: true
    }
  ]

  // prompts执行步骤
  let prompts = []
  if (needTemplate) {
    prompts = [].concat(selectTemplate).concat(selectPlacement)
  } else {
    prompts = [].concat(selectPlacement)
  }

  return new Promise(function(resolve, reject) {
    inquirer.prompt([].concat(selectPlacement)).then(answers => {
      if (answers.askAgain) {
        // 选择
      } else {
        // 进入下一层
        placementPath += answers.placement
        run(placementPath, false)
      }
    })
  })
}
