/// <reference types="long" />
import * as Long from 'long';
/**
 * Turn hex string into array buffer
 * @param str hex string
 */
export declare function hexstring2ab(str: string): number[];
/**
 * Turn array buffer into hex string
 * @param arr Array like value
 */
export declare function ab2hexstring(arr: any): string;
/**
 * Turn ArrayBuffer or array-like oject into normal string
 * @param buf
 */
export declare function ab2str(buf: ArrayBuffer | number[]): string;
/**
 * Turn normal string into ArrayBuffer
 * @param str Normal string
 */
export declare function str2ab(str: string): ArrayBuffer;
/**
 * Turn normal string into hex string
 * @param str Normal string
 */
export declare function str2hexstr(str: string): string;
/**
 * Turn hex string into normal string
 * @param str Hex string
 */
export declare function hexstr2str(str: string): string;
/**
 * return the (length of bytes) + bytes
 * @param hex Hex string
 */
export declare function hex2VarBytes(hex: string): string;
/**
 * return the length of string(bytes) + string(bytes)
 * @param str Normal string
 */
export declare function str2VarBytes(str: string): string;
/**
 * return the byte of boolean value
 * @param v
 */
export declare function bool2VarByte(v: boolean): "00" | "01";
/**
 * Do xor operation with two strings
 * @param str1 Hex string
 * @param str2 Hex string
 */
export declare function hexXor(str1: string, str2: string): string;
/**
 * Converts a number to a big endian hexstring of a suitable size, optionally little endian
 * @param {number} num
 * @param {number} size - The required size in bytes, eg 1 for Uint8, 2 for Uint16. Defaults to 1.
 * @param {boolean} littleEndian - Encode the hex in little endian form
 * @return {string}
 */
export declare const num2hexstring: (num: number, size?: number, littleEndian?: boolean) => string;
/**
 * Converts a number to a hex
 * @param {number} num - The number
 * @returns {string} hexstring of the variable Int.
 */
export declare const num2VarInt: (num: number) => string;
/**
 * Reverses a hex string, 2 chars as 1 byte
 * @example
 * reverseHex('abcdef') = 'efcdab'
 * @param {string} hex - HEX string
 * @return {string} reversed hex string.
 */
export declare const reverseHex: (hex: string) => string;
export declare function bigIntFromBytes(bytes: string): Long;
export declare function bigIntToBytes(value: Long): string;
/**
 * @class StringReader
 * @classdesc A string helper used to read given string as bytes.2 chars as one byte.
 * @param {string} str - The string to read.
 */
export declare class StringReader {
    str: string;
    pos: number;
    size: number;
    constructor(str?: string);
    /**
     * Checks if reached the end of the string.
     */
    isEmpty(): boolean;
    /**
     * Reads some bytes.
     * @param {number} bytes - Number of bytes to read
     */
    read(bytes: number): string;
    unreadBytes(bytes: number): void;
    /**
     * Reads string terminated by NULL.
     */
    readNullTerminated(): string;
    /**
     * First, read one byte as the length of bytes to read. Then read the following bytes.
     */
    readNextBytes(): string;
    /**
     * Reads one byte as int, which may indicates the length of following bytes to read.
     * @returns {number}
     */
    readNextLen(): number;
    /**
     * Read Uint8
     */
    readUint8(): number;
    /**
     * read 2 bytes as uint16 in littleEndian
     */
    readUint16(): number;
    /**
     * Read 4 bytes as uint32 in littleEndian
     */
    readUint32(): number;
    /**
     * Read 4 bytes as int in littleEndian
     */
    readInt(): number;
    /**
     * Read 8 bytes as long in littleEndian
     */
    readLong(): number;
    readBoolean(): boolean;
}
export declare class EventEmitter {
    handlers: any;
    on(type: string, handler: () => void): void;
    /**
     * trigger event
     * @param { string } type
     * @param { any } event , is the parameter
     */
    trigger(type: string, event?: any): void;
    off(type: string): void;
}
export declare const sendBackResult2Native: (result: string, callback: string) => void;
export declare const axiosPost: (url: string, params: any) => Promise<any>;
/**
 * Gets current time in unix timestamp format.
 */
export declare function now(): number;
/**
 * Computes sha-256 hash from hex encoded data.
 *
 * @param data Hex encoded data
 */
export declare function sha256(data: string): string;
/**
 * Computes ripemd-160 hash from hex encoded data.
 *
 * @param data Hex encoded data
 */
export declare function ripemd160(data: string): string;
/**
 * Computes ripemd-160 hash of sha-256 hash from hex encoded data.
 *
 * @param data Hex encoded data
 */
export declare function hash160(SignatureScript: string): string;
/**
 * Generates random ArrayBuffer of specified length.
 *
 * @param len Length of the array to generate
 */
export declare function generateRandomArray(len: number): ArrayBuffer;
/**
 * Generates random ArrayBuffer of specified length encoded as hex string
 *
 * @param len Length of the array to generate
 */
export declare function randomBytes(len: number): string;
export declare function generateMnemonic(size?: number): string;
export declare function parseMnemonic(str: string): any;
export declare function varifyPositiveInt(v: number): void;
export declare function isBase64(str: string): boolean;
export declare function isHexString(str: string): boolean;
export declare function unboundDeadline(): number;
export declare function calcUnboundOng(balance: number, startOffset: number, endOffset: number): number;
