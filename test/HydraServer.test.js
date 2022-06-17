import { expect } from "chai";
import { HydraServer } from "../src/index.mjs";

describe("HydraServer", async () => {
    it("#constructs()", () => {
        try {
            const server = new HydraServer();

            expect(server).not.to.be.null;
        } catch (e) {
            console.log(e);
        }
    });
    it("#initializes()", () => {
        const statics = {
            "/temp": "/temp",
        };
        const server = new HydraServer(statics, []);
        server.initialize();

        expect(server).not.to.be.null;
        expect(server.app).not.to.be.null;
        expect(server.app.statics).not.to.be.null;
        expect(server.statics).not.to.be.undefined;
    });
    it("#configures()", () => {
        const statics = {
            "/temp": "/temp",
        };
        const server = new HydraServer();
        server.config(statics);

        expect(server).not.to.be.null;
        expect(server.app).not.to.be.null;
        expect(server.app.statics).not.to.be.null;
        expect(server.statics).to.be.undefined;
    });

    it("#configureRoutes()", () => {
        var tester;
        const route = {
            configure: () => {
                tester = "OK";
            },
        };
        const statics = {
            "/temp": "/temp",
        };
        const routes = [route];
        const server = new HydraServer(statics, routes);
        server.configureRoutes(routes);

        expect(server).not.to.be.null;
        expect(server.app).not.to.be.null;
        expect(server.statics).not.to.be.null;
        expect(server.routes).not.to.be.null;
        expect(tester).not.to.be.null;
        expect(tester).to.eq("OK");
    });

    it("#emptyRoute.to.configureRoutes()", () => {
        var tester;
        const route = {
            configure: () => {
                tester = "OK";
                return () => {};
            },
        };
        const statics = {
            "/temp": "/temp",
        };
        const routes = [route, null];
        const server = new HydraServer(statics, routes);
        server.configureRoutes(routes);

        expect(server).not.to.be.null;
        expect(server.app).not.to.be.null;
        expect(server.statics).not.to.be.null;
        expect(server.routes).not.to.be.null;
        expect(tester).not.to.be.null;
        expect(tester).to.eq("OK");
    });

    // describe('#error()', () => {
    //     console.error('err');
    // })
});
