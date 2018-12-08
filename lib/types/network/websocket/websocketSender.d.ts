/**
 * We can import html5-websocket directly, because webpack will use html5-websocket/browser.js
 * in browser environment, which does not require 'ws'.
 */
/**
 * Websocket sender for send messages and handle notify.
 */
export declare class WebsocketSender {
    private static generateReqId();
    debug: boolean;
    private wsp;
    constructor(url?: string, debug?: boolean);
    send<T extends object>(param: T, close?: boolean): Promise<any>;
    addListener(listener: (result: any) => void): void;
    close(): void;
}
