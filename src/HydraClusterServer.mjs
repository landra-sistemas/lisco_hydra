import { ClusterServer } from "@landra_sistemas/lisco";

export default class HydraClusterServer extends ClusterServer {
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
