import { StringReader } from '../utils';
export default class Uint256 {
    static deserialize(sr: StringReader): Uint256;
    value: Uint8Array;
    compareTo(o: Uint256): 1 | 0 | -1;
    serialize(): string;
}
