/**
 * Represents Notify event of attest creation of revocation.
 */
export declare class AttestNotifyEvent {
    /**
     * Deserializes Notify event.
     *
     * States in events are hex encoded.
     *
     * @param e encoded event
     */
    static deserialize(e: any): AttestNotifyEvent;
    Action: string;
    Desc: string;
    Error: number;
    Result: Result;
}
/**
 * Result of Notify event.
 */
export declare class Result {
    /**
     * Deserializes result from event.
     *
     * States are hex encoded.
     *
     * @param r encoded result
     */
    static deserialize(r: any): Result;
    TxHash: string;
    /**
     * State = 1 : smartcontract executation success
     * State = 0 : smartcontract executation failure
     */
    State: number;
    GasConsumed: number;
    Notify: [{
        ContractAddress: string;
        /**
         * The value of States are usually hex string
         */
        States: any[];
    }];
    Version: string;
}
