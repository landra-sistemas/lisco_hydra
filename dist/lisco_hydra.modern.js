import { Server, ClusterServer } from '@landra_sistemas/lisco';
import { HydraIntegrationPlugin } from 'hydra-integration';
import hydra from 'hydra';

class HydraServer extends Server {
  async initialize() {
    var _this$express_config, _this$express_config2;
    if (!((_this$express_config = this.express_config) != null && _this$express_config.hydra)) {
      throw new Error("HydraServer: config.hydra is required");
    }
    //Iniciar hydra en modo plugin
    hydra.use(new HydraIntegrationPlugin());
    await hydra.init({
      hydra: (_this$express_config2 = this.express_config) == null ? void 0 : _this$express_config2.hydra
    });
    console.log("configured hydra");
    await hydra.registerService();

    //Sobreescribir la app para que la configuracion del server se realice normalmente.
    this.app = await hydra.integration.getService();

    //Save for later use
    this.hydra = hydra;

    //Continuar con la inicializacion normalmente
    await super.initialize();
  }
}

class HydraClusterServer extends ClusterServer {
  constructor(app) {
    super(app);
  }
  async initUnclustered() {
    await this.server.initialize();
    //Ignorar el arranque del server y realizar solo la config. Se hace automáticamente en hydra.

    //Save for later use as App.hydra
    this.app.hydra = this.server.hydra;
  }
}

export { HydraClusterServer, HydraServer };
//# sourceMappingURL=lisco_hydra.modern.js.map
