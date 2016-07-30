var expect = require('chai').expect,
  checks = require('allex_checkslowlevellib'),
  lib = require('..')(checks.isFunction,checks.isArray,checks.isNumber,checks.isString);

describe('Testing \'Destruction\' lib', function(){
  it('arryDestroyEl', function(){
    var obj,arry,index,a,b;
    obj = 2;
    expect(lib.arryDestroyEl.bind(lib,obj,null,null)).to.throw(Error,/is not an object/);
    obj = new Object();
    expect(lib.arryDestroyEl.bind(lib,obj,null,null)).to.throw(Error,/does not have method destroy/);
    obj.destroy = true;
    expect(lib.arryDestroyEl.bind(lib,obj,null,null)).to.throw(Error,/is not a function/);
    obj.destroy = function(){};
    arry = {};
    expect(lib.arryDestroyEl.bind(lib,obj,null,arry)).to.throw(Error,/is not an array/);
    arry = [3];
    index = {};  
    expect(lib.arryDestroyEl.bind(lib,obj,index,arry)).to.throw(Error,/is not a non-negative number/);
    index = -1;  
    expect(lib.arryDestroyEl.bind(lib,obj,index,arry)).to.throw(Error,/is not a non-negative number/);
    index = 0;  
    expect(lib.arryDestroyEl(obj,index,arry)).to.be.true;
    a = {destroy: function () {} };
    b = Object.create(a);
    expect(lib.arryDestroyEl(b,index,arry)).to.be.true;

  });

  it('arryNullEl', function(){
    var arry,index;
    arry = {};
    expect(lib.arryNullEl.bind(lib,null,null,arry)).to.throw(Error,/is not an array/);
    arry = [3];
    index = {};  
    expect(lib.arryNullEl.bind(lib,null,index,arry)).to.throw(Error,/is not a non-negative number/);
    index = -1;  
    expect(lib.arryNullEl.bind(lib,null,index,arry)).to.throw(Error,/is not a non-negative number/);
    index = 0;  
    expect(lib.arryNullEl(null,index,arry)).to.be.true;
  });

  it('arryDestroyAll', function(){
    var arry = null;
    expect(lib.arryDestroyAll(arry)).to.be.undefined;
    arry = -1;
    expect(lib.arryDestroyAll.bind(lib,arry)).to.throw(Error,/is not an array/);
    arry = [];
    expect(lib.arryDestroyAll(arry)).to.be.true;
    arry = new Array(); 
    expect(lib.arryDestroyAll(arry)).to.be.true;
  });

  it('arryNullAll', function(){
    var arry = null;
    expect(lib.arryNullAll(arry)).to.be.undefined;
    arry = -1;
    expect(lib.arryNullAll.bind(lib,arry)).to.throw(Error,/is not an array/);
    arry = [];
    expect(lib.arryNullAll(arry)).to.be.true;
    arry = new Array(); 
    expect(lib.arryNullAll(arry)).to.be.true;
  });

  it('objNullAll', function(){
    var obj = null;
    expect(lib.objNullAll(obj)).to.be.undefined;
    obj = -1;
    expect(lib.objNullAll.bind(lib,obj)).to.throw(Error,/is not an object/);
    obj = [];
    expect(lib.objNullAll(obj)).to.be.true;
    obj = {};
    expect(lib.objNullAll(obj)).to.be.true;
    obj = new Object(); 
    expect(lib.objNullAll(obj)).to.be.true;
  });

  it('objDestroyAll', function(){
    var obj = null;
    expect(lib.objDestroyAll(obj)).to.be.undefined;
    obj = -1;
    expect(lib.objDestroyAll.bind(lib,obj)).to.throw(Error,/is not an object/);
    obj = {a : "b"};
    expect(lib.objDestroyAll.bind(lib,obj)).to.throw(Error,/is not an object/);
    obj.a = {};
    expect(lib.objDestroyAll.bind(lib,obj)).to.throw(Error,/does not have method destroy/);
    obj.a.destroy = false;
    expect(lib.objDestroyAll.bind(lib,obj)).to.throw(Error,/is not a function/);
    obj.a.destroy = function(){};
    obj.b = Object.create(obj.a);
    expect(lib.objDestroyAll(obj)).to.be.true;
  });

  it('containerDestroyAll', function(){
    var container = -1; 
    expect(lib.containerDestroyAll.bind(lib,container)).to.throw(Error,/is not an object/);
    container = {}; 
    expect(lib.containerDestroyAll.bind(lib,container)).to.throw(Error,/does not have method traverse/);
    container.traverse = 'smth';
    expect(lib.containerDestroyAll.bind(lib,container)).to.throw(Error,/not a function/);
    container.traverse = function(){};
    expect(lib.containerDestroyAll(container)).to.be.true;
    container2 = Object.create(container);
    expect(lib.containerDestroyAll(container2)).to.be.true;
  });

  it('containerDestroyDeep', function(){
    var container = -1; 
    expect(lib.containerDestroyDeep.bind(lib,container)).to.throw(Error,/is not an object/);
    container = {}; 
    expect(lib.containerDestroyDeep.bind(lib,container)).to.throw(Error,/does not have method traverse/);
    container.traverse = 'smth';
    expect(lib.containerDestroyDeep.bind(lib,container)).to.throw(Error,/not a function/);
    container.traverse = function(){};
    expect(lib.containerDestroyDeep.bind(lib,container)).to.throw(Error,/does not have method destroy/);
    container.destroy = true;
    expect(lib.containerDestroyDeep.bind(lib,container)).to.throw(Error,/not a function/);
    container.destroy = function(){};
    expect(lib.containerDestroyDeep(container)).to.be.true;
    container2 = Object.create(container);
    expect(lib.containerDestroyDeep(container2)).to.be.true;
  });
});
