const debug = require('debug')
const path = require('path')
const prepare = function (err, stack) { return stack }
function _getCallerFile() {
  const originalFunc = Error.prepareStackTrace
  let callerfile;
  try {
    const err = new Error();
    let currentfile;
    Error.prepareStackTrace = prepare
    currentfile = err.stack.shift().getFileName()
    while (err.stack.length && currentfile !== callerfile) {
      callerfile = err.stack.shift().getFileName()
    }
  } catch (e) {}
  Error.prepareStackTrace = originalFunc
  return callerfile
}
const cache={}
const doDebug = function(value){
  if(!process.env.DEBUG){
    return
  }
  const fileName = _getCallerFile() || ""
  if(!cache[fileName]){
    const resolver = fileName.slice(path.join(__dirname,'/../..').length+1,fileName.length)
    cache[fileName] = debug(resolver)
  }
  return cache[fileName](value)
}


module.exports=doDebug