import { Signable } from '../crypto/index';
import { PrivateKey } from '../crypto/PrivateKey';
import { TxType } from '../transaction/transaction';
import { SignatureScheme } from './../crypto/SignatureScheme';
import { TransactionAttribute } from './../transaction/txAttribute';
import { Program } from './Program';
import { TransactionInput } from './TransactionInput';
import { TransactionOutput } from './TransactionOutput';
export declare class TransactionNeo implements Signable {
    /**
     * Transaction type
     */
    type: TxType;
    version: number;
    nonce: string;
    attributes: TransactionAttribute[];
    inputs: TransactionInput[];
    outputs: TransactionOutput[];
    scripts: Program[];
    serialize(): string;
    serializeUnsigned(): string;
    getHash(): string;
    getSignContent(): string;
    serializeUnsignedData(): string;
    getHashData(): string;
    sign(privateKey: PrivateKey, scheme?: SignatureScheme): string;
    protected serializeExclusiveData(): string;
}
