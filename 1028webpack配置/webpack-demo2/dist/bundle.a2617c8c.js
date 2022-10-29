/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/Person.js":
/*!**********************!*\
  !*** ./js/Person.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nclass Person {\n  constructor(userName) {\n    this.userName = userName;\n  }\n  sayHello() {\n    setTimeout(() => {\n      console.log(`大家好，我叫${this.userName}`);\n    }, 1000);\n  }\n}\n\n//现在用的是ESModule，不是CommonJS模块 \n/* harmony default export */ __webpack_exports__[\"default\"] = (Person);\n\n//# sourceURL=webpack://webpack-demo2/./js/Person.js?");

/***/ }),

/***/ "./js/Student.js":
/*!***********************!*\
  !*** ./js/Student.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Person_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Person.js */ \"./js/Person.js\");\n\nclass Student extends _Person_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(userName, sex) {\n    super(userName);\n    this.sex = sex;\n  }\n  study() {\n    console.log(`${this.sex}学生在学习`);\n  }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (Student);\n\n//# sourceURL=webpack://webpack-demo2/./js/Student.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ \"./css/index.css\");\n/* harmony import */ var _Student_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Student.js */ \"./js/Student.js\");\n\n//这个文件必须要经过处理以后才可以使用\n\n\nlet s = new _Student_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"张珊\", \"女\");\ns.sayHello();\ns.study();\n\n//# sourceURL=webpack://webpack-demo2/./js/index.js?");

/***/ }),

/***/ "./css/index.css":
/*!***********************!*\
  !*** ./css/index.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-demo2/./css/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/index.js");
/******/ 	
/******/ })()
;