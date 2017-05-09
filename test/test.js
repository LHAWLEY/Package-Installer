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

describe('#sort', function () {
  it('orders the packages so that dependencies come first', function () {
    const packages = {
      chai: 'mocha',
      mocha: ''
    };

    expect(index.sort(packages)).to.deep.eq(['mocha', 'chai']);
  });
});

describe('#install', function () {
  it('returns a comma delimited string of libraries in the order they should be installed', function () {
    const input = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: Leetmeme','Ice: '];

    expect(index.install(input)).to.deep.eq(
      'KittenService, Ice, Cyberportal, CamelCaser, Leetmeme, Fraudstream'
    );
  });
});

