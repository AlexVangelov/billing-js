export function parallelExec(cbs :Array<Function>, callback ?:Function) {
  let cnt = cbs.length;
  let allResults = [];
  function exec(index) {
    return function () {
      cnt --;
      let results = [];
      for (let i in arguments) results.push(arguments[i]);
      allResults[index] = results;
      if (!cnt && callback) callback(allResults);
    }
  }
  if (!cbs.length && callback) return callback();
  for (let cb in cbs) {
    cbs[cb](exec(cb));
  }
}