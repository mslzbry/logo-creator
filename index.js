// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

const COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'black',
  'brown',
  'white',
  'gray',
  'pink'
]

// regex reference: https://www.geeksforgeeks.org/how-to-validate-hexadecimal-color-code-using-regular-expression/#
const regHex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$') // use regex to determine if user input is a hex color

const validateColor = color => {
  // only allow user to type in a color in a predefined list or a hex number
  if (COLORS.includes(color.toLowerCase())) {
    return true
  } else if (regHex.test(color)) {
    // if user input matches regex for a hex color
    return true
  } else {
    // if user's input is not in the predefined list of colors and not a hex color then invalid input
    return false
  }
}
// Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter text characters (3):',
    validate: function (text) {
      return text.length <= 3 // validates user input to ensure 3 chars or less entered
    }
  },
  {
    type: 'input',
    name: 'color',
    message: 'Enter a color keyword (OR a hexadecimal number):',
    validate: validateColor
  },
  {
    type: 'list',
    name: 'shape',
    message: 'What shape would you like the logo to render?',
    choices: ['Triangle', 'Square', 'Circle']
  },
  {
    type: 'input',
    message:
      'Enter a color keyword for the shape (Enter color keyword OR a hexadecimal number)',
    name: 'shapeBackgroundColor',
    validate: validateColor
  }
]

// TODO: Create a function to create the SVG file
function writeToFile (data) {
  console.log(data)
  /*const outputReadme = './output/README.md'
  fs.writeFile(outputReadme, data, err => {
    if (err) console.log(err)
    else {
      console.log('File written successfully\n')
      console.log('The written has the following contents:')
      console.log(fs.readFileSync(outputReadme, 'utf8'))
    }
  })*/
}

// Create a function to initialize app
function init () {
  inquirer.prompt(questions).then(answers => writeToFile(answers))
}

// Function call to initialize app
init()
