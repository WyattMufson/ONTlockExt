export declare function verifyLeafHashInclusion(leafHash: string, leafIndex: number, proof: string[], rootHash: string, treeSize: number): boolean;
export declare function calculateRootHashFromAuditPath(leafHash: string, leafIndex: number, proof: string[], treeSize: number): string;
export declare function hashChildren(left: string, right: string): string;
export declare function getProofNodes(leafIndex: number, treeSize: number, proof: string[]): any[];
export declare function constructClaimProof(txHash: string, contractAddr: string): Promise<{
    Type: string;
    TxnHash: string;
    ContractAddr: string;
    BlockHeight: any;
    MerkleRoot: any;
    Nodes: any[];
}>;
export declare function verifyClaimProof(txHash: string, merkleRoot: string, nodes: any[]): boolean;
