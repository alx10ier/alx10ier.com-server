const expect = require('chai').expect

describe('basic', function() {
  describe('#sum()', function() {
    it('should add up all numbers', function() {
      expect(sum([1, 2, 3, 4])).to.equal('10')
    })
  })
})
