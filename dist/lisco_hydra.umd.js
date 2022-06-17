(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@landra_sistemas/lisco'), require('hydra-integration'), require('hydra')) :
  typeof define === 'function' && define.amd ? define(['exports', '@landra_sistemas/lisco', 'hydra-integration', 'hydra'], factory) :
  (global = global || self, factory(global.liscoHydra = {}, global.lisco, global.hydraIntegration, global.hydra));
})(this, (function (exports, lisco, hydraIntegration, hydra) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var hydra__default = /*#__PURE__*/_interopDefaultLegacy(hydra);

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  var HydraServer = /*#__PURE__*/function (_Server) {
    _inheritsLoose(HydraServer, _Server);

    function HydraServer() {
      return _Server.apply(this, arguments) || this;
    }

    var _proto = HydraServer.prototype;

    _proto.initialize = function initialize() {
      try {
        var _this2$express_config, _this2$express_config2;

        var _this2 = this;

        if (!((_this2$express_config = _this2.express_config) != null && _this2$express_config.hydra)) {
          throw new Error("HydraServer: config.hydra is required");
        } //Iniciar hydra en modo plugin


        hydra__default["default"].use(new hydraIntegration.HydraIntegrationPlugin());
        return Promise.resolve(hydra__default["default"].init({
          hydra: (_this2$express_config2 = _this2.express_config) == null ? void 0 : _this2$express_config2.hydra
        })).then(function () {
          console.log("configured hydra");
          return Promise.resolve(hydra__default["default"].registerService()).then(function () {
            //Sobreescribir la app para que la configuracion del server se realice normalmente.
            return Promise.resolve(hydra__default["default"].integration.getService()).then(function (_hydra$integration$ge) {
              _this2.app = _hydra$integration$ge;
              //Save for later use
              _this2.hydra = hydra__default["default"]; //Continuar con la inicializacion normalmente

              return Promise.resolve(_Server.prototype.initialize.call(_this2)).then(function () {});
            });
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return HydraServer;
  }(lisco.Server);

  var HydraClusterServer = /*#__PURE__*/function (_ClusterServer) {
    _inheritsLoose(HydraClusterServer, _ClusterServer);

    function HydraClusterServer(app) {
      return _ClusterServer.call(this, app) || this;
    }

    var _proto = HydraClusterServer.prototype;

    _proto.initUnclustered = function initUnclustered() {
      try {
        var _this2 = this;

        return Promise.resolve(_this2.server.initialize()).then(function () {
          //Ignorar el arranque del server y realizar solo la config. Se hace automáticamente en hydra.
          //Save for later use as App.hydra
          _this2.app.hydra = _this2.server.hydra;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return HydraClusterServer;
  }(lisco.ClusterServer);

  exports.HydraClusterServer = HydraClusterServer;
  exports.HydraServer = HydraServer;

}));
//# sourceMappingURL=lisco_hydra.umd.js.map
