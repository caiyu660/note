import VisitorManager from './VisitorManager'
import traverse from "babel-traverse"
import generate from "babel-generator"
import * as babylon from "babylon"

const rimraf = require('rimraf');
const fs = require('fs'),
    path = require('path');

function writeOutput(name, output) {
    rimraf('./dist', function () {
        fs.mkdirSync('./dist');
        fs.mkdirSync('./dist/pages');
        Object.entries(output).forEach(function ([fileSuffix, data]) {
            if (data && /json|js|wxml|wxss/.test(fileSuffix)) {
                const filePath = path.join('dist', 'pages', `${name}.${fileSuffix}`)
                fs.writeFileSync(filePath, data)
            }
        })
    });
}

fs.readFile('./src/pages/Home.jsx', 'utf8', (err, code) => {
    if (err) throw err;
    // 将代码解析为抽象语法树
    const ast = babylon.parse(code, {
        sourceType: "module",
        plugins: [
            "classProperties",
            "jsx"
        ]
    });
    const visitorManager = new VisitorManager();
    // 遍历抽象语法树 
    traverse(ast, visitorManager.visitor);
    visitorManager.outData.js = generate(ast).code;
    visitorManager.outData.json = visitorManager.configInfo.config;

    writeOutput(visitorManager.filename.toLowerCase(), visitorManager.outData);
    console.log(visitorManager.outData.wxml);
    console.log(visitorManager.configInfo);
});