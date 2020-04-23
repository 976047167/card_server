import { Application, FrontendSession } from "pinus";

export default function(app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {

    }

    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    public async entry(msg: any, session: FrontendSession) {
        return { code: 200, msg: "game server is ok." };
    }

    /**
     * Publish route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    public async publish(msg: any, session: FrontendSession) {
        const result = {
            topic: "publish",
            payload: JSON.stringify({ code: 200, msg: "publish message is ok." }),
        };
        return result;
    }

    /**
     * Subscribe route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    public async subscribe(msg: any, session: FrontendSession) {
        const result = {
            topic: "subscribe",
            payload: JSON.stringify({ code: 200, msg: "subscribe message is ok." }),
        };
        return result;
    }

}
