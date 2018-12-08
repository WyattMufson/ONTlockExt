import { StringReader } from '../utils';
export default class Uint160 {
    static deserialize(sr: StringReader): Uint160;
    value: Uint8Array;
    compareTo(o: Uint160): 1 | 0 | -1;
    serialize(): string;
}
