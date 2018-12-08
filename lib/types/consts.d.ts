export declare const ADDR_VERSION = "17";
export declare const DEFAULT_SCRYPT: {
    cost: number;
    blockSize: number;
    parallel: number;
    size: number;
};
export declare const OEP_HEADER = "0142";
export declare const OEP_FLAG = "e0";
export declare const WEBVIEW_SCHEME = "Ont";
export declare const DEFAULT_ALGORITHM: {
    algorithm: string;
    parameters: {
        curve: string;
    };
};
export declare const DEFAULT_SM2_ID = "1234567812345678";
export declare const TEST_NODE = "polaris1.ont.io";
export declare const MAIN_NODE = "dappnode1.ont.io";
export declare const HTTP_REST_PORT = "20334";
export declare const HTTP_WS_PORT = "20335";
export declare const HTTP_JSON_PORT = "20336";
export declare const REST_API: {
    getBalance: string;
    sendRawTx: string;
    getMerkleProof: string;
};
export declare const ONT_NETWORK: {
    MAIN: string;
    TEST: string;
};
export declare const TEST_ONT_URL: {
    SOCKET_URL: string;
    RPC_URL: string;
    REST_URL: string;
    sendRawTxByRestful: string;
};
export declare const MAIN_ONT_URL: {
    SOCKET_URL: string;
    RPC_URL: string;
    REST_URL: string;
    sendRawTxByRestful: string;
};
export declare const TOKEN_TYPE: {
    ONT: string;
    ONG: string;
};
export declare const DEFAULT_GAS_LIMIT = 30000;
export declare const NATIVE_INVOKE_NAME = "Ontology.Native.Invoke";
export declare const TX_MAX_SIG_SIZE = 16;
export declare const ONT_BIP44_PATH = "m/44'/1024'/0'/0/0";
export declare const UNBOUND_GENERATION_AMOUNT: number[];
export declare const UNBOUND_TIME_INTERVAL = 31536000;
export declare const ONT_TOTAL_SUPPLY = 1000000000;
export declare const GENESIS_BLOCK_TIMESTAMP = 1530316800;
