import { BaseController, Utils } from "@landra_sistemas/lisco";
import hydra from "hydra";

export default class SecondController extends BaseController {
    configure() {
        const exAsync = Utils.expressHandler();
        this.router.get(
            "/foo",
            exAsync((...args) => this.foo(...args))
        );

        return this.router;
    }

    async foo(req, res) {
        let message = hydra.createUMFMessage({
            to: "hydra-router:/",
            from: "test:/",
            body: {
                asdf: "asdfasdf",
            },
        });
        await hydra.sendMessage(message);
        res.send("Hello Foo!");
    }
}
