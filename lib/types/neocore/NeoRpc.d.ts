import { Address } from './../crypto/address';
export declare class NeoRpc {
    static sendRawTransaction(url: string, data: string): Promise<any>;
    static makeRequest(method: string, ...params: any[]): {
        jsonrpc: string;
        method: string;
        params: any[];
        id: number;
    };
    static getBalance(url: string, contractAddr: Address, address: Address): Promise<any>;
}
