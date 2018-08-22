import generate from "babel-generator";
import * as t from "babel-types";
import prettifyXml from 'prettify-xml';
import {
    hasComplexExpression,
    generateAnonymousState,
    buildBlockElement,
    newJSXIfAttr,
    setJSXAttr,
    isArrayMapCallExpression
} from './util'

/**
 * 页面生命周期映射表
 */
const PageLifeCycleMap = {
    componentDidMount: 'onLaunch',
    componentWillMount: 'onLoad',
    componentWillUnmount: 'onUnload',
    componentDidShow: 'onShow',
    componentDidHide: 'onHide'
}

const eventMap = {
    "click": 'tap'
}


function handleJSXElement(
    jsxElementPath,
    func
) {
    const parentNode = jsxElementPath.parent
    const parentPath = jsxElementPath.parentPath
    const isJSXChildren = t.isJSXElement(parentNode)
    if (!isJSXChildren) {
        let statementParent = jsxElementPath.getStatementParent()
        const isReturnStatement = statementParent.isReturnStatement()
        const isFinalReturn = statementParent.getFunctionParent().isClassMethod()
        if (!(
                statementParent.isVariableDeclaration() ||
                statementParent.isExpressionStatement()
            )) {
            statementParent = statementParent.findParent(
                s => s.isVariableDeclaration() || s.isExpressionStatement()
            )
        }
        func({
            parentNode,
            parentPath,
            statementParent,
            isReturnStatement,
            isFinalReturn
        })
    }
}

