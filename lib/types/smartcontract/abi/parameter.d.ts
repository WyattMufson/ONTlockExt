export declare enum ParameterType {
    Boolean = "Boolean",
    Integer = "Integer",
    ByteArray = "ByteArray",
    Interface = "Interface",
    Array = "Array",
    Struct = "Struct",
    Map = "Map",
    String = "String",
    Int = "Int",
    Long = "Long",
    IntArray = "IntArray",
    LongArray = "LongArray",
    Address = "Address",
}
export declare enum ParameterTypeVal {
    ByteArray = 0,
    Boolean = 1,
    Integer = 2,
    Interface = 64,
    Array = 128,
    Struct = 129,
    Map = 130,
}
/**
 * Decribes the parameter.
 */
export declare class Parameter {
    name: string;
    type: ParameterType;
    value: any;
    constructor(name: string, type: ParameterType, value: any);
    getName(): string;
    getType(): ParameterType;
    getValue(): any;
    setValue(value: any): boolean;
}
