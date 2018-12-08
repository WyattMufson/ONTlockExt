export declare class TransactionInput {
    static deserialize(hexstr: string): TransactionInput;
    /**
     * 32 bytes
     */
    prevHash: string;
    prevIndex: number;
    equals(o: any): boolean;
    hashCode(): number;
    serialize(): string;
}