export default class {
    constructor() {
        const that = this;
        this.classType = null;
        this.methodMap = Object.create(null);
        // 存储文件名及文件内容 
        this.outData = Object.create(null);
        // 存储文件的配置信息 例如app, page, component
        this.configInfo = Object.create(null);
        this.methodsList = [];
        this.filename = '';
        this.visitor = {
            // 变量标识处理
            Identifier(path) {
                console.log('Identifier----->');
            },
            // 类处理
            ClassDeclaration(path) {
                console.log('getClsName---->', path);
                that.filename = path.node.id.name;
            },
            // 类属性处理 配置信息
            ClassProperty(path) {
                console.log('that--->', that);
                const v = generate(path.node.value, {
                        concise: true,
                        comments: false,
                        jsonCompatibleStrings: true,
                    })
                    .code.replace(/'/g, '"')
                    .replace(/([A-Za-z0-9_$]*):/g, '"$1":');
                that.configInfo[path.node.key.name] = v;
            },
            // 类方法  
            ClassMethod: {
                enter(path) {
                    const methodName = path.node.key.name
                    if (methodName === 'render') {
                        return
                    } else if (methodName === 'constructor') {
                        const nodes = path.node.body.body;
                        nodes.forEach(node => {
                           // 处理data初始化 
                           if (node.expression.type === 'AssignmentExpression'
                               && node.expression.left.object.type === 'ThisExpression'
                               && node.expression.left.property.name === 'state'){
                                 that.methodsList.push(t.objectProperty(t.identifier('data'), node.expression.right))
                               }
                        })
                        console.log('contructor path---->', path);
                    } else {
                        const fn = t.objectProperty(
                            t.identifier(PageLifeCycleMap[methodName] ? PageLifeCycleMap[methodName] : methodName),
                            t.functionExpression(null, path.node.params, path.node.body, path.node.generator, path.node.async)
                        )
                        that.methodsList.push(fn);
                    }
                },
                exit(path) {
                    const methodName = path.node.key.name
                    if (methodName === 'render') {
                        const result = path.node.body.body.find(
                            x => x.type === 'ReturnStatement'
                        )
                        if (!result) return
                        if (result.argument.type === 'JSXElement') {
                            //输出wxml
                            that.outData.wxml = prettifyXml(
                                generate(result.argument, {
                                    concise: true
                                }).code, {
                                    indent: 2
                                }
                            )
                           // console.log('wxml----->', that.outData.wxml);
                        }
                    }
                }
            },
            CallExpression(path) {
                if (
                    t.isMemberExpression(path.node.callee) &&
                    path.node.callee.property.name === 'setState'
                ) {
                    path.node.callee.property.name = 'setData'
                }
            },
            // 方法处理
            FunctionDeclaration() {

            },
            ExportDefaultDeclaration: {
                exit(path) {
                    const {
                        node: {
                            declaration
                        }
                    } = path
                    const {
                        superClass
                    } = declaration
                    console.log('log superClass----->');
                    if (superClass && /App|Page|Component/.test(superClass.name)) {
                        path.replaceWith(
                            t.CallExpression(t.identifier(superClass.name), [
                                t.objectExpression(that.methodsList),
                            ])
                        )
                    }
                }
            },
            JSXElement: {
                enter(path) {
                    handleJSXElement(path, ({
                        parentNode,
                        parentPath,
                        statementParent
                    }) => {
                        console.log(`t.isConditionalExpression(parentNode)--->`, t.isConditionalExpression(parentNode));
                        if (t.isConditionalExpression(parentNode)) {
                            const {
                                consequent,
                                alternate
                            } = parentNode
                            const testExpression = parentPath.get('test');
                            const block = buildBlockElement()
                            if (hasComplexExpression(testExpression)) {
                                generateAnonymousState(parentPath.scope, testExpression, this.referencedIdentifiers, true)
                            }
                            const test = testExpression.node
                            if (t.isJSXElement(consequent) && t.isLiteral(alternate)) {
                                const {
                                    value,
                                    confident
                                } = parentPath.get('alternate').evaluate()
                                if (confident && !value) {
                                    newJSXIfAttr(block, test)
                                    block.children = [jsxElementPath.node]
                                    // newJSXIfAttr(jsxElementPath.node, test)
                                    parentPath.replaceWith(block)
                                    if (statementParent) {
                                        const name = findIdentifierFromStatement(
                                            statementParent.node
                                        )
                                        let templates = []
                                        setTemplate(name, jsxElementPath, this.templates);
                                        // name && templates.set(name, path.node)
                                        console.log('templates--->', templates);
                                    }
                                }
                            }
                        }
                    });
                }
            },
            JSXOpeningElement(path) {
                console.log('JSXOpeningElement------------->');
            },
            JSXExpressionContainer(path) {
                console.log('JSXExpressionContainer------------->');
                const expression = path.node.expression;
                const expType = expression.type;
                switch (expType) {
                    case 'ConditionalExpression':
                        console.log('条件表达式');
                        const testType = expression.test.type;
                        const {
                            consequent,
                            alternate
                        } = expression;
                        const block = buildBlockElement()
                        let test = expression.test;
                        switch (testType) {
                            // 二元表达式
                            case 'BinaryExpression':
                                const left = expression.test.left,
                                    right = expression.test.right;
                                if (left.object && left.object.object &&
                                    left.object.object.type === 'ThisExpression' &&
                                    left.object.property && left.object.property.name === 'state') {
                                    test = t.identifier(
                                        `${generate(expression.test).code.replace('this.state.', '')}`
                                    );
                                }
                                break;
                            default: break;
                        }
                        /**
                         * 结果和替代值均为 jsx元素
                         */
                        if (t.isJSXElement(consequent) && t.isJSXElement(alternate)) {
                            const block2 = buildBlockElement()
                            block.children = [consequent];
                            newJSXIfAttr(block, test)
                            setJSXAttr(block2, 'wx:else');
                            block2.children = [alternate];
                            const parentBlock = buildBlockElement();
                            parentBlock.children = [block, block2];
                            path.replaceWith(parentBlock);
                        }
                        break;
                    case 'MemberExpression':
                        console.log('变量表达式');
                        if (expression.object.type === 'MemberExpression' &&
                            expression.object.object.type === 'ThisExpression' &&
                            expression.object.property.name === 'state') {
                            path.node.expression = t.identifier(
                                `{${generate(path.node.expression).code.replace('this.state.', '')}}`
                            );
                        } else {
                            // todo  复杂数据结构嵌套结构处理
                            path.node.expression = t.identifier(
                                `{${generate(path.node.expression).code}}`
                            );
                        }
                        break;
                    case 'Identifier':
                        console.log('变量标识');
                        path.node.expression = t.identifier(
                            `{${generate(path.node.expression).code}}`
                        );
                        break;
                    case 'CallExpression':
                        const isArrayMapCall = isArrayMapCallExpression(expression); 
                        const ary = expression.callee;
                        if (isArrayMapCall) {
                            const [func] = expression.arguments
                            const jsxEl = func.body.body[0].argument;
                            const propertyName = ary.object.property.name;
                            setJSXAttr(jsxEl, 'wx:for', t.stringLiteral(propertyName));
                            // 函数或者箭头函数
                            if (t.isFunctionExpression(func) || t.isArrowFunctionExpression(func)){
                                const [item, index] = func.params
                                if (t.isIdentifier(item)) {
                                    setJSXAttr(
                                        jsxEl,
                                        'wx:for-item',
                                        t.stringLiteral(item.name)
                                    )
                                } 
                                if (t.isIdentifier(index)) {
                                    setJSXAttr(
                                        jsxEl,
                                      'wx:for-index',
                                      t.stringLiteral(index.name)
                                    )
                                  }
                            }
                            path.replaceWith(jsxEl);
                        }
                    }
            },
            JSXAttribute(path) {
                console.log('visitJsx------------->');
                const {
                    name,
                    value
                } = path.node
                path.node.name.name = 
                    /^on(\w*)$/.test(name.name) ?
                    name.name.replace(/^on(\w*)$/, 'bind$1').toLowerCase().replace('click', eventMap['click']) :
                    /^(key)$/.test(name.name) ? name.name.replace(/^(key)$/, 'wx:$1') : name.name
                if (value && !value.expression) return
                if (!value) {
                    if (/else/.test(name.name)) return
                    path.node.value = t.stringLiteral('{{true}}')
                } else if (t.isTemplateLiteral(value.expression)) {
                    path.node.value = t.stringLiteral(
                        zip(
                            value.expression.quasis.map(x => x.value.raw),
                            value.expression.expressions.map(x => x.name)
                        ).reduce((v, [raw, name]) => {
                            return !raw && !name ? v : name ? v + `${raw}{{${name}}}` : v + raw
                        }, '')
                    )
                } else if (t.isObjectExpression(value.expression)) {
                    const newValue = generate(value.expression, {
                        concise: true
                    }).code
                    path.node.value = t.stringLiteral(`{${newValue}}`)
                } else if (/^bind/.test(path.node.name.name)) {
                    const newValue = generate(value.expression).code
                    path.node.value = t.stringLiteral(newValue.replace('this.', ''))
                } else {
                    let newValue = generate(value.expression).code;
                    if (value.expression.object) {
                        const expNew = value.expression.object;
                        if (expNew.object && expNew.object.type === 'ThisExpression' && expNew.property && expNew.property.name === 'state') {
                            newValue = newValue.replace('this.state.', '');
                        }
                    }
                    path.node.value = t.stringLiteral(`{{${newValue}}}`)
                }
            }
        }
    }
    /**
     * 存储
     */
    setConfigData = () => {

    }
    getNodeValue = (path) => {
        return generate(path.node.value, {
            concise: true,
            comments: false,
            jsonCompatibleStrings: true
        });
    }
}