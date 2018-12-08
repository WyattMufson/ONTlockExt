/**
 * We can import html5-websocket directly, because webpack will use html5-websocket/browser.js
 * in browser environment, which does not require 'ws'.
 */
/**
 * @deprecated Use WebsocketClient instead.
 */
export default class TxSender {
    SOCKET_URL: string;
    constructor(socketUrl?: string);
    sendTxWithSocket(param: string, callback: (err: any, res: any, socket: any) => any): void;
}
