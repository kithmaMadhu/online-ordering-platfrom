const sum = require('../calculateBill')

test('properly take the products price', () => {
    expect(sum(25, 3)).toBe(75)
})