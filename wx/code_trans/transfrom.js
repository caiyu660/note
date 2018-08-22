const fs = require('fs');
const traverse = require("babel-traverse").default;
const generate = require("babel-generator").default;
//const Visitor = require("./visitor").default;
const code = `
class HomePage extends Component{
    config = {
        navigationBarTitleText: '问题'
    }
    constructor(){}
    componentWillMount(){}
    componentDidMount(){}
    render(){
        return (
            <view>
                <text>this is mini grama</text>
            </view>
        )
    }
}`;

const ast = require("@babel/parser").parse(code, {
    sourceType: "module",
    plugins: [
      "classProperties",
      "jsx"
    ]
  });
 
  let nodeType;


  //traverse(ast, new Visitor().visitor);

  traverse(ast, {
    enter(path) {
        nodeType = path.node;
      switch(path.node.type){
          case 'Identifier': 
            if (path.node.name === "HomePage"){
                path.node.name = "HomePage1";
            };
            break;
          case 'ClassProperty':
            const v = generate(path.node.value, {
                concise: true,
                comments: false,
                jsonCompatibleStrings: true,
            })
            .code.replace(/'/g, '"')
            .replace(/([A-Za-z0-9_$]*):/g, '"$1":');
            console.log(v);
            break;
        }
    }
  });

  const result = generate(ast, {});
  
  console.log('code--->', ast);