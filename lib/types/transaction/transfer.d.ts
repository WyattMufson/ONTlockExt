import { Address } from '../crypto/address';
import { Transaction } from './transaction';
export declare class Transfer extends Transaction {
    amount: number | string;
    tokenType: string;
    from: Address;
    to: Address;
    method: string;
}
