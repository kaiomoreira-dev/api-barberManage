"use strict";

var _tsyringe = require("tsyringe");
var _DayjsDateProvider = require("./implementations/DayjsDateProvider");
_tsyringe.container.register("DayjsDateProvider", {
  useClass: _DayjsDateProvider.DayjsDateProvider
});