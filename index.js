function createLib(has,isFunction,isArray,isNumber,isString){
  'use strict';

  //helper function
  function canCallMethod(el,methodName){
    if (!isString(methodName)){
      throw new Error(methodName + ' is not a string.');
    }
    if (!has(el,methodName)){
      throw new Error(el + ' is not an object or does not have method ' + methodName + '.');
    }
    if (!isFunction(el[methodName])){
      throw new Error('Property destroy of ' + el + ' is not a function.');
    }
    return true;
  }

  function arryDestroyEl (el, index, arr) {
    if (canCallMethod(el,'destroy')){
      el.destroy();
    }
    if (!isArray(arr)){
      throw new Error(arr + ' is not an array.');
    }
    if (!isNumber(index)){
      throw new Error(index + ' is not a non-negative number.');
    }
    if (index < 0){
      throw new Error(index + ' is not a non-negative number.');
    }
    arr[index] = null;
    return true;
  }

  function arryNullEl (el, index, arr) {
    if (!arr) return;

    if (!isArray(arr)){
      throw new Error(arr + ' is not an array.');
    }
    if (!isNumber(index)){
      throw new Error(index + ' is not a non-negative number.');
    }
    if (index < 0){
      throw new Error(index + ' is not a non-negative number.');
    }

    arr[index] = null;
    return true;
  }

  function arryDestroyAll (arr) {
    if (!arr) return;

    if (!isArray(arr)){
      throw new Error(arr + ' is not an array.');
    }

    arr.forEach(arryDestroyEl);
    return true;
  }

  function arryNullAll (arr) {
    if (!arr) return;

    if (!isArray(arr)){
      throw new Error(arr + ' is not an array.');
    }

    arr.forEach(arryNullEl);
    return true;
  }

  function objNullAll (obj) {
    if (!obj) return;
    if (obj === null || 'object' !== typeof obj){
      throw new Error(obj + ' is not an object.');
    }
    for (var i in obj) obj[i] = null;
    return true;
  }

  function objDestroyAll (obj) {
    if (!obj) return;
    if (obj === null || 'object' !== typeof obj){
      throw new Error(obj + ' is not an object.');
    }
    for (var i in obj) {
      if (canCallMethod(obj[i],'destroy')){
        obj[i].destroy();
      }
      obj[i] = null;
    }
    return true;
  }

  function destructor(item){
    if (canCallMethod(item,'destroy')){
      item.destroy();
    }
  }

  function containerDestroyAll (container) {
    if (canCallMethod(container,'traverse')){
      container.traverse(destructor);
    }
    return true;
  }

  function containerDestroyDeep (container) {
    containerDestroyAll(container);
    if (canCallMethod(container,'destroy')){
      container.destroy();
    }
    return true;
  }

  return {
    arryDestroyEl: arryDestroyEl,
    arryNullEl: arryNullEl,
    arryDestroyAll : arryDestroyAll,
    arryNullAll: arryNullAll,
    objNullAll : objNullAll,
    objDestroyAll: objDestroyAll,
    containerDestroyAll: containerDestroyAll,
    containerDestroyDeep: containerDestroyDeep
  };

};

module.exports = createLib;
