import { Server } from "@landra_sistemas/lisco";
import { HydraIntegrationPlugin } from "hydra-integration";
import hydra from "hydra";

export default class HydraServer extends Server {
    async initialize() {
        if (!this.express_config?.hydra) {
            throw new Error("HydraServer: config.hydra is required");
        }
        //Iniciar hydra en modo plugin
        hydra.use(new HydraIntegrationPlugin());
        await hydra.init({
            hydra: this.express_config?.hydra,
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
