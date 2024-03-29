function createLib(isFunction,isArray,isNumber,isString){
  'use strict';

  //helper function
  function canCallMethod(el,methodName){
    if (!isString(methodName)){
      throw new Error(methodName + ' is not a string.');
    }
    if ((el === null || typeof el !== 'object') && !isFunction(el)){
      //console.error(el);
      throw new Error('First parameter is not an object.');
    }
    if (!isFunction(el[methodName])){
      console.error(el);
      throw new Error('Passed object does not have method ' + methodName + ' or property ' + methodName + ' of passed object is not a function.');
    }
    return true;
  }

  function arryDestroyEl (exception, el, index, arr) {
    if (canCallMethod(el,'destroy')){
      destroyer(el, exception);
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

  function arryDestroyAll (arr, exception) {
    if (!arr) return;

    if (!isArray(arr)){
      throw new Error(arr + ' is not an array.');
    }

    arr.forEach(arryDestroyEl.bind(null, exception));
    exception = null;
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
    var i;
    if (!obj) return;
    if (obj === null || 'object' !== typeof obj){
      throw new Error('First parameter is not an object.');
    }
    for (i in obj) obj[i] = null;
    return true;
  }

  function objDestroyAll (obj, exception) {
    var i;
    if (!obj) return;
    if (obj === null || 'object' !== typeof obj){
      throw new Error('First parameter is not an object.');
    }
    for (i in obj) {
      if (canCallMethod(obj[i],'destroy')){
        destroyer(obj[i], exception);
      }
      obj[i] = null;
    }
    return true;
  }

  function destructor(exception, item, itemname){
    if (canCallMethod(item,'destroy')){
      destroyer(item, exception);
    }
  }

  function containerDestroyAll (container, exception) {
    if (canCallMethod(container,'traverseSafe')){
      container.traverseSafe(destructor.bind(null, exception), 'Error in destruction');
    }
    exception = null;
    return true;
  }

  function containerDestroyDeep (container, exception) {
    containerDestroyAll(container);
    if (canCallMethod(container,'destroy')){
      destroyer(container, exception);
    }
    return true;
  }

  function destroyer (el, exception) {    
    if (typeof exception == 'undefined') {
      el.destroy();
      return;
    }
    el.destroy(exception);
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
