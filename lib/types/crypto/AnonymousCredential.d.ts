/**
 * Issuer
 *  Issuer in Anonymous Credential
 */
export declare class Issuer {
    sk: SecretKey;
    pk: IssuerPublicKey;
    AttributeName: string[];
    param: CryptoSuite;
    constructor(curve: string);
    GenerateSk(): SecretKey;
    GenerateKeyPair(): void;
    SetAttributeSet(AttributeName: string[]): void;
    Sign(Nym: any, attrs: any[]): Credential;
    GetPk(): IssuerPublicKey;
    GenerateNonce(): any;
    VerifyCredentialRequest(CR: any): boolean;
}
/**
 * User
 *  An user in Anonymous Credential
 *  Prover and Verifier are all user.
 */
export declare class User {
    attrs: any[];
    private sk;
    private Nym;
    private Cred;
    private ipk;
    private param;
    constructor(curve: string);
    GenerateSk(): SecretKey;
    SetIpk(ipk: IssuerPublicKey): void;
    GenerateCrendentialRequest(nonce: any): any;
    VerifyBBSplus(Cred: Credential): boolean;
    SetCredential(Cred: Credential): boolean;
    Prove(D: any[]): {
        A_: any;
        _A: any;
        B_: any;
        Nym: any;
        pi: {
            c: any;
            s_sk: any;
            s_a: any[];
            s_e: any;
            s_r2: any;
            s_r3: any;
            s_s_: any;
            nonce: any;
        };
    };
    Verify(proof: any, D: any[], attrs: any[]): boolean;
}
/**
 * CryptoSuite
 *  contains everything in Paring Based Cryptography
 */
export declare class CryptoSuite {
    curve: string;
    ctx: any;
    order: any;
    PAIR: any;
    ECP: any;
    ECP2: any;
    BIG: any;
    rng: any;
    g1: any;
    g2: any;
    constructor(curve: string);
    getG1Generator(): any;
    getG2Generator(): any;
    getOrder(): any;
    getRandBN(): any;
    getRandG1(): any;
    getRandG2(): any;
    hashToBN(...points: any[]): any;
    genAttrBN(attrs: any): any;
    genAttrElement(attrs: any): any;
}
/**
 * CryptoBase
 *  contains a refrence to a CryptoSuite instance.
 */
export declare class CryptoBase {
    param: CryptoSuite;
    constructor(param: CryptoSuite);
}
export declare class SecretKey extends CryptoBase {
    static GenerateSk(param: CryptoSuite): SecretKey;
    value: any;
    constructor(param: CryptoSuite);
    setValue(v: any): void;
    GenerateIssuerPublicKey(): IssuerPublicKey;
    ToBytes(): any;
    FromBytes(s: any): any;
    Rand(): void;
}
export declare class IssuerPublicKey extends CryptoBase {
    static COPY(target: IssuerPublicKey): IssuerPublicKey;
    w: any;
    _g1: any;
    _g2: any;
    pi: {
        C: any;
        S: any;
    };
    h0: any;
    h_sk: any;
    h: any;
    attr: any[];
    constructor(param: CryptoSuite);
    SetBasicValue(w: any, _g1: any, _g2: any, pi: any): void;
    SetAttrValue(h0: any, h_sk: any, h: any[], attr: any[]): void;
    GenerateAttr(AttributeName: any): void;
    VerifyCredentialRequest(CR: any): boolean;
}
/**
 * Credential
 *  The credential generated from issuer
 */
export declare class Credential extends CryptoBase {
    sig: {
        A: any;
        B: any;
        e: any;
        s: any;
    };
    attrs: any[];
    constructor(param: CryptoSuite);
    Set(A: any, B: any, e: any, s: any, attrs: any): void;
    Copy(target: Credential): void;
}
