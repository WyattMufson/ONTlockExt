import { Address } from '../../crypto/address';
import { StringReader } from '../../utils';
export declare class Transfers {
    static deserialize(sr: StringReader): Transfers;
    states: State[];
    constructor();
    serialize(): string;
}
export declare class TokenTransfer {
    static deserialize(sr: StringReader): TokenTransfer;
    contract: string;
    states: State[];
    serialize(): string;
}
export declare class State {
    static deserialize(sr: StringReader): State;
    from: Address;
    to: Address;
    value: string;
    constructor(from: Address, to: Address, value: string);
    serialize(): string;
}
export declare class Contract {
    static deserialize(sr: StringReader): Contract;
    version: string;
    address: Address;
    method: string;
    args: string;
    constructor();
    serialize(): string;
}
export declare class TransferFrom {
    static deserialize(sr: StringReader): TransferFrom;
    sender: Address;
    from: Address;
    to: Address;
    value: string;
    constructor(sender: Address, from: Address, to: Address, value: string);
    serialize(): string;
}
