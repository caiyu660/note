(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["About"],{

/***/ "./node_modules/babel-loader/lib/index.js!./src/About.jsx":
/*!*******************************************************!*\
  !*** ./node_modules/babel-loader/lib!./src/About.jsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar About = function (_Component) {\n    _inherits(About, _Component);\n\n    function About() {\n        _classCallCheck(this, About);\n\n        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));\n    }\n\n    _createClass(About, [{\n        key: 'componentWillMount',\n        value: function componentWillMount() {\n            console.log(this.props);\n        }\n    }, {\n        key: 'handleClick',\n        value: function handleClick() {\n            this.props.history.push('/topics');\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                { onClick: this.handleClick.bind(this) },\n                'about'\n            );\n        }\n    }]);\n\n    return About;\n}(_react.Component);\n\nexports.default = About;\n\n//# sourceURL=webpack:///./src/About.jsx?./node_modules/babel-loader/lib");

/***/ })

}]);