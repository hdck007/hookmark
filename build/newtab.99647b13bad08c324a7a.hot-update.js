"use strict";
self["webpackHotUpdatehookmark"]("newtab",{

/***/ "./src/pages/Newtab/components/gridview.jsx":
/*!**************************************************!*\
  !*** ./src/pages/Newtab/components/gridview.jsx ***!
  \**************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Content_modules_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Content/modules/constants */ "./src/pages/Content/modules/constants.js");
/* harmony import */ var _bookmarkcard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bookmarkcard */ "./src/pages/Newtab/components/bookmarkcard.jsx");
/* harmony import */ var _geist_ui_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @geist-ui/icons */ "./node_modules/@geist-ui/icons/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const GridView = ({
  uuid
}) => {
  const [hooks, setHooks] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);
  const [search, setSearch] = react__WEBPACK_IMPORTED_MODULE_0__.useState('');
  const [_, refetch] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const [searched, setSearched] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (uuid) {
      fetch(`${_Content_modules_constants__WEBPACK_IMPORTED_MODULE_1__["default"]}/hookmark/${uuid}`).then(res => res.json()).then(data => {
        const hookMap = data.map(hook => {
          return { ...hook,
            title: hook.title ? hook.title : hook.baseuri
          };
        });
        setHooks(hookMap);
      });
    }
  }, [_, uuid]);

  const handleCancel = () => {
    setSearch('');
    setSearched(false);
    refetch(prev => !prev);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (search) {
      const filtered = await fetch(`${_Content_modules_constants__WEBPACK_IMPORTED_MODULE_1__["default"]}/hookmark/${uuid}/search?query=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {
        const hookMap = data.map(hook => {
          return { ...hook,
            title: hook.title ? hook.title : hook.baseuri
          };
        });
        return hookMap;
      }).catch(err => {
        console.log(err);
        return [];
      });
      setHooks(filtered);
      setSearched(true);
    } else {
      if (searched) {
        setSearched(false);
        refetch(prev => !prev);
      }
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit,
    className: "border-b-2 w-full p-4 border-stone-700 text-stone-100 flex items-center "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    className: "w-full bg-stone-800 text-stone-100 p-2 px-4 rounded-full outline-none border-2 border-stone-900 focus:border-2 focus:border-purple-500",
    placeholder: "Search",
    value: search,
    onChange: e => setSearch(e.target.value)
  }), searched ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: handleCancel,
    className: "px-8 py-2 text-stone-100 bg-purple-500 rounded-full ml-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_geist_ui_icons__WEBPACK_IMPORTED_MODULE_3__.X, null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit",
    className: "px-8 py-2 text-stone-100 bg-purple-500 rounded-full ml-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_geist_ui_icons__WEBPACK_IMPORTED_MODULE_3__.Search, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-wrap justify-around m-auto gap-4 p-4"
  }, hooks?.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "w-full text-center text-stone-300"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "text-2xl"
  }, "Search didn't yield any result")), hooks?.length && hooks.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_bookmarkcard__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
    key: item.id
  }, item))), new Array(3 - hooks.length % 3).fill(0).map((_, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "w-[350px] sm:w-[48%] md:w-[31%]"
  }))));
};

__signature__(GridView, "useState{[hooks, setHooks]([])}\nuseState{[search, setSearch]('')}\nuseState{[_, refetch](false)}\nuseState{[searched, setSearched](false)}\nuseEffect{}");

const _default = GridView;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GridView, "GridView", "C:\\Projects\\extensions\\chrome-extension-boilerplate-react-master\\hookmark\\src\\pages\\Newtab\\components\\gridview.jsx");
  reactHotLoader.register(_default, "default", "C:\\Projects\\extensions\\chrome-extension-boilerplate-react-master\\hookmark\\src\\pages\\Newtab\\components\\gridview.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("35ea34330f2682f1ee60")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=newtab.99647b13bad08c324a7a.hot-update.js.map