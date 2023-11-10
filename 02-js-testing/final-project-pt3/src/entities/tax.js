class Tax {
  static get taxesBasedOnAge() {
    return [
      { from: 18, to: 25, taxBasedOnAge: 1.1 },
      { from: 26, to: 30, taxBasedOnAge: 1.5 },
      { from: 31, to: 100, taxBasedOnAge: 1.3 }
    ]
  }
}

module.exports = Tax