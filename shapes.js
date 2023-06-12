class Shape {
  constructor (color) {
    this.color = color
  }
}

class Triangle extends Shape {
  render () {
    return `<polygon points="100 0, 0, 0 50, 100" fill="${this.color}" />`
  }
}

class Square extends Shape {
  render () {
    return `<rect width="100" height="100" fill="${this.color}" />`
  }
}

class Circle extends Shape {
  render () {
    return `<circle cx="50" cy="50" r="50" fill="${this.color}" />`
  }
}

module.exports = { Triangle, Square, Circle }
