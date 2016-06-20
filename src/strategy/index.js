
avalon.lexer = require('./lexer')
avalon.diff = require('./diff')
avalon.batch = require('./batch')
// dispatch与patch 为内置模块
var parseView = require('./parser/parseView')

function render(vtree, local) {
    var _body = Array.isArray(vtree) ? parseView(vtree) : vtree
    var _local = []
    if (local) {
        for (var i in local) {
            _local.push('var ' + i + ' = __local__['+avalon.quote(i)+']')
        }
    }
    
    var body = '__local__ = __local__ || {};\n' +
            'var __present__, __top__,__synth__;\n' +
            _local.join(';\n')+'\n' + _body
//    try{
    var fn = Function('__vmodel__', '__local__', body)
//}catch(e){
//    var a = document.createElement('xmp')
//    var t = document.createTextNode(_body)
//    a.appendChild(t)
//    document.body.appendChild(a)
//}

    return fn
}
avalon.render = render

module.exports = avalon
