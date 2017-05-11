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
  context('if there is no cycle', function () {
    it('returns a comma delimited string of libraries in the order they should be installed', function () {
      const input = ['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: '];

      console.log('OUTPUT:', index.install(input));

      expect(index.install(input)).to.deep.eq(
        'KittenService, Ice, Cyberportal, CamelCaser, Leetmeme, Fraudstream'
      );
    });
  })


  context('if there is a cycle', function (){
    it('should fail', function () {
      const input = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme'];

      expect(function() {index.install(input)}).to.throw(
        "This is a cycle"
      )
    })
  })
});

describe('#isCycle', function () {
  context('given a cyclical graph', function () {
    it('is true', function () {
      const cyclical = { A: 'B', B: 'C', C: 'A'};

      expect(index.isCycle(cyclical)).to.eq(true);
    });
  });

  context('given an acyclical graph', function () {
    it('is false', function () {
      const acyclical = { A: 'B', B: 'C', C: 'D', D: ''};

      expect(index.isCycle(acyclical)).to.eq(false);
    });

    it('is false', function () {
      const acyclical = index.parse(['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: ']);

      expect(index.isCycle(acyclical)).to.eq(false);
    });
  });
});
