"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _axios = _interopRequireDefault(require("axios"));
var _medusaInterfaces = require("medusa-interfaces");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TelegramNotificationService = /*#__PURE__*/function (_BaseService) {
  (0, _inherits2["default"])(TelegramNotificationService, _BaseService);
  var _super = _createSuper(TelegramNotificationService);
  function TelegramNotificationService(_container, config) {
    var _this;
    (0, _classCallCheck2["default"])(this, TelegramNotificationService);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "config_", {
      botToken: "",
      debug: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "telegramUrl", "https://api.telegram.org");
    _this.config_ = _objectSpread(_objectSpread({}, _this.config_), config);
    return _this;
  }
  (0, _createClass2["default"])(TelegramNotificationService, [{
    key: "getBotToken",
    value: function getBotToken() {
      return this.config_.botToken;
    }
  }, {
    key: "log",
    value: function log() {
      if (this.config_.debug) {
        var _console;
        (_console = console).log.apply(_console, arguments);
      }
    }
  }, {
    key: "error",
    value: function error() {
      if (this.config_.debug) {
        var _console2;
        (_console2 = console).error.apply(_console2, arguments);
      }
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(payload) {
      var _this2 = this;
      if (!Array.isArray(payload.chat_ids)) {
        payload.chat_ids = [payload.chat_ids];
      }
      var botToken = this.getBotToken();
      var _iterator = _createForOfIteratorHelper(payload.chat_ids),
        _step;
      try {
        var _loop = function _loop() {
          var chatId = _step.value;
          var url = "".concat(_this2.telegramUrl, "/bot").concat(botToken, "/sendMessage");
          var data = _objectSpread(_objectSpread({}, payload), {}, {
            chat_id: chatId
          });
          _axios["default"].post(url, data).then(function (res) {
            _this2.log("Send message to Telegram's chat ".concat(chatId, " successfully"), res.data);
          })["catch"](function (err) {
            _this2.error("Send message to Telegram's chat ".concat(chatId, " failed"), err);
          });
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return TelegramNotificationService;
}(_medusaInterfaces.BaseService);
var _default = TelegramNotificationService;
exports["default"] = _default;