'use strict';
function arryDestroyEl (el, index, arr) {
  if (el) el.destroy();
  arr[index] = null;
}

function arryNullEl (el, index, arr) {
  if (!arr) return;
  arr[index] = null;
}

function arryDestroyAll (arr) {
  if (!arr) return;
  arr.forEach(arryDestroyEl);
}

function arryNullAll (arr) {
  if (!arr) return;
  arr.forEach(arryNullEl);
}

function objNullAll (obj) {
  if (!obj) return;
  for (var i in obj) obj[i] = null;
}

function objDestroyAll (obj) {
  if (!obj) return;
  for (var i in obj) {
    if (obj[i]) obj[i].destroy();
    obj[i] = null;
  }
}

function destructor(item){
  if (item.destroy) {
    item.destroy();
  }
}

function containerDestroyAll (container) {
  container.traverse(destructor);
}

function containerDestroyDeep (container) {
  containerDestroyAll(container);
  container.destroy();
}

module.exports = {
  arryDestroyEl: arryDestroyEl,
  arryNullEl: arryNullEl,
  arryDestroyAll : arryDestroyAll,
  arryNullAll: arryNullAll,
  objNullAll : objNullAll,
  objDestroyAll: objDestroyAll,
  containerDestroyAll: containerDestroyAll,
  containerDestroyDeep: containerDestroyDeep
};
