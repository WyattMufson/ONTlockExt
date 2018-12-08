/**
 * Direction of noe in merkle proof
 */
export declare enum Direction {
    Right = "Right",
    Left = "Left",
}
/**
 * Node in merkle proof
 */
export interface Node {
    Direction: Direction;
    TargetHash: string;
}
/**
 * TODO: Add merkle proof verification.
 *
 */
export declare class ClaimProof {
    Type: 'MerkleProof';
    TxnHash: string;
    ContractAddr: string;
    BlockHeight: number;
    MerkleRoot: string;
    Nodes: Node[];
}
