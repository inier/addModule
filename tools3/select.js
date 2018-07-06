const inquirer = require('inquirer')
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
module.exports = function() {
  return inquirer.prompt([
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
      default: 'components/',
      suggestOnly: false
      // suggestOnly :: Bool
      // Restrict prompt answer to available choices or use them as suggestions
    }
  ])
}
