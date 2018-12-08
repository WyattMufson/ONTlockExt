import { CurveLabel } from './CurveLabel';
import { KeyType } from './KeyType';
import { SignatureScheme } from './SignatureScheme';
/**
 * Specific parameters for the key type.
 */
export declare class KeyParameters {
    /**
     * Create KeyParameters from json.
     * @param json JsonKeyParameters
     */
    static deserializeJson(json: JsonKeyParameters): KeyParameters;
    curve: CurveLabel;
    constructor(curve: CurveLabel);
    /**
     * Serialize KeyParameters to json.
     */
    serializeJson(): JsonKeyParameters;
}
/**
 * Common representation of private or public key
 */
export declare class Key {
    /**
     * Algorithm used for key generation.
     */
    algorithm: KeyType;
    /**
     * Parameters of the algorithm.
     */
    parameters: KeyParameters;
    /**
     * Key data.
     */
    key: string;
    /**
     * Creates Key.
     *
     * If no algorithm or parameters are specified, default values will be used.
     * This is strongly discurraged, because it will forbid using other Key types.
     * Therefore use it only for testing.
     *
     * @param key Hex encoded key value
     * @param algorithm Key type
     * @param parameters Parameters of the key type
     */
    constructor(key: string, algorithm?: KeyType, parameters?: KeyParameters);
    /**
     * Computes hash of message using hashing function of signature schema.
     *
     * @param msg Hex encoded input data
     * @param scheme Signing schema to use
     */
    computeHash(msg: string, scheme: SignatureScheme): string;
    /**
     * Tests if signing schema is compatible with key type.
     *
     * @param schema Signing schema to use
     */
    isSchemaSupported(schema: SignatureScheme): boolean;
    /**
     * Gets JSON representation of the Key (Public/Private).
     */
    serializeJson(): JsonKey;
}
/**
 * Json representation of the Key.
 */
export interface JsonKey {
    algorithm: string;
    parameters: JsonKeyParameters;
    key: string | null;
    external?: any | null;
}
/**
 * Json representation of the Key parameters.
 */
export interface JsonKeyParameters {
    curve: string;
}
