import { StringReader } from '../utils';
export default class Fixed64 {
    static deserialize(sr: StringReader): Fixed64;
    value: string;
    constructor(value?: string);
    serialize(): string;
}
