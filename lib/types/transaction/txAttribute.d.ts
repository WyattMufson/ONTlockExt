import { StringReader } from '../utils';
export declare enum TransactionAttributeUsage {
    Nonce = 0,
    Script = 32,
    DescriptionUrl = 129,
    Description = 144,
}
/**
 * @deprecated
 * TransactionAttribute
 * @property {number} usage - Identifying byte
 * @property {string} data - Data
 */
export declare class TransactionAttribute {
    usage: TransactionAttributeUsage;
    data: string;
    serialize(): string;
    deserialize(ss: StringReader): void;
}
