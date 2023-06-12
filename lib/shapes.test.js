const { Triangle, Square, Circle } = require('./shapes.js')

// Unit test - triangle
describe('Triangle test', () => {
  test('test for a triangle with a blue background color', () => {
    const shape = new Triangle()
    shape.setColor('blue')
    expect(shape.render()).toEqual(
      '<polygon points="150, 18 244, 182 56, 182" fill="blue" />'
    )
  })
})

// Unit test - square
describe('Square test', () => {
  test('test square with a pink background color', () => {
    const shape = new Square()
    shape.setColor('pink')
    expect(shape.render()).toEqual(
      '<rect x="75" y="25" width="150" height="150" fill="pink" />'
    )
  })
})

// Unit test - circle
describe('Circle test', () => {
  test('test circle with a bg hex color of #FA8072 ', () => {
    const shape = new Circle()
    shape.setColor('#FA8072')
    expect(shape.render()).toEqual(
      '<circle cx="150" cy="100" r="70" fill="#FA8072" />'
    )
  })
})
