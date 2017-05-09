const chai = require('chai');
const expect = chai.expect;
const index = require('../index');

describe('#parse', function () {
  it('turns an array of libraries into a object', function () {
    const libraries = ['chai: mocha', 'mocha: '];
    const object = index.parse(libraries);

    expect(object).to.deep.eq({
      chai: 'mocha',
      mocha: ''
    });
  });
});


