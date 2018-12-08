import { StringReader } from '../../utils';
import Payload from './payload';
/**
 * Describes the payload of deploy code
 */
export default class DeployCode extends Payload {
    /**
     * Hex encoded contract content
     */
    code: string;
    /**
     * Decides if the contract need storage
     */
    needStorage: boolean;
    /**
     * Name of the smart contract
     */
    name: string;
    /**
     * Version of the contract
     */
    version: string;
    /**
     * Author of the contract
     */
    author: string;
    /**
     * Email of the author
     */
    email: string;
    /**
     * Description of the contract
     */
    description: string;
    /**
     * Serialize deploy code to hex string
     */
    serialize(): string;
    /**
     * Deserialize deploy code
     * @param sr
     */
    deserialize(sr: StringReader): void;
}
