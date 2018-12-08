import { TransactionNeo } from './TransactionNeo';
export declare class InvocationTransaction extends TransactionNeo {
    script: string;
    gas: number;
    constructor();
    serializeExclusiveData(): string;
}
