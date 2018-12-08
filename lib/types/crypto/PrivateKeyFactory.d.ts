import { JsonKey } from './Key';
import { PrivateKey } from './PrivateKey';
/**
 * Interface for Key deserializers
 */
export interface KeyDeserializer {
    getType(): string;
    deserialize(json: JsonKey): PrivateKey;
}
/**
 * Default private key deserializer.
 */
export declare class DefaultKeyDeserializer implements KeyDeserializer {
    getType(): string;
    deserialize(json: JsonKey): PrivateKey;
}
/**
 * Registers new external deserializer for private keys.
 *
 * @param deserializer Deserializer instance
 */
export declare function registerKeyDeserializer(deserializer: KeyDeserializer): void;
/**
 * Creates PrivateKey from Json representation.
 *
 * @param json Json private key representation
 *
 */
export declare function deserializeFromJson(json: JsonKey): PrivateKey;
