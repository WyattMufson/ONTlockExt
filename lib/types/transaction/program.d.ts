import { PublicKey } from '../crypto/PublicKey';
import { StringReader } from './../utils';
import opcode from './opcode';
export declare function comparePublicKeys(a: PublicKey, b: PublicKey): number;
export declare function pushOpCode(op: opcode): string;
export declare function pushPubKey(pk: PublicKey): string;
export declare function pushBigInt(num: number): string;
export declare function pushNum(num: number): string;
export declare function pushBytes(hexstr: string): string;
export declare function programFromPubKey(pk: PublicKey): string;
export declare function programFromMultiPubKey(pubkeys: PublicKey[], m: number): string;
export declare function programFromParams(sigs: string[]): string;
export declare function readOpcode(sr: StringReader): number;
export declare function readNum(sr: StringReader): number;
export declare function readBytes(sr: StringReader): string;
export declare function readPubKey(sr: StringReader): PublicKey;
export declare function getParamsFromProgram(hexstr: string): string[];
export declare class ProgramInfo {
    M: number;
    pubKeys: PublicKey[];
}
export declare function getProgramInfo(hexstr: string): ProgramInfo;
