import { Address } from './../crypto/address';
export declare class TransactionOutput {
    static deserialize(hexstring: string): TransactionOutput;
    /**
     * 32 bytes
     */
    assetId: string;
    value: number;
    scriptHash: Address;
    serialize(): string;
}
