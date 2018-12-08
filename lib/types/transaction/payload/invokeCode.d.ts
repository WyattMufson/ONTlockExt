import { StringReader } from '../../utils';
import Payload from './payload';
export default class InvokeCode extends Payload {
    /**
     * Hex encoed string
     */
    code: string;
    constructor();
    serialize(): string;
    deserialize(sr: StringReader): this;
}
