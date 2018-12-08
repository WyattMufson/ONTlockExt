import { Claim } from '../claim/claim';
import { PgpSignature } from '../crypto';
import { ERROR_CODE } from '../error';
import RestClient from '../network/rest/restClient';
import { ScryptParams } from '../scrypt';
import { Transaction } from '../transaction/transaction';
export declare class SDK {
    static SERVER_NODE: string;
    static REST_PORT: string;
    static SOCKET_PORT: string;
    static restClient: RestClient;
    static setServerNode(node: string): void;
    static setRestPort(port: string): void;
    static setSocketPort(port: string): void;
    static getDecryptError(err: any): {
        error: ERROR_CODE;
        result: string;
    };
    static transformPassword(password: string): string;
    static createWallet(name: string, password: string, payer: string, gasPrice: string, gasLimit: string, callback?: string): Promise<any>;
    static importIdentityWithWallet(label: string, encryptedPrivateKey: string, password: string, address: string, salt: string, callback?: string): any;
    static importIdentityAndCreateWallet(label: string, encryptedPrivateKey: string, password: string, address: string, salt: string, callback?: string): Promise<any>;
    static createIdentity(label: string, password: string, payer: string, gasPrice: string, gasLimit: string, callback?: string): Promise<any>;
    static createAccount(label: string, password: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
        mnemonicEnc: string;
    };
    static decryptMnemonicEnc(mnemonicEnc: string, address: string, salt: string, password: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    static importAccountWithWallet(label: string, encryptedPrivateKey: string, address: string, salt: string, password: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    static signSelfClaim(context: string, claimData: string, ontid: string, encryptedPrivateKey: string, password: string, address: string, salt: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    } | {
        error: number;
        result: Claim;
    };
    static decryptEncryptedPrivateKey(encryptedPrivateKey: string, password: string, address: string, salt: string, callback?: string): {
        error: number;
        result: string;
    };
    static getClaim(claimId: string, context: string, issuer: string, subject: string, encryptedPrivateKey: string, password: string, address: string, salt: string, payer: string, gasPrice: string, gasLimit: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    } | Promise<void | {
        error: ERROR_CODE;
        result: string;
    }>;
    static signData(content: string, encryptedPrivateKey: string, password: string, address: string, salt: string, callback?: string): PgpSignature | object;
    static getBalance(address: string, callback?: string): Promise<{
        error: number;
        result: any;
    } | {
        error: any;
        result: string;
    }>;
    static transferAssets(token: string, from: string, to: string, value: string, encryptedPrivateKey: string, password: string, salt: string, gasPrice: string, gasLimit: string, payer: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    static claimOng(address: string, value: string, encryptedPrivateKey: string, password: string, salt: string, gasPrice: string, gasLimit: string, payer: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    static exportIdentityToQrcode(identityDataStr: string, callback?: string): {
        type: string;
        label: string;
        algorithm: string;
        scrypt: {
            n: number;
            p: number;
            r: number;
            dkLen: number;
        };
        key: string;
        salt: string;
        address: string;
        parameters: {
            curve: string;
        };
    };
    static exportIdentityToKeystring(identityDataStr: string, callback?: string): string;
    static exportAccountToQrcode(accountDataStr: string, callback?: string): {
        type: string;
        label: string;
        algorithm: string;
        scrypt: {
            n: number;
            p: number;
            r: number;
            dkLen: number;
        };
        key: string;
        salt: string;
        address: string;
        parameters: {
            curve: string;
        };
    };
    static exportAccountToKeystring(accountDataStr: string, callback?: string): string;
    static importAccountMnemonic(label: string, mnemonic: string, password: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    static exportWifPrivakeKey(encryptedKey: string, password: string, address: string, salt: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    static importAccountWithWif(label: string, wif: string, password: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    static importAccountWithPrivateKey(label: string, privateKey: string, password: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    /**
     * Actually import with Qrcode
     */
    static importAccountWithKeystore(keystore: string, password: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    static getUnclaimedOng(address: string, callback?: string): Promise<{
        error: ERROR_CODE;
        result: any;
    } | {
        error: any;
        result: string;
    }>;
    static querySmartCodeEventByTxhash(txHash: string, callback?: string): Promise<{
        error: ERROR_CODE;
        result: any;
    } | {
        error: any;
        result: string;
    }>;
    static createSharedWallet(requiredSignatureNum: string, allRelatedPks: string, callback?: string): string;
    static adderssFromPublicKey(publicKey: string, callback?: string): string;
    static makeMultiSignTransaction(asset: string, from: string, to: string, amount: string, gasPrice: string, gasLimit: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    } | {
        error: ERROR_CODE;
        txHash: string;
        txData: string;
    };
    static signMultiAddrTransaction(encryptedPrivateKey: string, address: string, salt: string, password: string, allRelatedPks: string, requiredSignatureNum: string, txDada: string, callback?: string): Transaction | {
        error: ERROR_CODE;
        result: string;
    };
    /**
     * Neo transfer
     */
    static neoTransfer(from: string, to: string, value: string, encryptedPrivateKey: string, password: string, salt: string, callback?: string, params?: ScryptParams): {
        error: ERROR_CODE;
        result: string;
    } | Promise<{
        error: ERROR_CODE;
        result: string;
    }>;
    static getNeoBalance(address: string, callback?: string): Promise<{
        error: ERROR_CODE;
        result: number;
    }>;
    static sendTransaction(txData: string, callback?: string): Promise<{
        error: ERROR_CODE;
        result: any;
    } | {
        error: any;
        result: string;
    }>;
    static queryOep8Balance(contractHash: string, account: string, tokenId: number, callback?: string): Promise<{
        error: ERROR_CODE;
        result: number;
    }>;
    static queryOep8Balances(contractHash: string, account: string, callback?: string): Promise<{
        error: ERROR_CODE;
        result: number[];
    }>;
    static queryOep8TotalBalance(contractHash: string, account: string, callback?: string): Promise<{
        error: ERROR_CODE;
        result: number;
    }>;
    static transferOep8(contractHash: string, from: string, to: string, value: string, tokenId: number, encryptedPrivateKey: string, password: string, salt: string, gasPrice: string, gasLimit: string, payer: string, callback?: string): {
        error: ERROR_CODE;
        result: string;
    };
    static compoundOep8(contractHash: string, account: string, compoundNum: number, encryptedPrivateKey: string, password: string, salt: string, gasPrice: string, gasLimit: string, payer: string, callback: string): {
        error: ERROR_CODE;
        result: string;
    };
}
