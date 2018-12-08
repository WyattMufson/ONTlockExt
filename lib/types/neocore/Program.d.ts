import { PublicKey } from '../crypto/PublicKey';
export declare class Program {
    static deserialize(hexstring: string): Program;
    static programFromParams(sigData: string[]): string;
    static programFromPubKey(publicKey: PublicKey): string;
    static programFromMultiPubKey(m: number, pks: PublicKey[]): string;
    parameter: string;
    code: string;
    serialize(): string;
}
