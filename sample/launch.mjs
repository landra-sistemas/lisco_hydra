import { config } from "dotenv-defaults";

import { App } from "@landra_sistemas/lisco";
import { HydraServer, HydraClusterServer } from "../src/index.mjs";

import HomeController from "./controllers/HomeController.mjs";
import SecondController from "./controllers/SecondController.mjs";

const main = async () => {
    //Override server classes
    App.clusterClass = HydraClusterServer;
    App.serverClass = HydraServer;

    App.routes = [new HomeController(), new SecondController()];

    await App.init({
        socketio: false,
        traceRequests: true,
        hydra: {
            serviceName: "test",
            serviceDescription: "Basic express service on top of Hydra",
            serviceIP: "",
            servicePort: 0, //Random port for better scalability
            serviceType: "express",
            serviceVersion: "1.0.0",
            redis: {
                url: "redis://default:redispw@localhost:49153",
            },
        },
    });

    await App.start();

    console.log(`Started "${App.hydra.getServiceName()}" (v.${App.hydra.getInstanceVersion()})`);
};

config();
main();

//Capturar errores perdidos
process.on("uncaughtException", (err) => {
    // handle the error safely
    console.error(`Error: ${err || err.stack || err.message}`);
});
//Capturar promises perdidos
process.on("unhandledPromiseException", (err) => {
    // handle the error safely
    console.error(`Error: ${err || err.stack || err.message}`);
});
