import { StringReader } from '../utils';
export declare enum VmType {
    NativeVM = 255,
    NEOVM = 128,
    WASMVM = 144,
}
/**
 * @deprecated
 */
export declare class VmCode {
    static deserialize(sr: StringReader): any;
    vmType: VmType;
    code: string;
    serialize(): string;
}
