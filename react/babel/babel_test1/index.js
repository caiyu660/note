var babel = require('babel-core');

var s = babel.transform("(a)=>a*a", {
    presets:["env"]
});

//console.log(s.ast)

//babylon
const code = "function xx(a){return a+a}";

var babylon = require("babylon");

var str = babylon.parse(code);

console.log(str);