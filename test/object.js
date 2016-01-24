var chai = require('chai');
var meld = require('../lib/index');

var expect = chai.expect;

describe ('Object', function() {
  describe('#extend(object, source)', function() {

    function Foo() {
     this.b = 2;
    }

    function Bar() {
      this.d = 4;
    }

    before(function() {
      Foo.prototype.c = 3;
      Bar.prototype.e = 5;
    });

    it('should iterates over own and inherited source properties.', function() {
      expect(meld.extend({ 'a': 1 }, new Foo, new Bar)).to.eql({ 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 });
    });
  });

  describe('#get(object, path, defaultValue)', function() {

    var object = { 'a': [{ 'b': { 'c': 3 } }] };

    it('should get the value at the path of object.', function() {
      expect(meld.get(object, 'a[0].b.c')).to.equal(3);
      expect(meld.get(object, ['a', '0', 'b', 'c'])).to.equal(3);
    });

    it('should should return defaultValue if defaultValue exist and the resolved value is `undefined`.', function() {
      expect(meld.get(object, 'a.b.c', 'default')).to.equal('default');
    });
  });

  describe('hasIn(object, path)', function() {

    var object = { 'a': { 'b': { 'c': 3 } } };

    it('should return if `path` is a direct or inherited property of `object`.', function(){
      expect(meld.hasIn(object, 'a')).to.equal(true);
      expect(meld.hasIn(object, 'a.b.c')).to.equal(true);
      expect(meld.hasIn(object, ['a', 'b', 'c'])).to.equal(true);
      expect(meld.hasIn(object, 'b')).to.equal(false);
    });
  });

  describe('keysIn(object)', function() {

    function Foo() {
      this.a = 1;
      this.b = 2;
    }

    before(function() {
      Foo.prototype.c = 3
    });

    it('should return an array of the own and inherited enumerable property names of `object`.', function(){
      expect(meld.keysIn(new Foo)).to.eql(['a', 'b', 'c']);
    });
  });

  describe('keys(object)', function() {

    function Foo() {
      this.a = 1;
      this.b = 2;
    }

    before(function() {
      Foo.prototype.c = 3
    });

    it('should return an array of the own enumerable property names of `object`.', function(){
      expect(meld.keys(new Foo)).to.eql(['a', 'b']);
      expect(meld.keys('hi')).to.eql(['0', '1']);
    });
  });

  describe('values(object)', function() {

    function Foo() {
      this.a = 1;
      this.b = 2;
    }

    before(function() {
      Foo.prototype.c = 3
    });

    it('should return an array of the own enumerable property values of `object`.', function(){
      expect(meld.values(new Foo)).to.eql([1, 2]);
      expect(meld.values('hi')).to.eql(['h', 'i']);
    });
  });

});
