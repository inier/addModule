'use strict'
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const emoji = require('node-emoji')
const colors = require('colors')

const handel = require('./handle')
var templateName = ''
/**
 * @param args
 * placementPath: 放置模板地址
 * needTemplate 是否需要显示选择模板
 * backVisible 是否需要显示返回
 * isConfirm 选择是否需要判断
 * resolve
 *
 */
module.exports = async function run({
  placementPath,
  needTemplate,
  backVisible,
  fistResolve
}) {
  // 模板文件名
  const template = await handel.getFolder('tools2/Template')
  const templateChoice = [].concat(template)
  // 源文件名
  const placement = await handel.getFolder(placementPath)
  if (backVisible) {
    placement.push(colors.blue('返回上一层') + emoji.get('back'))
  }
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
      when: function(answers) {
        if (!templateName) {
          templateName = answers.template
        }
        return true
      }
    }
  ]
  selectPlacement.push({
    type: 'confirm',
    name: 'askAgain',
    message: `是否选择当前文件夹? ${colors.blue('y/是')} , ${colors.blue(
      'n/进入下一层'
    )}`,
    default: true,
    when: function(answers) {
      return !answers.placement.includes('返回上一层')
    }
  })

  // prompts执行步骤
  let prompts = []
  if (needTemplate) {
    prompts = [].concat(selectTemplate).concat(selectPlacement)
  } else {
    prompts = [].concat(selectPlacement)
  }
  return new Promise(async function(resolve, reject) {
    const answers = await inquirer.prompt(prompts)

    console.log(answers)
    if (answers.askAgain) {
      const p = placementPath + '/' + answers.placement
      resolve({
        placementPath: p,
        templatePath: `./Template/${templateName}`
      })

      // 选择
    } else {
      if (answers.placement.indexOf('返回上一层') > 0) {
        const arr = placementPath.split('/')
        arr.pop()
        placementPath = arr.join('/')
        // 返回上一层
        resolve(
          run({
            placementPath,
            needTemplate: false,
            backVisible: placementPath !== '.'
          })
        )
      } else {
        // 进入下一层
        placementPath += '/' + answers.placement
        resolve(
          run({
            placementPath,
            needTemplate: false,
            backVisible: placementPath !== '.'
          })
        )
      }
    }
  })
}
