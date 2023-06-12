// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

const FILENAME = 'logo.svg' // name of the generated logo file

// list of all possible color keywords supported by svg
// reference: https://www.w3.org/TR/SVG11/types.html#ColorKeywords
const COLORS = [
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'saddlebrown',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen'
]

const { Triangle, Square, Circle } = require('./lib/shapes')

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
    name: 'textColor',
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
    message: 'Enter a color keyword for the shape (OR a hexadecimal number)',
    name: 'bgColor',
    validate: validateColor
  }
]

// This function builds the string for the SVG based on user input and creates the file
function writeToFile (answers) {
  let chosenShape = ''
  switch (answers.shape) {
    case 'Triangle':
      chosenShape = new Triangle()
      chosenShape.setColor(answers.bgColor)
      break
    case 'Square':
      chosenShape = new Square()
      chosenShape.setColor(answers.bgColor)
      break
    case 'Circle':
      chosenShape = new Circle()
      chosenShape.setColor(answers.bgColor)
      break
  }

  // the logo will be a 300x200 pixel image
  // build the svg string based on user input
  let svg = `
  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><g>
  ${chosenShape.render()}
  <text x="50%" y="50%" text-anchor="middle" alignment-baseline="central" font-size="40" font-family="arial" fill="${
    answers.textColor
  }"> ${answers.text}</text></g></svg>`

  // write the svg file to disk
  fs.writeFile(FILENAME, svg, err => {
    if (err) console.log(err)
    else {
      console.log('Generated logo.svg \n')
    }
  })
}

// Create a function to initialize app
function init () {
  inquirer.prompt(questions).then(answers => writeToFile(answers))
}

// Function call to initialize app
init()
