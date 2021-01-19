"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 3000;

_app["default"].listen(port, function (err) {
  if (err) {
    console.log("error");
  } else {
    console.log("app is listening at" + port);
  }
});