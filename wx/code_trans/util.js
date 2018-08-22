import * as t from "babel-types";

/**
 * 是否包含jsx元素
 * @param {*} path 
 */
export function isContainJSXElement (path) {
    let matched = false
    path.traverse({
      JSXElement (p) {
        matched = true
        p.stop()
      }
    })
    return matched
}
/**
 * 是否为复杂表达式
 * @param {*} path 
 */
export function hasComplexExpression (path) {
    let matched = false
    if (isContainJSXElement(path)) {
      return false
    }
    if (path.isTemplateLiteral() || path.isCallExpression()) {
      return true
    }
    path.traverse({
      CallExpression: (p) => {
        matched = true
        p.stop()
      },
      TemplateLiteral (p) {
        matched = true
        p.stop()
      },
      TaggedTemplateExpression (p) {
        matched = true
        p.stop()
      },
      MemberExpression (path) {
        const jsxElement = path.findParent(p => p.isJSXExpressionContainer())
        const object = path.get('object')
        const property = path.get('property')
        const parentPath = path.parentPath
        if (
          jsxElement &&
          object.isThisExpression() &&
          property.isIdentifier({ name: 'state' }) &&
          parentPath.isMemberExpression() &&
          parentPath.parentPath.isMemberExpression()
        ) {
          const sourceCode = parentPath.parentPath.getSource()
          if (sourceCode.includes('[') && sourceCode.includes(']')) {
            matched = true
            path.stop()
          }
        }
      }
    })
    return matched
  }

  /**
   * 构建<block></block> 标签
   */
  export function buildBlockElement () {
    return t.jSXElement(
      t.jSXOpeningElement(t.jSXIdentifier('block'), []),
      t.jSXClosingElement(t.jSXIdentifier('block')),
      []
    )
  }

  export function generateAnonymousState (
    scope,
    expression,
    refIds,
    isLogical
  ) {
    let variableName = `anonymousState_${scope.generateUid()}`
    let statementParent = expression.getStatementParent()
    if (!statementParent) {
      throw codeFrameError(expression.node.loc, '无法生成匿名 State，尝试先把值赋到一个变量上再把变量调换。')
    }
    const jsx = isLogical ? expression : expression.findParent(p => p.isJSXElement())
    const callExpr = jsx.findParent(p => p.isCallExpression() && isArrayMapCallExpression(p))
    const conditionExpr = jsx.findParent(p => p.isConditionalExpression())
    const logicExpr = jsx.findParent(p => p.isLogicalExpression({ operator: '&&' }))
    let expr = cloneDeep(expression.node)
    if (conditionExpr && conditionExpr.isConditionalExpression()) {
      const consequent = conditionExpr.get('consequent')
      if (consequent === jsx || jsx.findParent(p => p === consequent)) {
        expr = t.conditionalExpression(conditionExpr.get('test').node, expr, t.nullLiteral())
      }
    }
    if (logicExpr && logicExpr.isLogicalExpression({ operator: '&&' })) {
      const consequent = logicExpr.get('right')
      if (consequent === jsx || jsx.findParent(p => p === consequent)) {
        expr = t.conditionalExpression(logicExpr.get('left').node, expr, t.nullLiteral())
      }
    }
    if (!callExpr) {
      refIds.add(t.identifier(variableName))
      statementParent.insertBefore(
        buildConstVariableDeclaration(variableName, expr)
      )
    } else {
      variableName = `${LOOP_STATE}_${callExpr.scope.generateUid()}`
      const func = callExpr.node.arguments[0]
      if (t.isArrowFunctionExpression(func)) {
        if (!t.isBlockStatement(func.body)) {
          func.body = t.blockStatement([
            buildConstVariableDeclaration(variableName, expr),
            t.returnStatement(func.body)
          ])
        } else {
          statementParent.insertBefore(
            buildConstVariableDeclaration(variableName, expr)
          )
        }
      }
    }
    expression.replaceWith(
      t.identifier(variableName)
    )
  }
  /**
   * 构建wx:if 语句
   * @param {} jsx 
   * @param {*} value 
   * @param {*} path 
   */
  export function newJSXIfAttr (jsx, value, path) {
    const element = jsx.openingElement
    if (!t.isJSXIdentifier(element.name)) {
      return
    }
    if (element.name.name === 'Block' || element.name.name === 'block' || !path) {
      element.attributes.push(buildJSXAttr('wx:if', value))
    } else {
      const block = buildBlockElement()
      newJSXIfAttr(block, value)
      block.children.push(jsx)
      path.node = block
    }
  }
  /**
   * 构建jsx属性
   * @param {*} name 
   * @param {*} value 
   */
  export function buildJSXAttr (name, value) {
    return t.jSXAttribute(t.jSXIdentifier(name), t.jSXExpressionContainer(value))
  }

  export function setJSXAttr (
    jsx,
    name,
    value,
    path
  ) {
    const element = jsx.openingElement
    if (!t.isJSXIdentifier(element.name)) {
      return
    }
    if (element.name.name === 'Block' || element.name.name === 'block' || !path) {
      jsx.openingElement.attributes.push(
        t.jSXAttribute(t.jSXIdentifier(name), value)
      )
    } else {
      const block = buildBlockElement()
      setJSXAttr(block, name, value)
      block.children = [jsx]
      path.node = block
    }
  }
  /**
   * 是否为array的map函数调用
   * @param {*} callExpression 
   */
  export function isArrayMapCallExpression (callExpression) {
    return callExpression &&
      t.isCallExpression(callExpression) &&
      t.isMemberExpression(callExpression.callee) &&
      t.isIdentifier(callExpression.callee.property, { name: 'map' })
  }