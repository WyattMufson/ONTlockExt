module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/account.ts":
/*!************************!*\
  !*** ./src/account.ts ***!
  \************************/
/*! exports provided: Account */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Account", function() { return Account; });
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bip39 */ "bip39");
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bip39__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crypto */ "./src/crypto/index.ts");
/* harmony import */ var _crypto_PrivateKeyFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crypto/PrivateKeyFactory */ "./src/crypto/PrivateKeyFactory.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error */ "./src/error.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */







// tslint:disable-next-line:no-var-requires
const HDKey = __webpack_require__(/*! @ont-community/hdkey-secp256r1 */ "@ont-community/hdkey-secp256r1");
class Account {
    constructor() {
        // to compatible with cli wallet
        this['enc-alg'] = 'aes-256-gcm';
        this.hash = 'sha256';
    }
    /**
     * Import account
     * @param label Account's label
     * @param encryptedPrivateKey Encrypted private key
     * @param password User's password to decrypt private key
     * @param address Account's address
     * @param saltBase64 Salt to decrypt
     * @param params Params used to decrypt
     */
    static importAccount(label, encryptedPrivateKey, password, address, saltBase64, params) {
        const account = new Account();
        const salt = Buffer.from(saltBase64, 'base64').toString('hex');
        const privateKey = encryptedPrivateKey.decrypt(password, address, salt, params);
        if (!label) {
            label = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["ab2hexstring"])(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["generateRandomArray"])(4));
        }
        account.label = label;
        account.lock = false;
        account.isDefault = false;
        account.salt = saltBase64;
        account.encryptedKey = encryptedPrivateKey;
        const publicKey = privateKey.getPublicKey();
        account.publicKey = publicKey.key;
        account.address = _crypto__WEBPACK_IMPORTED_MODULE_2__["Address"].fromPubKey(publicKey);
        return account;
    }
    /**
     * Import account with mnemonic
     * @param label Account's label
     * @param mnemonic User's mnemonic
     * @param password user's password to encrypt the private key
     * @param params Params used to encrypt the private key.
     */
    static importWithMnemonic(label, mnemonic, password, params) {
        mnemonic = mnemonic.trim();
        if (!bip39__WEBPACK_IMPORTED_MODULE_0__["validateMnemonic"](mnemonic)) {
            throw _error__WEBPACK_IMPORTED_MODULE_4__["ERROR_CODE"].INVALID_PARAMS;
        }
        const seed = bip39__WEBPACK_IMPORTED_MODULE_0__["mnemonicToSeedHex"](mnemonic);
        const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'));
        const pri = hdkey.derive(_consts__WEBPACK_IMPORTED_MODULE_1__["ONT_BIP44_PATH"]);
        const key = Buffer.from(pri.privateKey).toString('hex');
        const privateKey = new _crypto__WEBPACK_IMPORTED_MODULE_2__["PrivateKey"](key);
        const account = Account.create(privateKey, password, label, params);
        return account;
    }
    /**
     * Creates Account object encrypting specified private key.
     *
     * The account does not need to be registered on blockchain.
     *
     * @param privateKey Private key associated with the account
     * @param password Password use to encrypt the private key
     * @param label Custom label
     * @param params Optional scrypt params
     */
    static create(privateKey, password, label, params) {
        const account = new Account();
        if (!label) {
            label = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["ab2hexstring"])(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["generateRandomArray"])(4));
        }
        account.label = label;
        account.lock = false;
        account.isDefault = false;
        const salt = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["randomBytes"])(16);
        const publicKey = privateKey.getPublicKey();
        const address = _crypto__WEBPACK_IMPORTED_MODULE_2__["Address"].fromPubKey(publicKey);
        account.publicKey = publicKey.serializeHex();
        account.address = address;
        account.encryptedKey = privateKey.encrypt(password, address, salt, params);
        account.salt = Buffer.from(salt, 'hex').toString('base64');
        return account;
    }
    static parseJson(json) {
        return Account.parseJsonObj(JSON.parse(json));
    }
    /**
     * Deserializes JSON object.
     *
     * Object should be real object, not stringified.
     *
     * @param obj JSON object
     */
    static parseJsonObj(obj) {
        const account = new Account();
        account.address = new _crypto__WEBPACK_IMPORTED_MODULE_2__["Address"](obj.address);
        account.label = obj.label;
        account.lock = obj.lock;
        account.isDefault = obj.isDefault;
        account.publicKey = obj.publicKey;
        account.hash = obj.hash;
        account.salt = obj.salt;
        account.encryptedKey = Object(_crypto_PrivateKeyFactory__WEBPACK_IMPORTED_MODULE_3__["deserializeFromJson"])({
            algorithm: obj.algorithm,
            parameters: obj.parameters,
            key: obj.key,
            external: obj.external
        });
        // account.contract = obj.contract
        account.extra = obj.extra;
        return account;
    }
    toJson() {
        return JSON.stringify(this.toJsonObj());
    }
    /**
     * Serializes to JSON object.
     *
     * Returned object will not be stringified.
     *
     */
    toJsonObj() {
        const obj = _extends({
            'address': this.address.toBase58(),
            'label': this.label,
            'lock': this.lock
        }, this.encryptedKey.serializeJson(), {
            'enc-alg': this['enc-alg'],
            'hash': this.hash,
            'salt': this.salt,
            'isDefault': this.isDefault,
            'publicKey': this.publicKey,
            'signatureScheme': this.encryptedKey.algorithm.defaultSchema.label
        });
        return obj;
    }
    exportPrivateKey(password, params) {
        return this.encryptedKey.decrypt(password, this.address, this.salt, params);
    }
    signTransaction(password, tx, params) {
        const pri = this.exportPrivateKey(password, params);
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["signTransaction"])(tx, pri, pri.algorithm.defaultSchema);
        return tx;
    }
}

/***/ }),

/***/ "./src/claim/attestNotifyEvent.ts":
/*!****************************************!*\
  !*** ./src/claim/attestNotifyEvent.ts ***!
  \****************************************/
/*! exports provided: AttestNotifyEvent, Result */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttestNotifyEvent", function() { return AttestNotifyEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Result", function() { return Result; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Represents Notify event of attest creation of revocation.
 */
class AttestNotifyEvent {
    constructor() {
        this.Action = 'Notify';
    }
    /**
     * Deserializes Notify event.
     *
     * States in events are hex encoded.
     *
     * @param e encoded event
     */
    static deserialize(e) {
        const event = new AttestNotifyEvent();
        event.Action = e.Action;
        event.Error = e.Error;
        event.Desc = e.Desc;
        event.Result = Result.deserialize(e.Result);
        return event;
    }
}
/**
 * Result of Notify event.
 */
class Result {
    /**
     * Deserializes result from event.
     *
     * States are hex encoded.
     *
     * @param r encoded result
     */
    static deserialize(r) {
        const result = new Result();
        result.TxHash = r.TxHash;
        result.State = r.State;
        result.GasConsumed = r.GasConsumed;
        result.Notify = r.Notify.map(n => {
            return {
                ContractAddress: n.ContractAddress,
                States: n.States.map(s => typeof s === 'string' ? Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hexstr2str"])(s) : s)
            };
        });
        result.Version = r.Version;
        return result;
    }
}

/***/ }),

/***/ "./src/claim/claim.ts":
/*!****************************!*\
  !*** ./src/claim/claim.ts ***!
  \****************************/
/*! exports provided: RevocationType, Claim, GetStatusResponse, Status */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RevocationType", function() { return RevocationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Claim", function() { return Claim; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetStatusResponse", function() { return GetStatusResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Status", function() { return Status; });
/* harmony import */ var base64_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base64-url */ "base64-url");
/* harmony import */ var base64_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(base64_url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _network_rest_restClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../network/rest/restClient */ "./src/network/rest/restClient.ts");
/* harmony import */ var _network_websocket_websocketClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../network/websocket/websocketClient */ "./src/network/websocket/websocketClient.ts");
/* harmony import */ var _smartcontract_neovm_attestClaimTxBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../smartcontract/neovm/attestClaimTxBuilder */ "./src/smartcontract/neovm/attestClaimTxBuilder.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _attestNotifyEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./attestNotifyEvent */ "./src/claim/attestNotifyEvent.ts");
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./message */ "./src/claim/message.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/








/**
 * Type of revocation.
 */
var RevocationType;
(function (RevocationType) {
    RevocationType["AttestContract"] = "AttestContract";
    RevocationType["RevocationList"] = "RevocationList";
})(RevocationType || (RevocationType = {}));
/**
 * Verifiable claim.
 *
 * TODO: override verify to add claim proof verification.
 */
class Claim extends _message__WEBPACK_IMPORTED_MODULE_7__["Message"] {
    static deserialize(jwt) {
        return super.deserializeInternal(jwt, (m, s) => new Claim(m, s));
    }
    constructor(metadata, signature, useProof) {
        super(metadata, signature);
        this.useProof = useProof === true;
    }
    /**
     * Overrides default message verification with added attest verification.
     *
     * TODO: return more than boolean
     *
     * const VerifyOntidClaimResult = {
     *   CLAIM_NOT_ONCHAIN : 'CLAIM_NOT_ONCHAIN',
     *   INVALID_SIGNATURE : 'INVALID_SIGNATURE',
     *   PK_IN_REVOKED     : 'PK_IN_REVOKED',
     *   NO_ISSUER_PK      : 'NO_ISSUER_PK',
     *   EXPIRED_CLAIM     : 'EXPIRED_CLAIM',
     *   REVOKED_CLAIM     : 'REVOKED_CLAIM',
     *   VALID_CLAIM       : 'VALID_CLAIM'
     * };
     *
     * @param url Restful endpoint of Ontology node
     * @param checkAttest Should be the attest tested
     */
    async verify(url, checkAttest = true) {
        const result = await super.verify(url);
        if (result && checkAttest) {
            return this.getStatus(url);
        } else {
            return result;
        }
    }
    /**
     * Serializes the claim into JWT/JWT-X format.
     *
     * Override default implementation by adding proof if available.
     */
    serialize() {
        if (this.useProof) {
            const jwt = super.serialize();
            const proof = this.serializeProof();
            return jwt + '.' + proof;
        } else {
            return super.serialize();
        }
    }
    /**
     * Attests the claim onto blockchain.
     *
     * @param url Websocket endpoint of Ontology node
     * @param privateKey Private key to sign the transaction
     * @param gasPrice gasPrice
     * @param gasLimit gasLimit
     * @param payer payer
     */
    async attest(url, gasPrice, gasLimit, payer, privateKey) {
        const attesterId = this.metadata.issuer;
        const subjectId = this.metadata.subject;
        const claimId = this.metadata.messageId;
        if (claimId === undefined) {
            throw new Error('Claim id not specified.');
        }
        const client = new _network_websocket_websocketClient__WEBPACK_IMPORTED_MODULE_2__["WebsocketClient"](url);
        const tx = Object(_smartcontract_neovm_attestClaimTxBuilder__WEBPACK_IMPORTED_MODULE_3__["buildCommitRecordTx"])(claimId, attesterId, subjectId, gasPrice, gasLimit, payer);
        await Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["signTransactionAsync"])(tx, privateKey);
        const response = await client.sendRawTransaction(tx.serialize(), false, true);
        const event = _attestNotifyEvent__WEBPACK_IMPORTED_MODULE_6__["AttestNotifyEvent"].deserialize(response);
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(event));
        return event.Result.Notify[0].States[0] === 'Push';
    }
    /**
     * Revokes claim attest from blockchain.
     *
     * @param gas the cost of the transactoin
     * @param payer the payer of the cost
     * @param privateKey Private key to sign the transaction
     * @param url Websocket endpoint of Ontology node
     * @param gasPrice gasPrice
     * @param gasLimit gasLimit
     * @param payer payer
     */
    async revoke(url, gasPrice, gasLimit, payer, privateKey) {
        const attesterId = this.metadata.issuer;
        const claimId = this.metadata.messageId;
        if (claimId === undefined) {
            throw new Error('Claim id not specified.');
        }
        const client = new _network_websocket_websocketClient__WEBPACK_IMPORTED_MODULE_2__["WebsocketClient"](url);
        const tx = Object(_smartcontract_neovm_attestClaimTxBuilder__WEBPACK_IMPORTED_MODULE_3__["buildRevokeRecordTx"])(claimId, attesterId, gasPrice, gasLimit, payer);
        await Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["signTransactionAsync"])(tx, privateKey);
        const response = await client.sendRawTransaction(tx.serialize(), false, true);
        const event = _attestNotifyEvent__WEBPACK_IMPORTED_MODULE_6__["AttestNotifyEvent"].deserialize(response);
        return event.Result.Notify[0].States[0] === 'Push';
    }
    /**
     * Gets status of the claim attest.
     *
     * @param url Restful endpoint of Ontology node
     */
    async getStatus(url) {
        const attesterId = this.metadata.issuer;
        const claimId = this.metadata.messageId;
        if (claimId === undefined) {
            throw new Error('Claim id not specified.');
        }
        const client = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_1__["default"](url);
        const tx = Object(_smartcontract_neovm_attestClaimTxBuilder__WEBPACK_IMPORTED_MODULE_3__["buildGetRecordStatusTx"])(claimId);
        const response = await client.sendRawTransaction(tx.serialize(), true);
        const result = GetStatusResponse.deserialize(response);
        // tslint:disable-next-line:no-console
        console.log(result);
        return result.status === Status.ATTESTED && result.issuerId === attesterId;
    }
    payloadToJSON() {
        return {
            'ver': this.version,
            '@context': this.context,
            'clm': this.content,
            'clm-rev': this.revocation
        };
    }
    payloadFromJSON(json) {
        this.version = json.ver;
        this.context = json['@context'];
        this.content = json.clm;
        this.revocation = json['clm-rev'];
    }
    /**
     * Serializes the header into JWT/JWT-X encoded header.
     *
     * Override default implementation by adding proof if available.
     *
     * @param algorithm Signature algorithm used
     * @param publicKeyId The ID of a signature public key
     */
    serializeHeader(algorithm, publicKeyId) {
        if (this.useProof) {
            if (algorithm === undefined || publicKeyId === undefined) {
                throw new Error('Signature is needed fow JWT-X.');
            } else {
                const header = {
                    alg: algorithm.labelJWS,
                    typ: 'JWT-X',
                    kid: publicKeyId
                };
                const stringified = JSON.stringify(header);
                return base64_url__WEBPACK_IMPORTED_MODULE_0__["encode"](stringified, 'utf-8');
            }
        } else {
            return super.serializeHeader(algorithm, publicKeyId);
        }
    }
    /**
     * Serializes the proof into JWT-X.
     */
    serializeProof() {
        const stringified = JSON.stringify(this.proof);
        return base64_url__WEBPACK_IMPORTED_MODULE_0__["encode"](stringified, 'utf-8');
    }
}
/**
 * Helper class for deserializing GetStatus response.
 * fixme: Ontology node changed the response
 */
class GetStatusResponse {
    static deserialize(r) {
        const response = new GetStatusResponse();
        if (r.Result !== undefined && r.Result.Result === '') {
            response.status = Status.NOTFOUND;
            return response;
        }
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_5__["StringReader"](r.Result.Result);
        sr.read(1); // data type
        sr.readNextLen(); // data length
        sr.read(1); // data type
        const claimId = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["hexstr2str"])(sr.readNextBytes());
        sr.read(1); // data type
        const issuerId = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["hexstr2str"])(sr.readNextBytes());
        sr.read(1); // data type
        const subjectId = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["hexstr2str"])(sr.readNextBytes());
        sr.read(1); // data type
        let status = sr.readNextBytes();
        response.claimId = claimId;
        response.issuerId = issuerId;
        response.subjectId = subjectId;
        if (!status) {
            // status is revoked
            status = '00';
        }
        response.status = status;
        return response;
    }
}
var Status;
(function (Status) {
    Status["REVOKED"] = "00";
    Status["ATTESTED"] = "01";
    Status["NOTFOUND"] = "-1";
})(Status || (Status = {}));

/***/ }),

/***/ "./src/claim/index.ts":
/*!****************************!*\
  !*** ./src/claim/index.ts ***!
  \****************************/
/*! exports provided: Claim, RevocationType, Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _claim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./claim */ "./src/claim/claim.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Claim", function() { return _claim__WEBPACK_IMPORTED_MODULE_0__["Claim"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RevocationType", function() { return _claim__WEBPACK_IMPORTED_MODULE_0__["RevocationType"]; });

/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message */ "./src/claim/message.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return _message__WEBPACK_IMPORTED_MODULE_1__["Message"]; });

/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */



/***/ }),

/***/ "./src/claim/message.ts":
/*!******************************!*\
  !*** ./src/claim/message.ts ***!
  \******************************/
/*! exports provided: Message, retrievePublicKey, retrievePublicKeyState, extractOntId, extractKeyId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retrievePublicKey", function() { return retrievePublicKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retrievePublicKeyState", function() { return retrievePublicKeyState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractOntId", function() { return extractOntId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractKeyId", function() { return extractKeyId; });
/* harmony import */ var base64_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base64-url */ "base64-url");
/* harmony import */ var base64_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(base64_url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../crypto */ "./src/crypto/index.ts");
/* harmony import */ var _network_rest_restClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../network/rest/restClient */ "./src/network/rest/restClient.ts");
/* harmony import */ var _smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../smartcontract/nativevm/ontidContractTxBuilder */ "./src/smartcontract/nativevm/ontidContractTxBuilder.ts");
/* harmony import */ var _transaction_ddo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../transaction/ddo */ "./src/transaction/ddo.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */







/**
 * Common representation of Message in JWT form.
 */
class Message {
    /**
     * Deserializes the message from JWT format.
     *
     * A concrete instance will be creater through the message factory method. This method
     * is called from concrete class.
     *
     * @param jwt Encoded message
     * @param creator Factory method
     */
    static deserializeInternal(jwt, creator) {
        const parts = jwt.split('.', 3);
        if (parts.length < 2) {
            throw new Error('Invalid message.');
        }
        const header = Message.deserializeHeader(parts[0]);
        const payload = Message.deserializePayload(parts[1]);
        let signature;
        if (parts.length > 2) {
            if (header.algorithm !== undefined && header.publicKeyId !== undefined) {
                signature = _crypto__WEBPACK_IMPORTED_MODULE_2__["Signature"].deserializeJWT(parts[2], header.algorithm, header.publicKeyId);
            } else {
                throw new Error('Signature scheme was not specified.');
            }
        }
        const msg = creator(payload.metadata, signature);
        msg.payloadFromJSON(payload.rest);
        return msg;
    }
    /**
     * Deserializes payload part of JWT message.
     *
     * @param encoded JWT encoded payload
     */
    static deserializePayload(encoded) {
        const stringified = base64_url__WEBPACK_IMPORTED_MODULE_0__["decode"](encoded);
        const _JSON$parse = JSON.parse(stringified),
              { jti, iss, sub, iat, exp } = _JSON$parse,
              rest = _objectWithoutProperties(_JSON$parse, ['jti', 'iss', 'sub', 'iat', 'exp']);
        return {
            metadata: {
                messageId: jti,
                issuer: iss,
                subject: sub,
                issuedAt: iat,
                expireAt: exp
            },
            rest
        };
    }
    /**
     * Deserializes the header from JWT encoded header.
     *
     * @param encoded JWT encoded header
     */
    static deserializeHeader(encoded) {
        const stringified = base64_url__WEBPACK_IMPORTED_MODULE_0__["decode"](encoded);
        const header = JSON.parse(stringified);
        return {
            algorithm: header.alg !== undefined ? _crypto__WEBPACK_IMPORTED_MODULE_2__["SignatureScheme"].fromLabelJWS(header.alg) : undefined,
            publicKeyId: header.kid
        };
    }
    constructor(metadata, signature) {
        this.metadata = metadata;
        this.signature = signature;
        if (this.metadata.messageId === undefined) {
            this.metadata.messageId = uuid__WEBPACK_IMPORTED_MODULE_1__();
        }
    }
    /**
     * Signs the message and store the signature inside the request.
     *
     * If the algorithm is not specified, then default algorithm for Private key type is used.
     *
     * @param url Restful endpoint of Ontology node
     * @param publicKeyId The ID of a signature public key
     * @param privateKey Private key to sign the request with
     * @param algorithm Signature algorithm used
     */
    async sign(url, publicKeyId, privateKey, algorithm) {
        await retrievePublicKey(publicKeyId, url);
        if (algorithm === undefined) {
            algorithm = privateKey.algorithm.defaultSchema;
        }
        const msg = this.serializeUnsigned(algorithm, publicKeyId);
        this.signature = await privateKey.signAsync(msg, algorithm, publicKeyId);
    }
    /**
     * Verifies the signature and check ownership of specified ONT ID through smart contract call.
     *
     * @param url Restful endpoint of Ontology node
     * @returns Boolean if the ownership is confirmed
     */
    async verify(url) {
        const signature = this.signature;
        if (signature !== undefined && signature.publicKeyId !== undefined) {
            try {
                if (!this.verifyKeyOwnership()) {
                    return false;
                }
                if (!this.verifyExpiration()) {
                    return false;
                }
                const state = await retrievePublicKeyState(signature.publicKeyId, url);
                if (state === _crypto__WEBPACK_IMPORTED_MODULE_2__["PublicKeyStatus"].REVOKED) {
                    return false;
                }
                const publicKey = await retrievePublicKey(signature.publicKeyId, url);
                const msg = this.serializeUnsigned(signature.algorithm, signature.publicKeyId);
                return publicKey.verify(msg, signature);
            } catch (e) {
                return false;
            }
        } else {
            return false;
        }
    }
    /**
     * Serializes the message without signature into JWT format.
     *
     * Header might contain algorithm and public key id.
     *
     * @param algorithm Signature algorithm used
     * @param publicKeyId The ID of a signature public key
     */
    serializeUnsigned(algorithm, publicKeyId) {
        const headerEncoded = this.serializeHeader(algorithm, publicKeyId);
        const payloadEncoded = this.serializePayload();
        return headerEncoded + '.' + payloadEncoded;
    }
    /**
     * Serializes the message into JWT format.
     *
     */
    serialize() {
        const signature = this.signature;
        if (signature !== undefined) {
            const signatureEncoded = signature.serializeJWT();
            return this.serializeUnsigned(signature.algorithm, signature.publicKeyId) + '.' + signatureEncoded;
        } else {
            return this.serializeUnsigned();
        }
    }
    /**
     * Serializes the header into JWT encoded header.
     *
     * @param algorithm Signature algorithm used
     * @param publicKeyId The ID of a signature public key
     */
    serializeHeader(algorithm, publicKeyId) {
        let header;
        if (algorithm !== undefined) {
            header = {
                alg: algorithm.labelJWS,
                typ: 'JWT',
                kid: publicKeyId
            };
        } else {
            header = {
                typ: 'JWT'
            };
        }
        const stringified = JSON.stringify(header);
        return base64_url__WEBPACK_IMPORTED_MODULE_0__["encode"](stringified, 'utf-8');
    }
    /**
     * Verifies if the expiration date has passed
     */
    verifyExpiration() {
        if (this.metadata.expireAt !== undefined) {
            return Object(_utils__WEBPACK_IMPORTED_MODULE_6__["now"])() < this.metadata.expireAt;
        } else {
            return true;
        }
    }
    /**
     * Verifies if the declared public key id belongs to issuer.
     */
    verifyKeyOwnership() {
        const signature = this.signature;
        if (signature !== undefined && signature.publicKeyId !== undefined) {
            const ontId = extractOntId(signature.publicKeyId);
            return ontId === this.metadata.issuer;
        } else {
            return false;
        }
    }
    /**
     * Serializes payload part of JWT message.
     */
    serializePayload() {
        const metadata = {
            jti: this.metadata.messageId,
            iss: this.metadata.issuer,
            sub: this.metadata.subject,
            iat: this.metadata.issuedAt,
            exp: this.metadata.expireAt
        };
        const rest = this.payloadToJSON();
        const stringified = JSON.stringify(_extends({}, metadata, rest));
        return base64_url__WEBPACK_IMPORTED_MODULE_0__["encode"](stringified, 'utf-8');
    }
}
/**
 * Gets the public key associated with ONT ID from blockchain.
 *
 * @param publicKeyId The ID of a signature public key
 * @param url Restful endpoint of Ontology node
 */
async function retrievePublicKey(publicKeyId, url) {
    const ontId = extractOntId(publicKeyId);
    const keyId = extractKeyId(publicKeyId);
    const client = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_3__["default"](url);
    const tx = Object(_smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_4__["buildGetDDOTx"])(ontId);
    const response = await client.sendRawTransaction(tx.serialize(), true);
    if (response.Result && response.Result.Result) {
        const ddo = _transaction_ddo__WEBPACK_IMPORTED_MODULE_5__["DDO"].deserialize(response.Result.Result);
        const publicKey = ddo.publicKeys.find(pk => pk.id === keyId);
        if (publicKey === undefined) {
            throw new Error('Not found');
        }
        return publicKey.pk;
    } else {
        throw new Error('Not found');
    }
}
/**
 * Gets the state of public key associated with ONT ID from blockchain.
 *
 * @param publicKeyId The ID of a signature public key
 * @param url Restful endpoint of Ontology node
 */
async function retrievePublicKeyState(publicKeyId, url) {
    const ontId = extractOntId(publicKeyId);
    const keyId = extractKeyId(publicKeyId);
    const client = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_3__["default"](url);
    const tx = Object(_smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_4__["buildGetPublicKeyStateTx"])(ontId, keyId);
    const response = await client.sendRawTransaction(tx.serialize(), true);
    if (response.Result && response.Result.Result) {
        return _crypto__WEBPACK_IMPORTED_MODULE_2__["PublicKeyStatus"].fromHexLabel(response.Result.Result);
    } else {
        throw new Error('Not found');
    }
}
/**
 * Extracts ONT ID from public key Id.
 *
 * @param publicKeyId The ID of a signature public key
 */
function extractOntId(publicKeyId) {
    const index = publicKeyId.indexOf('#keys-');
    if (index === -1) {
        throw new Error('Is not a publicKeId.');
    }
    return publicKeyId.substr(0, index);
}
/**
 * Extracts key id from public key Id.
 *
 * @param publicKeyId The ID of a signature public key
 */
function extractKeyId(publicKeyId) {
    const index = publicKeyId.indexOf('#keys-');
    if (index === -1) {
        throw new Error('Is not a publicKeId.');
    }
    // return num2hexstring(
    //     Number(publicKeyId.substr(index + '#keys-'.length))
    // );
    return Number(publicKeyId.substr(index + '#keys-'.length));
}

/***/ }),

/***/ "./src/common/bigInt.ts":
/*!******************************!*\
  !*** ./src/common/bigInt.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BigInt; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var long__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! long */ "long");
/* harmony import */ var long__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(long__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../error */ "./src/error.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils */ "./src/utils.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/




// const SIZE = 8;
/**
 * Big positive integer base on BigNumber
 */
class BigInt {
    /**
     * Create BigInt from string
     * @param hex Byte string value
     */
    static fromHexstr(hex) {
        hex = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["reverseHex"])(hex);
        const bi = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](hex, 16).toString();
        return new BigInt(bi);
    }
    constructor(value) {
        const bi = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](value);
        if (!bi.isInteger() || bi.isNegative()) {
            throw _error__WEBPACK_IMPORTED_MODULE_2__["ERROR_CODE"].INVALID_PARAMS;
        }
        this.value = value;
    }
    /**
     * Create hex string from BigInt
     */
    toHexstr() {
        const bi = long__WEBPACK_IMPORTED_MODULE_1__["fromValue"](this.value);
        const hex = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["bigIntToBytes"])(bi);
        return hex;
    }
}

/***/ }),

/***/ "./src/common/fixed64.ts":
/*!*******************************!*\
  !*** ./src/common/fixed64.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Fixed64; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/


const Fixed64Size = 8;
class Fixed64 {
    static deserialize(sr) {
        const f = new Fixed64();
        let v = sr.read(8);
        // f.value = hexstr2str(v)
        v = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["reverseHex"])(v);
        while (v.substr(0, 2) === '00') {
            v = v.substring(2);
        }
        f.value = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](v, 16).toString();
        return f;
    }
    constructor(value) {
        if (value && value.length > 16 || value && !/^[0-9]\d*$/.test(value)) {
            throw new Error('Invalid value.' + value);
        }
        this.value = value || '0000000000000000';
    }
    serialize() {
        // return str2hexstr(this.value)
        let hexstring = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](this.value).toString(16);
        const size = Fixed64Size * 2;
        hexstring = hexstring.length % size === 0 ? hexstring : ('0'.repeat(size) + hexstring).substring(hexstring.length);
        hexstring = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["reverseHex"])(hexstring);
        return hexstring;
    }
}

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/*! exports provided: ADDR_VERSION, DEFAULT_SCRYPT, OEP_HEADER, OEP_FLAG, WEBVIEW_SCHEME, DEFAULT_ALGORITHM, DEFAULT_SM2_ID, TEST_NODE, MAIN_NODE, HTTP_REST_PORT, HTTP_WS_PORT, HTTP_JSON_PORT, REST_API, ONT_NETWORK, TEST_ONT_URL, MAIN_ONT_URL, TOKEN_TYPE, DEFAULT_GAS_LIMIT, NATIVE_INVOKE_NAME, TX_MAX_SIG_SIZE, ONT_BIP44_PATH, UNBOUND_GENERATION_AMOUNT, UNBOUND_TIME_INTERVAL, ONT_TOTAL_SUPPLY, GENESIS_BLOCK_TIMESTAMP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDR_VERSION", function() { return ADDR_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SCRYPT", function() { return DEFAULT_SCRYPT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OEP_HEADER", function() { return OEP_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OEP_FLAG", function() { return OEP_FLAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEBVIEW_SCHEME", function() { return WEBVIEW_SCHEME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ALGORITHM", function() { return DEFAULT_ALGORITHM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SM2_ID", function() { return DEFAULT_SM2_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEST_NODE", function() { return TEST_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAIN_NODE", function() { return MAIN_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTP_REST_PORT", function() { return HTTP_REST_PORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTP_WS_PORT", function() { return HTTP_WS_PORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTP_JSON_PORT", function() { return HTTP_JSON_PORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REST_API", function() { return REST_API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONT_NETWORK", function() { return ONT_NETWORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEST_ONT_URL", function() { return TEST_ONT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAIN_ONT_URL", function() { return MAIN_ONT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_TYPE", function() { return TOKEN_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_GAS_LIMIT", function() { return DEFAULT_GAS_LIMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NATIVE_INVOKE_NAME", function() { return NATIVE_INVOKE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TX_MAX_SIG_SIZE", function() { return TX_MAX_SIG_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONT_BIP44_PATH", function() { return ONT_BIP44_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNBOUND_GENERATION_AMOUNT", function() { return UNBOUND_GENERATION_AMOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNBOUND_TIME_INTERVAL", function() { return UNBOUND_TIME_INTERVAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONT_TOTAL_SUPPLY", function() { return ONT_TOTAL_SUPPLY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GENESIS_BLOCK_TIMESTAMP", function() { return GENESIS_BLOCK_TIMESTAMP; });
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
// export const ADDR_VERSION = '41';
const ADDR_VERSION = '17';
const DEFAULT_SCRYPT = {
    cost: 4096,
    blockSize: 8,
    parallel: 8,
    size: 64
};
// specified by oep, same as bip38
const OEP_HEADER = '0142';
const OEP_FLAG = 'e0';
// Ont://nativeMethod?param1=xxx&param2=yyy
const WEBVIEW_SCHEME = 'Ont';
const DEFAULT_ALGORITHM = {
    algorithm: 'ECDSA',
    parameters: {
        curve: 'P-256' // also called secp256r1
    }
};
const DEFAULT_SM2_ID = '1234567812345678';
const TEST_NODE = 'polaris1.ont.io'; // 0.9
// export const TEST_NODE = '139.219.129.26'; // 0.81
// export const TEST_NODE = '192.168.50.74';
// export const TEST_NODE = '127.0.0.1';
const MAIN_NODE = 'dappnode1.ont.io';
const HTTP_REST_PORT = '20334';
const HTTP_WS_PORT = '20335';
const HTTP_JSON_PORT = '20336';
const REST_API = {
    getBalance: '/api/v1/balance',
    sendRawTx: '/api/v1/transaction',
    getMerkleProof: '/api/v1/merkleproof' // end with /txHash
};
const ONT_NETWORK = {
    MAIN: 'MainNet',
    TEST: 'TestNet'
};
const TEST_ONT_URL = {
    SOCKET_URL: `ws://${TEST_NODE}:${HTTP_WS_PORT}`,
    RPC_URL: `http://${TEST_NODE}:${HTTP_JSON_PORT}`,
    REST_URL: `http://${TEST_NODE}:${HTTP_REST_PORT}`,
    sendRawTxByRestful: `http://${TEST_NODE}:${HTTP_REST_PORT}${REST_API.sendRawTx}`
};
const MAIN_ONT_URL = {
    SOCKET_URL: `ws://${MAIN_NODE}:${HTTP_WS_PORT}`,
    RPC_URL: `http://${MAIN_NODE}:${HTTP_JSON_PORT}/`,
    REST_URL: `http://${MAIN_NODE}:${HTTP_REST_PORT}/`,
    sendRawTxByRestful: `http://${TEST_NODE}:${HTTP_REST_PORT}${REST_API.sendRawTx}`
};
const TOKEN_TYPE = {
    ONT: 'ONT',
    ONG: 'ONG'
};
const DEFAULT_GAS_LIMIT = 30000;
const NATIVE_INVOKE_NAME = 'Ontology.Native.Invoke';
const TX_MAX_SIG_SIZE = 16;
// tslint:disable-next-line:quotemark
const ONT_BIP44_PATH = "m/44'/1024'/0'/0/0";
const UNBOUND_GENERATION_AMOUNT = [5, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const UNBOUND_TIME_INTERVAL = 31536000;
const ONT_TOTAL_SUPPLY = 1000000000;
const GENESIS_BLOCK_TIMESTAMP = 1530316800;

/***/ }),

/***/ "./src/crypto/AnonymousCredential.ts":
/*!*******************************************!*\
  !*** ./src/crypto/AnonymousCredential.ts ***!
  \*******************************************/
/*! exports provided: Issuer, User, CryptoSuite, CryptoBase, SecretKey, IssuerPublicKey, Credential */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Issuer", function() { return Issuer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CryptoSuite", function() { return CryptoSuite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CryptoBase", function() { return CryptoBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecretKey", function() { return SecretKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IssuerPublicKey", function() { return IssuerPublicKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Credential", function() { return Credential; });
/* harmony import */ var milagro_crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! milagro-crypto-js */ "milagro-crypto-js");
/* harmony import */ var milagro_crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(milagro_crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * Issuer
 *  Issuer in Anonymous Credential
 */
class Issuer {
    constructor(curve) {
        this.param = new CryptoSuite(curve);
        this.sk = new SecretKey(this.param);
    }
    /* GenerateSk():SecretKey
     *  generate a random secret key
     */
    GenerateSk() {
        this.sk.Rand();
        return this.sk;
    }
    /* GenerateKeyPair()
     *  generate a random secret key
     */
    GenerateKeyPair() {
        this.sk = SecretKey.GenerateSk(this.param);
        this.pk = this.sk.GenerateIssuerPublicKey();
    }
    /* SetAttributeSet(AttributeName:string[])
     *  generate a random secret key
     */
    SetAttributeSet(AttributeName) {
        this.AttributeName = AttributeName;
        this.pk.GenerateAttr(AttributeName);
    }
    /* Sign(Nym, attrs):Credential
     *  sign a credential for a user
     */
    Sign(Nym, attrs) {
        // random e, s
        const e = this.param.getRandBN();
        const s = this.param.getRandBN();
        const B = new this.param.ECP(); // B = g1 · HRand^s · Nym · MulAll(HAttrs[i]^(Attrs[i]))
        B.copy(this.param.g1);
        B.add(this.param.PAIR.G1mul(this.pk.h0, s));
        B.add(Nym);
        for (let i = 0; i < this.pk.attr.length; i++) {
            B.add(this.param.PAIR.G1mul(this.pk.h[i], attrs[i]));
        }
        let A = new this.param.ECP(); // A = B^(1/(e+x))
        const tmp = new this.param.BIG(); // tmp = (1/(e+x))
        tmp.copy(e);
        tmp.add(this.sk.value); // !!!!!!!!!!!
        tmp.invmodp(this.param.order);
        A = this.param.PAIR.G1mul(B, tmp);
        const cred = new Credential(this.param);
        cred.Set(A, B, e, s, attrs);
        return cred;
    }
    /* GetPk()
     *  get issuer's public key
     */
    GetPk() {
        return IssuerPublicKey.COPY(this.pk);
    }
    /* GenerateSk():SecretKey
     *  generate a random secret key
     */
    GenerateNonce() {
        const nonce = this.param.getRandBN();
        return nonce;
    }
    VerifyCredentialRequest(CR) {
        return this.pk.VerifyCredentialRequest(CR);
    }
}
/**
 * User
 *  An user in Anonymous Credential
 *  Prover and Verifier are all user.
 */
class User {
    constructor(curve) {
        this.param = new CryptoSuite(curve);
    }
    /* GenerateSk():SecretKey
     *  generate a random secret key
     */
    GenerateSk() {
        this.sk = SecretKey.GenerateSk(this.param);
        return this.sk;
    }
    /* SetIpk(ipk:IssuerPublicKey)
     *  save issuer's public key
     */
    SetIpk(ipk) {
        this.ipk = IssuerPublicKey.COPY(ipk);
    }
    GenerateCrendentialRequest(nonce) {
        if (this.ipk === undefined) {
            // tslint:disable-next-line:no-console
            console.log('Please set ipk first.');
            return;
        }
        const ipk = this.ipk;
        const Nym = this.param.PAIR.G1mul(ipk.h_sk, this.sk.value); // Nym
        const r = this.param.getRandBN(); // r
        const t1 = this.param.PAIR.G1mul(ipk.h_sk, r); // t1
        const C = this.param.hashToBN(t1, ipk.h_sk, Nym, nonce);
        const S = this.param.BIG.modmul(C, this.sk.value, this.param.order);
        S.add(r);
        S.mod(this.param.order);
        const pi = {
            C,
            S
        };
        const attrs = this.param.genAttrBN(ipk.attr);
        this.Nym = Nym;
        this.attrs = attrs;
        const CR = {
            Nym,
            pi,
            nonce,
            attrs
        };
        return CR;
    }
    VerifyBBSplus(Cred) {
        // pk   <- ipk.w
        // m    <- attrs
        // sig  <- (A,E,s)
        // check if
        // e(A, g2^E * pk) == e(B, g2)
        // and if
        // B == g1 * HRand^s * Nym * (h1^m1 * ... * hL^mL)
        const wg2e = new this.param.ECP2();
        wg2e.copy(this.ipk.w);
        wg2e.add(this.param.PAIR.G2mul(this.param.g2, Cred.sig.e));
        wg2e.affine(); // ~!!!!use affine() after ECP's mul operation, for pairing.
        const A = new this.param.ECP();
        A.copy(Cred.sig.A);
        A.affine();
        let left = this.param.PAIR.ate(wg2e, A);
        left = this.param.PAIR.fexp(left);
        const B = new this.param.ECP();
        B.copy(this.param.g1);
        B.add(this.param.PAIR.G1mul(this.ipk.h0, Cred.sig.s));
        B.add(this.Nym);
        for (let i = 0; i < Cred.attrs.length; i++) {
            B.add(this.param.PAIR.G1mul(this.ipk.h[i], Cred.attrs[i]));
        }
        B.affine();
        let right = this.param.PAIR.ate(this.param.g2, B);
        right = this.param.PAIR.fexp(right);
        return left.equals(right);
    }
    SetCredential(Cred) {
        this.Cred = new Credential(this.param);
        this.Cred.Copy(Cred);
        return true;
    }
    Prove(D) {
        const ipk = this.ipk;
        const Cred = this.Cred;
        const r1 = this.param.getRandBN(); // r1
        const A_ = this.param.PAIR.G1mul(Cred.sig.A, r1); // A'
        const r3 = new this.param.BIG(0); // r3
        r3.copy(r1);
        r3.invmodp(this.param.order);
        // tslint:disable-next-line:variable-name
        let _e = new this.param.BIG(0); // -e
        _e.copy(Cred.sig.e);
        _e = this.param.BIG.modneg(_e, this.param.order);
        const _A = this.param.PAIR.G1mul(A_, _e); // _A
        _A.add(this.param.PAIR.G1mul(Cred.sig.B, r1));
        const r2 = this.param.getRandBN(); // r2
        // tslint:disable-next-line:variable-name
        let _r2 = new this.param.BIG(0); // -r2
        _r2.copy(r2);
        _r2 = this.param.BIG.modneg(_r2, this.param.order);
        const B_ = this.param.PAIR.G1mul(Cred.sig.B, r1); // B'
        B_.add(this.param.PAIR.G1mul(ipk.h0, _r2));
        // tslint:disable-next-line:variable-name
        let s_ = this.param.BIG.modmul(r2, r3, this.param.order); // s'
        s_ = this.param.BIG.modneg(s_, this.param.order);
        s_.add(Cred.sig.s);
        s_.mod(this.param.order);
        // tslint:disable-next-line:variable-name
        const r_a = []; // r_a[]
        for (let i = 0; i < D.length; i++) {
            if (D[i] === 0) {
                r_a[i] = this.param.getRandBN();
            } else {
                r_a[i] = false;
            }
        }
        // tslint:disable-next-line:variable-name
        const r_e = this.param.getRandBN();
        // tslint:disable-next-line:variable-name
        const r_r2 = this.param.getRandBN();
        // tslint:disable-next-line:variable-name
        const r_r3 = this.param.getRandBN();
        // tslint:disable-next-line:variable-name
        const r_s_ = this.param.getRandBN();
        // tslint:disable-next-line:variable-name
        const r_sk = this.param.getRandBN();
        const E = this.param.PAIR.G1mul(ipk.h_sk, r_sk); // E
        const t1 = this.param.PAIR.G1mul(A_, r_e); // t1
        t1.add(this.param.PAIR.G1mul(ipk.h0, r_r2));
        const t2 = this.param.PAIR.G1mul(B_, r_r3); // t2
        t2.add(this.param.PAIR.G1mul(ipk.h0, r_s_));
        t2.add(this.param.PAIR.G1mul(E, new this.param.BIG(-1)));
        for (let i = 0; i < r_a.length; i++) {
            if (r_a[i] !== false) {
                t2.add(this.param.PAIR.G1mul(ipk.h[i], r_a[i]));
            }
        }
        // c' = H(A', _A, B', Nym, t1, t2, g1, HRand, h1, ... , hL, w)
        // tslint:disable-next-line:variable-name
        const c_ = this.param.hashToBN(A_, _A, B_, this.Nym, t1, t2, this.param.g1, ipk.h0, ipk.h, ipk.w);
        const nonce = this.param.getRandBN();
        // c = H(nonce, c', (D, I))
        const c = this.param.hashToBN(nonce, c_, D, this.attrs);
        // tslint:disable-next-line:variable-name
        const s_sk = new this.param.BIG(0);
        s_sk.copy(r_sk);
        s_sk.add(this.param.BIG.modmul(c, this.sk.value, this.param.order));
        s_sk.mod(this.param.order);
        // tslint:disable-next-line:variable-name
        const s_a = [];
        for (let i = 0; i < D.length; i++) {
            if (D[i] === 0) {
                s_a[i] = new this.param.BIG(0);
                s_a[i].copy(r_a[i]);
                s_a[i].sub(this.param.BIG.modmul(c, this.attrs[i], this.param.order));
                s_a[i].mod(this.param.order);
            } else {
                s_a[i] = false;
            }
        }
        // tslint:disable-next-line:variable-name
        const s_e = new this.param.BIG(0);
        s_e.copy(r_e);
        s_e.sub(this.param.BIG.modmul(c, Cred.sig.e, this.param.order));
        s_e.mod(this.param.order);
        // tslint:disable-next-line:variable-name
        const s_r2 = new this.param.BIG(0);
        s_r2.copy(r_r2);
        s_r2.add(this.param.BIG.modmul(c, r2, this.param.order));
        s_r2.mod(this.param.order);
        // tslint:disable-next-line:variable-name
        const s_r3 = new this.param.BIG(0);
        s_r3.copy(r_r3);
        s_r3.add(this.param.BIG.modmul(c, r3, this.param.order));
        s_r3.mod(this.param.order);
        // tslint:disable-next-line:variable-name
        const s_s_ = new this.param.BIG(0);
        s_s_.copy(r_s_);
        s_s_.sub(this.param.BIG.modmul(c, s_, this.param.order));
        s_s_.mod(this.param.order);
        const pi = {
            c,
            s_sk,
            s_a,
            s_e,
            s_r2,
            s_r3,
            s_s_,
            nonce
        };
        const proof = {
            A_,
            _A,
            B_,
            Nym: this.Nym,
            pi
        };
        return proof;
    }
    Verify(proof, D, attrs) {
        const ipk = this.ipk;
        // make sure A is not infinity
        const O = new this.param.ECP(0); // Add
        // let O = new this.param.ECP(1); // Muliply
        if (proof.A_.equals(O)) {
            // tslint:disable-next-line:no-console
            console.log('A\' == O return true, verify failed.');
            return false;
        }
        const A_ = new this.param.ECP();
        A_.copy(proof.A_);
        const w = new this.param.ECP2();
        w.copy(ipk.w);
        const _A = new this.param.ECP();
        _A.copy(proof._A);
        const g2Dup = new this.param.ECP2();
        g2Dup.copy(this.param.g2);
        A_.affine();
        w.affine();
        _A.affine();
        g2Dup.affine();
        let left = this.param.PAIR.ate(w, A_);
        let right = this.param.PAIR.ate(g2Dup, _A);
        left = this.param.PAIR.fexp(left);
        right = this.param.PAIR.fexp(right);
        if (!left.equals(right)) {
            // tslint:disable-next-line:no-console
            console.log('e(A\', w) == e(_A, g2) return false, verify failed.');
            return false;
        }
        _A.copy(proof._A);
        // tslint:disable-next-line:variable-name
        const _t1 = this.param.PAIR.G1mul(A_, proof.pi.s_e);
        _t1.add(this.param.PAIR.G1mul(ipk.h0, proof.pi.s_r2));
        _A.sub(proof.B_);
        _t1.add(this.param.PAIR.G1mul(_A, this.param.BIG.modneg(proof.pi.c, this.param.order)));
        // ~t2 : (B')^s_r3 · HRand^s_s' · HSk^(-s_sk) · MulAll(hi^(-s_ai)) · (g1·MulAll(hi^ai))^(-c)
        // tslint:disable-next-line:variable-name
        const _t2 = this.param.PAIR.G1mul(proof.B_, proof.pi.s_r3);
        _t2.add(this.param.PAIR.G1mul(ipk.h0, proof.pi.s_s_));
        _t2.add(this.param.PAIR.G1mul(ipk.h_sk, this.param.BIG.modneg(proof.pi.s_sk, this.param.order)));
        const sum = new this.param.ECP();
        sum.copy(this.param.g1);
        for (let i = 0; i < D.length; i++) {
            if (D[i] === 0) {
                _t2.add(this.param.PAIR.G1mul(ipk.h[i], proof.pi.s_a[i]));
            } else {
                sum.add(this.param.PAIR.G1mul(ipk.h[i], attrs[i]));
            }
        }
        _t2.add(this.param.PAIR.G1mul(sum, this.param.BIG.modneg(proof.pi.c, this.param.order)));
        const c1 = this.param.hashToBN(proof.A_, proof._A, proof.B_, proof.Nym, _t1, _t2, this.param.g1, ipk.h0, ipk.h, ipk.w);
        const c2 = this.param.hashToBN(proof.pi.nonce, c1, D, attrs);
        if (this.param.BIG.comp(c2, proof.pi.c) !== 0) {
            // tslint:disable-next-line:no-console
            console.log(
            // tslint:disable-next-line:max-line-length
            'c == H(nonce, H(A\', _A, B\', Nym, ~t1, ~t2, g1, HRand, h1, ... , hL, w), (D, I)) return false, verify failed.');
            return false;
        }
        return true;
    }
}
/**
 * CryptoSuite
 *  contains everything in Paring Based Cryptography
 */
class CryptoSuite {
    constructor(curve) {
        this.curve = curve;
        this.ctx = new milagro_crypto_js__WEBPACK_IMPORTED_MODULE_0__(curve);
        this.PAIR = this.ctx.PAIR; // Set pairing interface
        this.ECP = this.ctx.ECP; // Set G1 interface
        this.ECP2 = this.ctx.ECP2; // Set G2 interface
        this.BIG = this.ctx.BIG; // Set BN interface
        this.rng = new this.ctx.RAND(); // new random number generator
        this.g1 = this.getG1Generator(); // g1
        this.g2 = this.getG2Generator(); // g2
        this.order = this.getOrder(); // n
    }
    getG1Generator() {
        const g1 = new this.ctx.ECP(0); // new G1
        const x = new this.ctx.BIG(0);
        const y = new this.ctx.BIG(0);
        x.rcopy(this.ctx.ROM_CURVE.CURVE_Gx);
        y.rcopy(this.ctx.ROM_CURVE.CURVE_Gy);
        g1.setxy(x, y);
        return g1;
    }
    getG2Generator() {
        const g2 = new this.ctx.ECP2(0);
        const x = new this.ctx.BIG(0);
        const y = new this.ctx.BIG(0);
        const qx = new this.ctx.FP2(0);
        const qy = new this.ctx.FP2(0);
        x.rcopy(this.ctx.ROM_CURVE.CURVE_Pxa);
        y.rcopy(this.ctx.ROM_CURVE.CURVE_Pxb);
        qx.bset(x, y);
        x.rcopy(this.ctx.ROM_CURVE.CURVE_Pya);
        y.rcopy(this.ctx.ROM_CURVE.CURVE_Pyb);
        qy.bset(x, y);
        g2.setxy(qx, qy);
        return g2;
    }
    getOrder() {
        const r = new this.ctx.BIG(0); // new BN
        r.rcopy(this.ctx.ROM_CURVE.CURVE_Order);
        return r;
    }
    getRandBN() {
        const buf = _utils__WEBPACK_IMPORTED_MODULE_1__["generateRandomArray"](256);
        this.rng.clean();
        this.rng.seed(256, buf);
        const r = this.BIG.randomnum(this.order, this.rng);
        return r;
    }
    getRandG1() {
        const r = this.getRandBN();
        const g = this.PAIR.G1mul(this.g1, r);
        return g;
    }
    getRandG2() {
        const r = this.getRandBN();
        const g = this.PAIR.G2mul(this.g2, r);
        return g;
    }
    hashToBN(...points) {
        let all = [];
        let tmp = [];
        points.forEach(p => {
            if (Array.isArray(p)) {
                if (typeof p[0] === 'number') {
                    all = all.concat(p);
                    tmp = [];
                } else {
                    p.forEach(pp => {
                        pp.toBytes(tmp);
                        all = all.concat(tmp);
                        tmp = [];
                    });
                }
            } else {
                p.toBytes(tmp);
                all = all.concat(tmp);
                tmp = [];
            }
        });
        const H = new this.ctx.HASH256();
        H.process_array(all);
        const R = H.hash();
        const C = this.BIG.fromBytes(R);
        C.mod(this.order);
        return C;
    }
    genAttrBN(attrs) {
        const HAttr = [];
        for (let i = 0; i < attrs.length; i++) {
            const t = this.getRandBN();
            HAttr[i] = t;
        }
        return HAttr;
    }
    genAttrElement(attrs) {
        const HAttr = [];
        for (let i = 0; i < attrs.length; i++) {
            const t = this.getRandG1();
            HAttr[i] = t;
        }
        return HAttr;
    }
}
/**
 * CryptoBase
 *  contains a refrence to a CryptoSuite instance.
 */
class CryptoBase {
    constructor(param) {
        this.param = param;
    }
}
class SecretKey extends CryptoBase {
    /*
     * GenerateSk():SecretKey
     * Generate a random secret key.
     */
    static GenerateSk(param) {
        const x = param.getRandBN(); // isk
        const sk = new SecretKey(param);
        sk.setValue(x);
        return sk;
    }
    constructor(param) {
        super(param);
        this.value = new this.param.BIG(0);
    }
    setValue(v) {
        this.value.copy(v);
    }
    GenerateIssuerPublicKey() {
        const x = this.value;
        const w = this.param.PAIR.G2mul(this.param.g2, x); // w
        let r = this.param.getRandBN(); // random number
        // tslint:disable-next-line:variable-name
        const _g1 = this.param.PAIR.G1mul(this.param.g1, r);
        // tslint:disable-next-line:variable-name
        const _g2 = this.param.PAIR.G1mul(_g1, x);
        // zkp - pi
        r = this.param.getRandBN();
        const t1 = this.param.PAIR.G2mul(this.param.g2, r);
        const t2 = this.param.PAIR.G1mul(_g1, r);
        const C = this.param.hashToBN(t1, t2, this.param.g2, _g1, w, _g2);
        const S = this.param.BIG.modmul(C, x, this.param.order);
        S.add(r);
        S.mod(this.param.order);
        const pi = {
            C,
            S
        };
        const pk = new IssuerPublicKey(this.param);
        pk.SetBasicValue(w, _g1, _g2, pi);
        return pk;
    }
    /*
     * ToBytes()
     *  convert secret key to string format.
     *  TODO:: add serialize function.
     */
    ToBytes() {
        if (this.value === undefined) {
            return '';
        }
        return this.value.toBytes();
    }
    /*
     * FromString(s: any)
     *  convert string to a SecretKey.
     *  TODO:: add unserialize function.
     */
    FromBytes(s) {
        this.value = this.param.BIG.fromBytes(s);
        return this.value.toString();
    }
    /*
     * GenerateSk():SecretKey
     * Generate a random secret key.
     */
    Rand() {
        const x = this.param.getRandBN(); // isk
        this.setValue(x);
    }
}
class IssuerPublicKey extends CryptoBase {
    /*
     * COPY(target: IssuerPublicKey):IssuerPublicKey
     *  copy and return a new public key
     */
    static COPY(target) {
        const pk = new IssuerPublicKey(target.param);
        pk.SetBasicValue(target.w, target._g1, target._g2, target.pi);
        pk.SetAttrValue(target.h0, target.h_sk, target.h, target.attr);
        return pk;
    }
    constructor(param) {
        super(param);
        this.w = new this.param.ECP2();
        this._g1 = new this.param.ECP();
        this._g2 = new this.param.ECP();
        const C = new this.param.BIG();
        const S = new this.param.BIG();
        this.pi = { C, S };
        this.h0 = new this.param.ECP();
        this.h_sk = new this.param.ECP();
        this.attr = [];
    }
    /*
     * SetBasicValue(w, _g1, _g2, pi)
     *  set basic values of the public key
     */
    // tslint:disable-next-line:variable-name
    SetBasicValue(w, _g1, _g2, pi) {
        this.w.copy(w);
        this._g1.copy(_g1);
        this._g2.copy(_g2);
        this.pi.C.copy(pi.C);
        this.pi.S.copy(pi.S);
    }
    /*
     * SetAttrValue(h0, h_sk, h, attr)
     *  set basic values of the public key
     */
    // tslint:disable-next-line:variable-name
    SetAttrValue(h0, h_sk, h, attr) {
        this.h0.copy(h0);
        this.h_sk.copy(h_sk);
        this.h = [];
        this.attr = [];
        for (let i = 0; i < h.length; i++) {
            this.h[i] = new this.param.ECP();
            this.h[i].copy(h[i]);
        }
        for (let i = 0; i < attr.length; i++) {
            this.attr[i] = attr[i];
        }
    }
    /*
     * GenerateAttr(AttributeName)
     *  generates
     *    ipk.h0: rand G1
     *    ipk.h_sk: rand G1
     *    ipk.h[]: Rand G1 array, match to AttributeName
     */
    GenerateAttr(AttributeName) {
        const HAttr = this.param.genAttrElement(AttributeName);
        const h0 = this.param.getRandG1();
        // tslint:disable-next-line:variable-name
        const h_sk = this.param.getRandG1();
        const h = [];
        HAttr.forEach(a => {
            h.push(a);
        });
        this.h0 = h0;
        this.h_sk = h_sk;
        this.h = h;
        this.attr = AttributeName;
    }
    /*
     * VerifyCredentialRequest(Nym, pi, n)
     *  verifies user's credential request
     */
    VerifyCredentialRequest(CR) {
        const C = new this.param.BIG(0);
        C.copy(CR.pi.C);
        // tslint:disable-next-line:variable-name
        const _t1 = this.param.PAIR.G1mul(this.h_sk, CR.pi.S);
        _t1.add(this.param.PAIR.G1mul(CR.Nym, this.param.BIG.modneg(C, this.param.order)));
        const _C = this.param.hashToBN(_t1, this.h_sk, CR.Nym, CR.nonce);
        return this.param.BIG.comp(CR.pi.C, _C) === 0;
    }
}
/**
 * Credential
 *  The credential generated from issuer
 */
class Credential extends CryptoBase {
    constructor(param) {
        super(param);
        const A = new this.param.ECP();
        const B = new this.param.ECP();
        const e = new this.param.BIG();
        const s = new this.param.BIG();
        this.sig = { A, B, e, s };
        this.attrs = [];
    }
    Set(A, B, e, s, attrs) {
        this.sig.A.copy(A);
        this.sig.B.copy(B);
        this.sig.e.copy(e);
        this.sig.s.copy(s);
        for (let i = 0; i < attrs.length; i++) {
            this.attrs[i] = new this.param.BIG();
            this.attrs[i].copy(attrs[i]);
        }
    }
    Copy(target) {
        this.Set(target.sig.A, target.sig.B, target.sig.e, target.sig.s, target.attrs);
    }
}

/***/ }),

/***/ "./src/crypto/CurveLabel.ts":
/*!**********************************!*\
  !*** ./src/crypto/CurveLabel.ts ***!
  \**********************************/
/*! exports provided: CurveLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurveLabel", function() { return CurveLabel; });
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * Elliptic curve used.
 */
class CurveLabel {
    constructor(label, hex, preset) {
        this.label = label;
        this.hex = hex;
        this.preset = preset;
        CurveLabel.values.push(this);
    }
    /**
     * Finds Curvecorresponding to specified hex representation.
     *
     * @param hex Byte hex value
     */
    static fromHex(hex) {
        const item = CurveLabel.values.find(v => v.hex === hex);
        if (item === undefined) {
            throw new Error('Enum value not found');
        }
        return item;
    }
    /**
     * Finds Curve corresponding to specified label representation.
     *
     * @param label Label
     */
    static fromLabel(label) {
        const item = CurveLabel.values.find(v => v.label === label);
        if (item === undefined) {
            throw new Error('Enum value not found');
        }
        return item;
    }
}
CurveLabel.values = [];
CurveLabel.SECP224R1 = new CurveLabel('P-224', 1, 'p224');
CurveLabel.SECP256R1 = new CurveLabel('P-256', 2, 'p256');
CurveLabel.SECP384R1 = new CurveLabel('P-384', 3, 'p384');
CurveLabel.SECP521R1 = new CurveLabel('P-521', 4, 'p521');
CurveLabel.SM2P256V1 = new CurveLabel('sm2p256v1', 20, 'sm2p256v1');
CurveLabel.ED25519 = new CurveLabel('ed25519', 25, 'ed25519');

/***/ }),

/***/ "./src/crypto/Key.ts":
/*!***************************!*\
  !*** ./src/crypto/Key.ts ***!
  \***************************/
/*! exports provided: KeyParameters, Key */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyParameters", function() { return KeyParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Key", function() { return Key; });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto-js */ "crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-sha3 */ "js-sha3");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_sha3__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sm.js */ "sm.js");
/* harmony import */ var sm_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sm_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../consts */ "./src/consts.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _CurveLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CurveLabel */ "./src/crypto/CurveLabel.ts");
/* harmony import */ var _KeyType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./KeyType */ "./src/crypto/KeyType.ts");
/* harmony import */ var _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SignatureScheme */ "./src/crypto/SignatureScheme.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */








/**
 * Specific parameters for the key type.
 */
class KeyParameters {
    /**
     * Create KeyParameters from json.
     * @param json JsonKeyParameters
     */
    static deserializeJson(json) {
        return new KeyParameters(_CurveLabel__WEBPACK_IMPORTED_MODULE_5__["CurveLabel"].fromLabel(json.curve));
    }
    constructor(curve) {
        this.curve = curve;
    }
    /**
     * Serialize KeyParameters to json.
     */
    serializeJson() {
        return {
            curve: this.curve.label
        };
    }
}
/**
 * Common representation of private or public key
 */
class Key {
    /**
     * Creates Key.
     *
     * If no algorithm or parameters are specified, default values will be used.
     * This is strongly discurraged, because it will forbid using other Key types.
     * Therefore use it only for testing.
     *
     * @param key Hex encoded key value
     * @param algorithm Key type
     * @param parameters Parameters of the key type
     */
    constructor(key, algorithm, parameters) {
        this.key = key;
        if (algorithm === undefined) {
            algorithm = _KeyType__WEBPACK_IMPORTED_MODULE_6__["KeyType"].fromLabel(_consts__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_ALGORITHM"].algorithm);
        }
        if (parameters === undefined) {
            parameters = KeyParameters.deserializeJson(_consts__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_ALGORITHM"].parameters);
        }
        this.algorithm = algorithm;
        this.parameters = parameters;
    }
    /**
     * Computes hash of message using hashing function of signature schema.
     *
     * @param msg Hex encoded input data
     * @param scheme Signing schema to use
     */
    computeHash(msg, scheme) {
        switch (scheme) {
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA224:
                return crypto_js__WEBPACK_IMPORTED_MODULE_0__["SHA224"](crypto_js__WEBPACK_IMPORTED_MODULE_0__["enc"].Hex.parse(msg)).toString();
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA256:
                return crypto_js__WEBPACK_IMPORTED_MODULE_0__["SHA256"](crypto_js__WEBPACK_IMPORTED_MODULE_0__["enc"].Hex.parse(msg)).toString();
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA384:
                return crypto_js__WEBPACK_IMPORTED_MODULE_0__["SHA384"](crypto_js__WEBPACK_IMPORTED_MODULE_0__["enc"].Hex.parse(msg)).toString();
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA512:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].EDDSAwithSHA512:
                return crypto_js__WEBPACK_IMPORTED_MODULE_0__["SHA512"](crypto_js__WEBPACK_IMPORTED_MODULE_0__["enc"].Hex.parse(msg)).toString();
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_224:
                return Object(js_sha3__WEBPACK_IMPORTED_MODULE_1__["sha3_224"])(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hexstring2ab"])(msg));
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_256:
                return Object(js_sha3__WEBPACK_IMPORTED_MODULE_1__["sha3_256"])(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hexstring2ab"])(msg));
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_384:
                return Object(js_sha3__WEBPACK_IMPORTED_MODULE_1__["sha3_384"])(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hexstring2ab"])(msg));
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_512:
                return Object(js_sha3__WEBPACK_IMPORTED_MODULE_1__["sha3_512"])(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hexstring2ab"])(msg));
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithRIPEMD160:
                return crypto_js__WEBPACK_IMPORTED_MODULE_0__["RIPEMD160"](crypto_js__WEBPACK_IMPORTED_MODULE_0__["enc"].Hex.parse(msg)).toString();
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].SM2withSM3:
                return new sm_js__WEBPACK_IMPORTED_MODULE_2__["sm3"]().sum(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hexstring2ab"])(msg), 'hex');
            default:
                throw new Error('Unsupported hash algorithm.');
        }
    }
    /**
     * Tests if signing schema is compatible with key type.
     *
     * @param schema Signing schema to use
     */
    isSchemaSupported(schema) {
        switch (schema) {
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA224:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA256:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA384:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA512:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_224:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_256:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_384:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_512:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithRIPEMD160:
                return this.algorithm === _KeyType__WEBPACK_IMPORTED_MODULE_6__["KeyType"].ECDSA;
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].EDDSAwithSHA512:
                return this.algorithm === _KeyType__WEBPACK_IMPORTED_MODULE_6__["KeyType"].EDDSA;
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].SM2withSM3:
                return this.algorithm === _KeyType__WEBPACK_IMPORTED_MODULE_6__["KeyType"].SM2;
            default:
                throw new Error('Unsupported signature schema.');
        }
    }
    /**
     * Gets JSON representation of the Key (Public/Private).
     */
    serializeJson() {
        return {
            algorithm: this.algorithm.label,
            parameters: this.parameters.serializeJson(),
            key: this.key
        };
    }
}

/***/ }),

/***/ "./src/crypto/KeyType.ts":
/*!*******************************!*\
  !*** ./src/crypto/KeyType.ts ***!
  \*******************************/
/*! exports provided: KeyType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyType", function() { return KeyType; });
/* harmony import */ var _SignatureScheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignatureScheme */ "./src/crypto/SignatureScheme.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Type of key. ECDSA is the default one to use.
 */
class KeyType {
    constructor(label, hex, defaultSchema) {
        this.label = label;
        this.hex = hex;
        this.defaultSchema = defaultSchema;
        KeyType.values.push(this);
    }
    /**
     * Finds Key type corresponding to specified hex representation.
     *
     * @param hex Byte hex value
     */
    static fromHex(hex) {
        const item = KeyType.values.find(v => v.hex === hex);
        if (item === undefined) {
            throw new Error('Enum value not found');
        }
        return item;
    }
    /**
     * Finds Key type corresponding to specified label representation.
     *
     * @param label Label
     */
    static fromLabel(label) {
        const item = KeyType.values.find(v => v.label === label);
        if (item === undefined) {
            throw new Error('Enum value not found');
        }
        return item;
    }
}
KeyType.values = [];
KeyType.ECDSA = new KeyType('ECDSA', 0x12, _SignatureScheme__WEBPACK_IMPORTED_MODULE_0__["SignatureScheme"].ECDSAwithSHA256);
KeyType.SM2 = new KeyType('SM2', 0x13, _SignatureScheme__WEBPACK_IMPORTED_MODULE_0__["SignatureScheme"].SM2withSM3);
KeyType.EDDSA = new KeyType('EDDSA', 0x14, _SignatureScheme__WEBPACK_IMPORTED_MODULE_0__["SignatureScheme"].EDDSAwithSHA512);

/***/ }),

/***/ "./src/crypto/PrivateKey.ts":
/*!**********************************!*\
  !*** ./src/crypto/PrivateKey.ts ***!
  \**********************************/
/*! exports provided: PrivateKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivateKey", function() { return PrivateKey; });
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bip39 */ "bip39");
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bip39__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! elliptic */ "elliptic");
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(elliptic__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var secure_random__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! secure-random */ "secure-random");
/* harmony import */ var secure_random__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(secure_random__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var sm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sm.js */ "sm.js");
/* harmony import */ var sm_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sm_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var wif__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wif */ "wif");
/* harmony import */ var wif__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(wif__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../consts */ "./src/consts.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../error */ "./src/error.ts");
/* harmony import */ var _scrypt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../scrypt */ "./src/scrypt.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./address */ "./src/crypto/address.ts");
/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Key */ "./src/crypto/Key.ts");
/* harmony import */ var _KeyType__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./KeyType */ "./src/crypto/KeyType.ts");
/* harmony import */ var _PublicKey__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./PublicKey */ "./src/crypto/PublicKey.ts");
/* harmony import */ var _Signature__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Signature */ "./src/crypto/Signature.ts");
/* harmony import */ var _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./SignatureScheme */ "./src/crypto/SignatureScheme.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */















// tslint:disable-next-line:no-var-requires
const HDKey = __webpack_require__(/*! @ont-community/hdkey-secp256r1 */ "@ont-community/hdkey-secp256r1");
class PrivateKey extends _Key__WEBPACK_IMPORTED_MODULE_10__["Key"] {
    /**
     * Generates random Private key using supplied Key type and parameters.
     *
     * If no Key type or parameters is supplied, default SDK key type with default parameters will be used.
     *
     * @param keyType The key type
     * @param parameters The parameters for the key type
     */
    static random(keyType, parameters) {
        if (keyType === undefined) {
            keyType = _KeyType__WEBPACK_IMPORTED_MODULE_11__["KeyType"].fromLabel(_consts__WEBPACK_IMPORTED_MODULE_5__["DEFAULT_ALGORITHM"].algorithm);
        }
        if (parameters === undefined) {
            parameters = _Key__WEBPACK_IMPORTED_MODULE_10__["KeyParameters"].deserializeJson(_consts__WEBPACK_IMPORTED_MODULE_5__["DEFAULT_ALGORITHM"].parameters);
        }
        return new PrivateKey(Object(_utils__WEBPACK_IMPORTED_MODULE_8__["ab2hexstring"])(secure_random__WEBPACK_IMPORTED_MODULE_2__(32)), keyType, parameters);
    }
    /**
     * Creates PrivateKey from Wallet Import Format (WIF) representation.
     *
     * @param wifkey WIF private key representation
     *
     */
    static deserializeWIF(wifkey) {
        const key = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["ab2hexstring"])(wif__WEBPACK_IMPORTED_MODULE_4__["decode"](wifkey, 128).privateKey);
        return new PrivateKey(key);
    }
    /**
     * Creates PrivateKey from mnemonic according to BIP39 protocol.
     *
     * @param mnemonic Space separated list of words
     *
     */
    static generateFromMnemonic(mnemonic, derivePath = _consts__WEBPACK_IMPORTED_MODULE_5__["ONT_BIP44_PATH"]) {
        if (mnemonic.split(' ').length < 12) {
            throw _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS;
        }
        const seed = bip39__WEBPACK_IMPORTED_MODULE_0__["mnemonicToSeedHex"](mnemonic);
        // generate privateKey
        // const pri = seed.substr(0, 64);
        const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'));
        const pri = hdkey.derive(derivePath);
        const key = Buffer.from(pri.privateKey).toString('hex');
        const privateKey = new PrivateKey(key);
        return privateKey;
    }
    /**
     * Signs the data with supplied private key using signature schema.
     *
     * If the signature schema is not provided, the default schema for this key type is used.
     *
     * This method is not suitable, if external keys (Ledger, TPM, ...) support is required.
     *
     * @param msg Hex encoded input data or Signable object
     * @param schema Signing schema to use
     * @param publicKeyId Id of public key
     */
    sign(msg, schema, publicKeyId) {
        if (schema === undefined) {
            schema = this.algorithm.defaultSchema;
        }
        if (!this.isSchemaSupported(schema)) {
            throw new Error('Signature schema does not match key type.');
        }
        // retrieves content to sign if not provided directly
        if (typeof msg !== 'string') {
            msg = msg.getSignContent();
        }
        let hash;
        if (schema === _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].SM2withSM3) {
            // library sm.js (SM2withSM3) has implemented hashing as part of signing, therefore it is skipped
            hash = msg;
        } else {
            hash = this.computeHash(msg, schema);
        }
        const signed = this.computeSignature(hash, schema);
        return new _Signature__WEBPACK_IMPORTED_MODULE_13__["Signature"](schema, signed, publicKeyId);
    }
    /**
     * Asynchroniously signs the data with supplied private key using signature schema.
     *
     * If the signature schema is not provided, the default schema for this key type is used.
     *
     * This method is suitable, if external keys (Ledger, TPM, ...) support is required.
     *
     * @param msg Hex encoded input data or Signable object
     * @param schema Signing schema to use
     * @param publicKeyId Id of public key
     */
    async signAsync(msg, schema, publicKeyId) {
        return this.sign(msg, schema, publicKeyId);
    }
    /**
     * Derives Public key out of Private key.
     */
    getPublicKey() {
        switch (this.algorithm) {
            case _KeyType__WEBPACK_IMPORTED_MODULE_11__["KeyType"].ECDSA:
                return this.getEcDSAPublicKey();
            case _KeyType__WEBPACK_IMPORTED_MODULE_11__["KeyType"].EDDSA:
                return this.getEdDSAPublicKey();
            case _KeyType__WEBPACK_IMPORTED_MODULE_11__["KeyType"].SM2:
                return this.getSM2PublicKey();
            default:
                throw new Error('Unsupported signature schema.');
        }
    }
    /**
     * Decrypts encrypted private key with supplied password.
     *
     * @param keyphrase Password to decrypt with
     * @param address For aad in decryption
     * @param 16 secure random bytes
     * @param params Optional Scrypt params
     */
    decrypt(keyphrase, address, salt, params) {
        // const decrypted = decrypt(this.key, keyphrase, checksum, params);
        if (salt.length === 24 && Object(_utils__WEBPACK_IMPORTED_MODULE_8__["isBase64"])(salt)) {
            salt = Buffer.from(salt, 'base64').toString('hex');
        }
        const decrypted = Object(_scrypt__WEBPACK_IMPORTED_MODULE_7__["decryptWithGcm"])(this.key, address, salt, keyphrase, params);
        const decryptedKey = new PrivateKey(decrypted, this.algorithm, this.parameters);
        // checkDecrypted(checksum, decryptedKey.getPublicKey().serializeHex());
        const pk = decryptedKey.getPublicKey();
        const addrTmp = _address__WEBPACK_IMPORTED_MODULE_9__["Address"].fromPubKey(pk);
        if (addrTmp.toBase58() !== address.toBase58()) {
            throw _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].Decrypto_ERROR;
        }
        return decryptedKey;
    }
    /**
     * Encrypts private key with supplied password.
     *
     * @param keyphrase Password to encrypt with
     * @param address For aad in encryption
     * @param salt 16 secure random bytes
     * @param params Optional Scrypt params
     */
    encrypt(keyphrase, address, salt, params) {
        // add address check
        const publicKey = this.getPublicKey();
        const addr = _address__WEBPACK_IMPORTED_MODULE_9__["Address"].fromPubKey(publicKey).toBase58();
        if (addr !== address.toBase58()) {
            throw _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_ADDR;
        }
        const encrypted = Object(_scrypt__WEBPACK_IMPORTED_MODULE_7__["encryptWithGcm"])(this.key, address, salt, keyphrase, params);
        return new PrivateKey(encrypted, this.algorithm, this.parameters);
    }
    /**
     * Derives Public key out of Private key using EcDSA algorithm.
     */
    getEcDSAPublicKey() {
        const ec = new elliptic__WEBPACK_IMPORTED_MODULE_1__["ec"](this.parameters.curve.preset);
        const keyPair = ec.keyFromPrivate(this.key, 'hex');
        const pk = keyPair.getPublic(true, 'hex');
        return new _PublicKey__WEBPACK_IMPORTED_MODULE_12__["PublicKey"](pk, this.algorithm, this.parameters);
    }
    /**
     * Derives Public key out of Private key using EdDSA algorithm.
     */
    getEdDSAPublicKey() {
        const eddsa = new elliptic__WEBPACK_IMPORTED_MODULE_1__["eddsa"](this.parameters.curve.preset);
        const keyPair = eddsa.keyFromSecret(this.key, 'hex');
        const pk = keyPair.getPublic(true, 'hex');
        return new _PublicKey__WEBPACK_IMPORTED_MODULE_12__["PublicKey"](pk, this.algorithm, this.parameters);
    }
    /**
     * Derives Public key out of Private key using SM2 algorithm.
     */
    getSM2PublicKey() {
        const keyPair = sm_js__WEBPACK_IMPORTED_MODULE_3__["sm2"].SM2KeyPair(null, this.key);
        const pk = keyPair.pubToString('compress');
        return new _PublicKey__WEBPACK_IMPORTED_MODULE_12__["PublicKey"](pk, this.algorithm, this.parameters);
    }
    /**
     * Computes signature of message hash using specified signature schema.
     *
     * @param hash Message hash
     * @param schema Signature schema to use
     */
    computeSignature(hash, schema) {
        switch (schema) {
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].ECDSAwithSHA224:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].ECDSAwithSHA256:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].ECDSAwithSHA384:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].ECDSAwithSHA512:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].ECDSAwithSHA3_224:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].ECDSAwithSHA3_256:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].ECDSAwithSHA3_384:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].ECDSAwithSHA3_512:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].ECDSAwithRIPEMD160:
                return this.computeEcDSASignature(hash);
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].EDDSAwithSHA512:
                return this.computeEdDSASignature(hash);
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_14__["SignatureScheme"].SM2withSM3:
                return this.computeSM2Signature(hash);
            default:
                throw new Error('Unsupported signature schema.');
        }
    }
    /**
     * Computes EcDSA signature of message hash. Curve name is derrived from private key.
     *
     * @param hash Message hash
     */
    computeEcDSASignature(hash) {
        const ec = new elliptic__WEBPACK_IMPORTED_MODULE_1__["ec"](this.parameters.curve.preset);
        const signed = ec.sign(hash, this.key, { canonical: true });
        return Buffer.concat([signed.r.toArrayLike(Buffer, 'be', 32), signed.s.toArrayLike(Buffer, 'be', 32)]).toString('hex');
    }
    /**
     * Computes EdDSA signature of message hash. Curve name is derrived from private key.
     *
     * @param hash Message hash
     */
    computeEdDSASignature(hash) {
        const eddsa = new elliptic__WEBPACK_IMPORTED_MODULE_1__["eddsa"](this.parameters.curve.preset);
        const signed = eddsa.sign(hash, this.key, null);
        return Buffer.concat([signed.R.toArrayLike(Buffer, 'be', 32), signed.S.toArrayLike(Buffer, 'be', 32)]).toString('hex');
    }
    /**
     * Computes SM2 signature of message hash.
     *
     * Only default SM2 ID is supported.
     *
     * @param hash Message hash
     */
    computeSM2Signature(hash) {
        const keyPair = sm_js__WEBPACK_IMPORTED_MODULE_3__["sm2"].SM2KeyPair(null, this.key);
        const signed = keyPair.sign(Object(_utils__WEBPACK_IMPORTED_MODULE_8__["hexstring2ab"])(hash));
        const id = _consts__WEBPACK_IMPORTED_MODULE_5__["DEFAULT_SM2_ID"];
        return Object(_utils__WEBPACK_IMPORTED_MODULE_8__["str2hexstr"])(id + '\0') + signed.r + signed.s;
    }
    /**
     * Gets Wallet Import Format (WIF) representation of the PrivateKey.
     *
     */
    serializeWIF() {
        return wif__WEBPACK_IMPORTED_MODULE_4__["encode"](128, Buffer.from(this.key, 'hex'), true);
    }
}

/***/ }),

/***/ "./src/crypto/PrivateKeyFactory.ts":
/*!*****************************************!*\
  !*** ./src/crypto/PrivateKeyFactory.ts ***!
  \*****************************************/
/*! exports provided: DefaultKeyDeserializer, registerKeyDeserializer, deserializeFromJson */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultKeyDeserializer", function() { return DefaultKeyDeserializer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerKeyDeserializer", function() { return registerKeyDeserializer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeFromJson", function() { return deserializeFromJson; });
/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Key */ "./src/crypto/Key.ts");
/* harmony import */ var _KeyType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KeyType */ "./src/crypto/KeyType.ts");
/* harmony import */ var _PrivateKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrivateKey */ "./src/crypto/PrivateKey.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */



/**
 * Default private key deserializer.
 */
class DefaultKeyDeserializer {
    getType() {
        return '';
    }
    deserialize(json) {
        if (json.key != null) {
            return new _PrivateKey__WEBPACK_IMPORTED_MODULE_2__["PrivateKey"](json.key, _KeyType__WEBPACK_IMPORTED_MODULE_1__["KeyType"].fromLabel(json.algorithm), _Key__WEBPACK_IMPORTED_MODULE_0__["KeyParameters"].deserializeJson(json.parameters));
        } else {
            throw new Error('Unsupported Key type.');
        }
    }
}
/**
 * Registered key deserializers
 */
const keyDeserializers = [];
const defaultKeyDeserializer = new DefaultKeyDeserializer();
/**
 * Registers new external deserializer for private keys.
 *
 * @param deserializer Deserializer instance
 */
function registerKeyDeserializer(deserializer) {
    keyDeserializers.push(deserializer);
}
/**
 * Creates PrivateKey from Json representation.
 *
 * @param json Json private key representation
 *
 */
function deserializeFromJson(json) {
    if (json.external == null) {
        return defaultKeyDeserializer.deserialize(json);
    } else {
        for (const deserializer of keyDeserializers) {
            if (deserializer.getType() === json.external.type) {
                return deserializer.deserialize(json);
            }
        }
        throw new Error('Unsupported Key type.');
    }
}

/***/ }),

/***/ "./src/crypto/PublicKey.ts":
/*!*********************************!*\
  !*** ./src/crypto/PublicKey.ts ***!
  \*********************************/
/*! exports provided: PublicKey, PublicKeyStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicKey", function() { return PublicKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicKeyStatus", function() { return PublicKeyStatus; });
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! elliptic */ "elliptic");
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(elliptic__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sm.js */ "sm.js");
/* harmony import */ var sm_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sm_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../consts */ "./src/consts.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _CurveLabel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CurveLabel */ "./src/crypto/CurveLabel.ts");
/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Key */ "./src/crypto/Key.ts");
/* harmony import */ var _KeyType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./KeyType */ "./src/crypto/KeyType.ts");
/* harmony import */ var _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SignatureScheme */ "./src/crypto/SignatureScheme.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */








/**
 * Class to manage the public key with some userful functions.
 */
class PublicKey extends _Key__WEBPACK_IMPORTED_MODULE_5__["Key"] {
    /**
     * Creates PublicKey from Hex representation.
     *
     * @param sr String reader
     * @param length Byte length of the serialized object
     *
     */
    static deserializeHex(sr, length = 33) {
        if (length === 33) {
            // ECDSA
            const algorithm = _KeyType__WEBPACK_IMPORTED_MODULE_6__["KeyType"].ECDSA;
            const curve = _CurveLabel__WEBPACK_IMPORTED_MODULE_4__["CurveLabel"].SECP256R1;
            const pk = sr.read(33);
            return new PublicKey(pk, algorithm, new _Key__WEBPACK_IMPORTED_MODULE_5__["KeyParameters"](curve));
        } else {
            const algorithmHex = parseInt(sr.read(1), 16);
            const curveHex = parseInt(sr.read(1), 16);
            const pk = sr.read(length - 2);
            return new PublicKey(pk, _KeyType__WEBPACK_IMPORTED_MODULE_6__["KeyType"].fromHex(algorithmHex), new _Key__WEBPACK_IMPORTED_MODULE_5__["KeyParameters"](_CurveLabel__WEBPACK_IMPORTED_MODULE_4__["CurveLabel"].fromHex(curveHex)));
        }
    }
    /**
     * Verifies if the signature was created with private key corresponding to supplied public key
     * and was not tampered with using signature schema.
     *
     * @param msg Hex encoded input data or Signable object
     * @param signature Signature object
     */
    verify(msg, signature) {
        if (!this.isSchemaSupported(signature.algorithm)) {
            throw new Error('Signature schema does not match key type.');
        }
        // retrieves content to sign if not provided directly
        if (typeof msg !== 'string') {
            msg = msg.getSignContent();
        }
        let hash;
        if (signature.algorithm === _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].SM2withSM3) {
            // library sm.js (SM2withSM3) has implemented hashing as part of verification, therefore it is skipped
            hash = msg;
        } else {
            hash = this.computeHash(msg, signature.algorithm);
        }
        return this.verifySignature(hash, signature.value, signature.algorithm);
    }
    /**
     * Serializes public key to Hex representation.
     *
     * Length definition is not included.
     */
    serializeHex() {
        let result = '';
        switch (this.algorithm) {
            case _KeyType__WEBPACK_IMPORTED_MODULE_6__["KeyType"].ECDSA:
                result += this.key;
                break;
            case _KeyType__WEBPACK_IMPORTED_MODULE_6__["KeyType"].EDDSA:
            case _KeyType__WEBPACK_IMPORTED_MODULE_6__["KeyType"].SM2:
                result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(this.algorithm.hex);
                result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(this.parameters.curve.hex);
                result += this.key;
                break;
        }
        return result;
    }
    /**
     * For internal use.
     * @param hash Message hash
     * @param signature Hex encoded signature
     * @param schema Signature scheme to use
     */
    verifySignature(hash, signature, schema) {
        switch (schema) {
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA224:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA256:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA384:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA512:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_224:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_256:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_384:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithSHA3_512:
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].ECDSAwithRIPEMD160:
                return this.verifyEcDSASignature(hash, signature);
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].EDDSAwithSHA512:
                return this.verifyEdDSASignature(hash, signature);
            case _SignatureScheme__WEBPACK_IMPORTED_MODULE_7__["SignatureScheme"].SM2withSM3:
                return this.verifySM2Signature(hash, signature);
            default:
                throw new Error('Unsupported signature schema.');
        }
    }
    /**
     * Verifies EcDSA signature of message hash. Curve name is derrived from private key.
     *
     * @param hash Message hash
     * @param signature Hex encoded signature
     */
    verifyEcDSASignature(hash, signature) {
        const r = signature.substr(0, 64);
        const s = signature.substr(64, 64);
        const ec = new elliptic__WEBPACK_IMPORTED_MODULE_0__["ec"](this.parameters.curve.preset);
        return ec.verify(hash, { r, s }, this.key, 'hex');
    }
    /**
     * Verifies EdDSA signature of message hash. Curve name is derrived from private key.
     *
     * @param hash Message hash
     * @param signature Hex encoded signature
     */
    verifyEdDSASignature(hash, signature) {
        const r = signature.substr(0, 64);
        const s = signature.substr(64, 64);
        const eddsa = new elliptic__WEBPACK_IMPORTED_MODULE_0__["eddsa"](this.parameters.curve.preset);
        return eddsa.verify(hash, { r, s }, this.key, 'hex');
    }
    /**
     * Verifies SM2 signature of message hash.
     *
     * Only default SM2 ID is supported.
     *
     * @param hash Message hash
     * @param signature Hex encoded signature
     */
    verifySM2Signature(hash, signature) {
        const reader = new _utils__WEBPACK_IMPORTED_MODULE_3__["StringReader"](signature);
        const id = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["hexstr2str"])(reader.readNullTerminated());
        if (id !== _consts__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_SM2_ID"] && id !== '') {
            throw new Error('Unsupported SM2 id used.');
        }
        const r = reader.read(32);
        const s = reader.read(32);
        const keyPair = sm_js__WEBPACK_IMPORTED_MODULE_1__["sm2"].SM2KeyPair(this.key);
        return keyPair.verify(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["hexstring2ab"])(hash), r, s);
    }
}
/**
 * Public key status enumaration.
 */
class PublicKeyStatus {
    constructor(label) {
        this.label = label;
        PublicKeyStatus.values.push(this);
    }
    /**
     * Finds Public key status corresponding to specified label representation.
     *
     * @param label Hex encoded label
     */
    static fromHexLabel(hexLabel) {
        const label = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["hexstr2str"])(hexLabel);
        const item = PublicKeyStatus.values.find(v => v.label === label);
        if (item === undefined) {
            throw new Error('Enum value not found');
        }
        return item;
    }
}
PublicKeyStatus.values = [];
PublicKeyStatus.IN_USE = new PublicKeyStatus('in use');
PublicKeyStatus.REVOKED = new PublicKeyStatus('revoked');

/***/ }),

/***/ "./src/crypto/Signature.ts":
/*!*********************************!*\
  !*** ./src/crypto/Signature.ts ***!
  \*********************************/
/*! exports provided: Signature */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Signature", function() { return Signature; });
/* harmony import */ var base64_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base64-url */ "base64-url");
/* harmony import */ var base64_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(base64_url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _SignatureScheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SignatureScheme */ "./src/crypto/SignatureScheme.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */



/**
 * Signature generated by signing data with Private Key.
 */
class Signature {
    static deserializeJWT(encoded, algorithm, publicKeyId) {
        const decoded = base64_url__WEBPACK_IMPORTED_MODULE_0__["decode"](encoded, 'hex');
        return new Signature(algorithm, decoded, publicKeyId);
    }
    /**
     * Deserializes PgpSignature to Signature.
     * @param pgpSignature PgpSignature
     */
    static deserializePgp(pgpSignature) {
        const value = new Buffer(pgpSignature.Value, 'base64').toString('hex');
        const deserialzedValue = Signature.deserializeHex(value).value;
        return new Signature(_SignatureScheme__WEBPACK_IMPORTED_MODULE_2__["SignatureScheme"].fromLabel(pgpSignature.Algorithm), deserialzedValue);
    }
    /**
     * Deserializes hex representation to Signature
     * @param data hex string
     */
    static deserializeHex(data) {
        if (data.length < 4) {
            throw new Error('Invalid params.');
        }
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_1__["StringReader"](data);
        const scheme = parseInt(sr.read(1), 16);
        const sigScheme = _SignatureScheme__WEBPACK_IMPORTED_MODULE_2__["SignatureScheme"].fromHex(scheme);
        const value = data.substr(2);
        const sig = new Signature(sigScheme, value);
        return sig;
    }
    constructor(algorithm, value, publicKeyId) {
        this.algorithm = algorithm;
        this.value = value;
        this.publicKeyId = publicKeyId;
    }
    /**
     * Serializes signature to Hex representation.
     * For transfer to java backend and verify it.
     */
    serializeHex() {
        let result = '';
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["num2hexstring"])(this.algorithm.hex);
        result += this.value;
        return result;
    }
    /**
     * Serializes signature to PGP representation with optional PublicKeyId.
     *
     * @param keyId Whole Public Key Id in the form <ONTID>#keys-<id>
     */
    serializePgp(keyId) {
        const encoded = new Buffer(this.serializeHex(), 'hex').toString('base64');
        return {
            PublicKeyId: keyId,
            Format: 'pgp',
            Value: encoded,
            Algorithm: this.algorithm.label
        };
    }
    /**
     * Serializes signature to base64url format.
     */
    serializeJWT() {
        return base64_url__WEBPACK_IMPORTED_MODULE_0__["encode"](this.value, 'hex');
    }
}

/***/ }),

/***/ "./src/crypto/SignatureScheme.ts":
/*!***************************************!*\
  !*** ./src/crypto/SignatureScheme.ts ***!
  \***************************************/
/*! exports provided: SignatureScheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureScheme", function() { return SignatureScheme; });
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * Schema used during signing and verification of signature.
 */
class SignatureScheme {
    constructor(label, hex, labelJWS) {
        this.label = label;
        this.hex = hex;
        this.labelJWS = labelJWS;
        SignatureScheme.values.push(this);
    }
    /**
     * Finds Signature schema corresponding to specified hex representation.
     *
     * @param hex Byte hex value
     */
    static fromHex(hex) {
        const item = SignatureScheme.values.find(v => v.hex === hex);
        if (item === undefined) {
            throw new Error('Enum value not found');
        }
        return item;
    }
    /**
     * Finds Signature schema corresponding to specified label representation.
     *
     * @param label Label
     */
    static fromLabel(label) {
        const item = SignatureScheme.values.find(v => v.label === label);
        if (item === undefined) {
            throw new Error('Enum value not found');
        }
        return item;
    }
    /**
     * Finds Signature schema corresponding to specified label representation in JWS.
     *
     * @param label Label
     */
    static fromLabelJWS(label) {
        const item = SignatureScheme.values.find(v => v.labelJWS === label);
        if (item === undefined) {
            throw new Error('Enum value not found');
        }
        return item;
    }
}
SignatureScheme.values = [];
SignatureScheme.ECDSAwithSHA224 = new SignatureScheme('SHA224withECDSA', 0, 'ES224');
SignatureScheme.ECDSAwithSHA256 = new SignatureScheme('SHA256withECDSA', 1, 'ES256');
SignatureScheme.ECDSAwithSHA384 = new SignatureScheme('SHA384withECDSA', 2, 'ES384');
SignatureScheme.ECDSAwithSHA512 = new SignatureScheme('SHA512withECDSA', 3, 'ES512');
// tslint:disable-next-line:variable-name
SignatureScheme.ECDSAwithSHA3_224 = new SignatureScheme('SHA3-224withECDSA', 4, 'ES3-224');
// tslint:disable-next-line:variable-name
SignatureScheme.ECDSAwithSHA3_256 = new SignatureScheme('SHA3-256withECDSA', 5, 'ES3-256');
// tslint:disable-next-line:variable-name
SignatureScheme.ECDSAwithSHA3_384 = new SignatureScheme('SHA3-384withECDSA', 6, 'ES3-384');
// tslint:disable-next-line:variable-name
SignatureScheme.ECDSAwithSHA3_512 = new SignatureScheme('SHA3-512withECDSA', 7, 'ES3-512');
SignatureScheme.ECDSAwithRIPEMD160 = new SignatureScheme('RIPEMD160withECDSA', 8, 'ER160');
SignatureScheme.SM2withSM3 = new SignatureScheme('SM3withSM2', 9, 'SM');
SignatureScheme.EDDSAwithSHA512 = new SignatureScheme('SHA512withEdDSA', 10, 'EDS512');

/***/ }),

/***/ "./src/crypto/address.ts":
/*!*******************************!*\
  !*** ./src/crypto/address.ts ***!
  \*******************************/
/*! exports provided: Address */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Address", function() { return Address; });
/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bs58 */ "bs58");
/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bs58__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto-js */ "crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../consts */ "./src/consts.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error */ "./src/error.ts");
/* harmony import */ var _transaction_opcode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transaction/opcode */ "./src/transaction/opcode.ts");
/* harmony import */ var _transaction_program__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../transaction/program */ "./src/transaction/program.ts");
/* harmony import */ var _transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../transaction/scriptBuilder */ "./src/transaction/scriptBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */









/**
 * Representation of Address.
 *
 * There are 4 types of address:
 * 1. Public key based
 * 2. Multi public key based (m, n)
 * 3. Contract based
 * 4. ONT ID based
 *
 * The value is stored as base58 or hex encoded, therefore always use
 * toBase58() or serialize() according to requirements.
 */
class Address {
    static deserialize(sr) {
        return new Address(sr.read(20));
    }
    /**
     * Generates public key based address.
     *
     * @param publicKey Public key to use
     */
    static fromPubKey(publicKey) {
        const program = Object(_transaction_program__WEBPACK_IMPORTED_MODULE_5__["programFromPubKey"])(publicKey);
        // const program = publicKey.key + num2hexstring(opcode.CHECKSIG);
        const programHash = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["hash160"])(program);
        return new Address(programHash);
    }
    /**
     * Generates identity based address.
     * @param ontid ONT ID in the form did:ont:AXmQDzzvpEtPkNwBEFsREzApTTDZFW6frD
     */
    static fromOntid(ontid) {
        const address = ontid.substr(8);
        return new Address(address);
    }
    /**
     * Generates address from smart contract code.
     *
     * @param vmCode Hex encoded smart contract code
     */
    static fromVmCode(vmCode) {
        const programHash = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["hash160"])(vmCode);
        // programHash = num2hexstring(vmType) + programHash.substring(2);
        return new Address(programHash);
    }
    /**
     * Generates (m, n) threshold address.
     *
     * m - threshold
     * n - total number of public keys
     *
     * @param m The threshold
     * @param publicKeys Public key
     */
    static fromMultiPubKeys(m, publicKeys) {
        const n = publicKeys.length;
        if (m <= 0 || m > n || n > 24) {
            throw _error__WEBPACK_IMPORTED_MODULE_3__["ERROR_CODE"].INVALID_PARAMS;
        }
        // const pkHexStrs = publicKeys.map((p) => p.serializeHex());
        // pkHexStrs.sort();
        publicKeys.sort(_transaction_program__WEBPACK_IMPORTED_MODULE_5__["comparePublicKeys"]);
        let result = '';
        result += Object(_transaction_program__WEBPACK_IMPORTED_MODULE_5__["pushBigInt"])(m);
        for (const s of publicKeys) {
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_6__["pushHexString"])(s.serializeHex());
        }
        result += Object(_transaction_program__WEBPACK_IMPORTED_MODULE_5__["pushBigInt"])(n);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_7__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_4__["default"].CHECKMULTISIG);
        const programHash = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["hash160"])(result);
        return new Address(programHash);
    }
    /**
     * Deterministicaly generates ONT ID from this public key.
     */
    static generateOntid(publicKey) {
        const address = Address.fromPubKey(publicKey);
        const ontid = 'did:ont:' + address.toBase58();
        return ontid;
    }
    constructor(value) {
        if (value.length === 40 || value.length === 34) {
            this.value = value;
        } else {
            throw _error__WEBPACK_IMPORTED_MODULE_3__["ERROR_CODE"].INVALID_PARAMS;
        }
    }
    /**
     * Gets Base58 encoded representation of the address.
     */
    toBase58() {
        if (this.value.length === 34) {
            return this.value;
        } else {
            return hexToBase58(this.value);
        }
    }
    /**
     * Gets Hex encoded representation of the address.
     */
    toHexString() {
        let val;
        if (this.value.length === 40) {
            val = this.value;
        } else {
            val = base58ToHex(this.value);
        }
        return Object(_utils__WEBPACK_IMPORTED_MODULE_7__["reverseHex"])(val);
    }
    serialize() {
        if (this.value.length === 40) {
            return this.value;
        } else {
            return base58ToHex(this.value);
        }
    }
    /**
     * Computes the salt from address for decrypt.
     */
    getB58Checksum() {
        const address = this.toBase58();
        const hash = crypto_js__WEBPACK_IMPORTED_MODULE_1__["SHA256"](address).toString();
        const hash2 = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["sha256"])(hash);
        return hash2.slice(0, 8);
    }
}
/**
 *
 * @param programhash
 */
function hexToBase58(hexEncoded) {
    const data = _consts__WEBPACK_IMPORTED_MODULE_2__["ADDR_VERSION"] + hexEncoded;
    const hash = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["sha256"])(data);
    const hash2 = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["sha256"])(hash);
    const checksum = hash2.slice(0, 8);
    const datas = data + checksum;
    return bs58__WEBPACK_IMPORTED_MODULE_0__["encode"](new Buffer(datas, 'hex'));
}
function base58ToHex(base58Encoded) {
    const decoded = bs58__WEBPACK_IMPORTED_MODULE_0__["decode"](base58Encoded);
    const hexEncoded = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["ab2hexstring"])(decoded).substr(2, 40);
    if (base58Encoded !== hexToBase58(hexEncoded)) {
        throw new Error('[addressToU160] decode encoded verify failed');
    }
    return hexEncoded;
}

/***/ }),

/***/ "./src/crypto/index.ts":
/*!*****************************!*\
  !*** ./src/crypto/index.ts ***!
  \*****************************/
/*! exports provided: Address, KeyType, CurveLabel, SignatureScheme, KeyParameters, PrivateKey, registerKeyDeserializer, PublicKey, PublicKeyStatus, Signature, Issuer, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./address */ "./src/crypto/address.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Address", function() { return _address__WEBPACK_IMPORTED_MODULE_0__["Address"]; });

/* harmony import */ var _KeyType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KeyType */ "./src/crypto/KeyType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeyType", function() { return _KeyType__WEBPACK_IMPORTED_MODULE_1__["KeyType"]; });

/* harmony import */ var _CurveLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CurveLabel */ "./src/crypto/CurveLabel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CurveLabel", function() { return _CurveLabel__WEBPACK_IMPORTED_MODULE_2__["CurveLabel"]; });

/* harmony import */ var _SignatureScheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SignatureScheme */ "./src/crypto/SignatureScheme.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SignatureScheme", function() { return _SignatureScheme__WEBPACK_IMPORTED_MODULE_3__["SignatureScheme"]; });

/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Key */ "./src/crypto/Key.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeyParameters", function() { return _Key__WEBPACK_IMPORTED_MODULE_4__["KeyParameters"]; });

/* harmony import */ var _PrivateKey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PrivateKey */ "./src/crypto/PrivateKey.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrivateKey", function() { return _PrivateKey__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"]; });

/* harmony import */ var _PrivateKeyFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PrivateKeyFactory */ "./src/crypto/PrivateKeyFactory.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerKeyDeserializer", function() { return _PrivateKeyFactory__WEBPACK_IMPORTED_MODULE_6__["registerKeyDeserializer"]; });

/* harmony import */ var _PublicKey__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PublicKey */ "./src/crypto/PublicKey.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PublicKey", function() { return _PublicKey__WEBPACK_IMPORTED_MODULE_7__["PublicKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PublicKeyStatus", function() { return _PublicKey__WEBPACK_IMPORTED_MODULE_7__["PublicKeyStatus"]; });

/* harmony import */ var _Signature__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Signature */ "./src/crypto/Signature.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Signature", function() { return _Signature__WEBPACK_IMPORTED_MODULE_8__["Signature"]; });

/* harmony import */ var _AnonymousCredential__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AnonymousCredential */ "./src/crypto/AnonymousCredential.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Issuer", function() { return _AnonymousCredential__WEBPACK_IMPORTED_MODULE_9__["Issuer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _AnonymousCredential__WEBPACK_IMPORTED_MODULE_9__["User"]; });

/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */











/***/ }),

/***/ "./src/error.ts":
/*!**********************!*\
  !*** ./src/error.ts ***!
  \**********************/
/*! exports provided: ERROR_CODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_CODE", function() { return ERROR_CODE; });
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
var ERROR_CODE;
(function (ERROR_CODE) {
    ERROR_CODE[ERROR_CODE["SUCCESS"] = 0] = "SUCCESS";
    ERROR_CODE[ERROR_CODE["SESSION_EXPIRED"] = 41001] = "SESSION_EXPIRED";
    ERROR_CODE[ERROR_CODE["SERVICE_CEILING"] = 41002] = "SERVICE_CEILING";
    ERROR_CODE[ERROR_CODE["ILLEGAL_DATAFORMAT"] = 41003] = "ILLEGAL_DATAFORMAT";
    ERROR_CODE[ERROR_CODE["INVALID_VERSION"] = 41004] = "INVALID_VERSION";
    ERROR_CODE[ERROR_CODE["INVALID_METHOD"] = 42001] = "INVALID_METHOD";
    ERROR_CODE[ERROR_CODE["INVALID_PARAMS"] = 42002] = "INVALID_PARAMS";
    ERROR_CODE[ERROR_CODE["INVALID_TRANSACTION"] = 43001] = "INVALID_TRANSACTION";
    ERROR_CODE[ERROR_CODE["INVALID_ASSET"] = 43002] = "INVALID_ASSET";
    ERROR_CODE[ERROR_CODE["INVALID_BLOCK"] = 43003] = "INVALID_BLOCK";
    ERROR_CODE[ERROR_CODE["UNKNOWN_TRANSACTION"] = 44001] = "UNKNOWN_TRANSACTION";
    ERROR_CODE[ERROR_CODE["UNKNOWN_ASSET"] = 44002] = "UNKNOWN_ASSET";
    ERROR_CODE[ERROR_CODE["UNKNOWN_BLOCK"] = 44003] = "UNKNOWN_BLOCK";
    ERROR_CODE[ERROR_CODE["UNKNWN_CONTRACT"] = 44004] = "UNKNWN_CONTRACT";
    ERROR_CODE[ERROR_CODE["INTERNAL_ERROR"] = 45001] = "INTERNAL_ERROR";
    ERROR_CODE[ERROR_CODE["SMARTCODE_ERROR"] = 47001] = "SMARTCODE_ERROR";
    ERROR_CODE[ERROR_CODE["UNKNOWN_ONTID"] = 51000] = "UNKNOWN_ONTID";
    ERROR_CODE[ERROR_CODE["NETWORK_ERROR"] = 52000] = "NETWORK_ERROR";
    ERROR_CODE[ERROR_CODE["Decrypto_ERROR"] = 53000] = "Decrypto_ERROR";
    ERROR_CODE[ERROR_CODE["INVALID_ADDR"] = 53001] = "INVALID_ADDR";
    ERROR_CODE[ERROR_CODE["PreExec_ERROR"] = 54000] = "PreExec_ERROR"; // 预执行错误
})(ERROR_CODE || (ERROR_CODE = {}));

/***/ }),

/***/ "./src/identity.ts":
/*!*************************!*\
  !*** ./src/identity.ts ***!
  \*************************/
/*! exports provided: ControlData, Identity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlData", function() { return ControlData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Identity", function() { return Identity; });
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crypto */ "./src/crypto/index.ts");
/* harmony import */ var _crypto_PrivateKeyFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./crypto/PrivateKeyFactory */ "./src/crypto/PrivateKeyFactory.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/




/**
 * Control data of identity
 */
class ControlData {
    constructor(id, encryptedKey, address, salt) {
        /**
         * hash type
         */
        this.hash = 'sha256';
        this.id = id;
        this.encryptedKey = encryptedKey;
        this.address = address;
        this.salt = salt;
    }
    static fromJson(json) {
        const privateKey = Object(_crypto_PrivateKeyFactory__WEBPACK_IMPORTED_MODULE_1__["deserializeFromJson"])(json);
        const cd = new ControlData(json.id, privateKey, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](json.address), json.salt);
        cd.publicKey = json.publicKey;
        cd.hash = json.hash;
        return cd;
    }
    toJson() {
        return _extends({
            id: this.id
        }, this.encryptedKey.serializeJson(), {
            address: this.address.toBase58(),
            salt: this.salt,
            ['enc-alg']: 'aes-256-gcm',
            hash: this.hash,
            publicKey: this.publicKey
        });
    }
}
class Identity {
    constructor() {
        this.controls = [];
    }
    /**
     * Import identity
     * @param label Name of identity
     * @param encryptedPrivateKey Encrypted private key
     * @param password User's password to decrypt
     * @param address Address to decrypt
     * @param saltBase64 Salt to decrypt
     * @param params Optional params to decrypt
     */
    static importIdentity(label, encryptedPrivateKey, password, address, saltBase64, params) {
        // create identity
        const identity = new Identity();
        const salt = Buffer.from(saltBase64, 'base64').toString('hex');
        const privateKey = encryptedPrivateKey.decrypt(password, address, salt, params);
        if (!label) {
            label = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["ab2hexstring"])(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["generateRandomArray"])(4));
        }
        // generate ontid from p
        const publicKey = privateKey.getPublicKey();
        identity.ontid = _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"].generateOntid(publicKey);
        identity.label = label;
        identity.lock = false;
        identity.isDefault = false;
        // control
        const control = new ControlData('1', encryptedPrivateKey, _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"].fromOntid(identity.ontid), saltBase64);
        control.publicKey = publicKey.serializeHex();
        identity.controls.push(control);
        return identity;
    }
    /**
     * Creates Identity object encrypting specified private key.
     *
     * The identity is not registered on the blockchain. Caller needs to register it.
     *
     * @param privateKey Private key associated with the identity
     * @param keyphrase Password use to encrypt the private key
     * @param label Custom label
     * @param params Optional scrypt params
     */
    static create(privateKey, keyphrase, label, params) {
        const identity = new Identity();
        identity.ontid = '';
        identity.label = label;
        identity.lock = false;
        identity.isDefault = false;
        // ontid
        const publicKey = privateKey.getPublicKey();
        identity.ontid = _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"].generateOntid(publicKey);
        const address = _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"].fromOntid(identity.ontid);
        const salt = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["randomBytes"])(16);
        const encryptedPrivateKey = privateKey.encrypt(keyphrase, address, salt, params);
        // start from 1
        const saltBase64 = Buffer.from(salt, 'hex').toString('base64');
        const control = new ControlData('1', encryptedPrivateKey, address, saltBase64);
        control.publicKey = publicKey.serializeHex();
        identity.controls.push(control);
        return identity;
    }
    static parseJson(json) {
        return Identity.parseJsonObj(JSON.parse(json));
    }
    /**
     * Deserializes JSON object.
     *
     * Object should be real object, not stringified.
     *
     * @param obj JSON object
     */
    static parseJsonObj(obj) {
        const id = new Identity();
        id.ontid = obj.ontid;
        id.label = obj.label;
        id.lock = obj.lock;
        id.isDefault = obj.isDefault;
        id.controls = obj.controls.map(c => ControlData.fromJson(c));
        id.extra = obj.extra;
        return id;
    }
    addControl(control) {
        for (const c of this.controls) {
            if (c.address.toBase58() === control.address.toBase58()) {
                return;
            }
        }
        control.id = (this.controls.length + 1).toString();
        this.controls.push(control);
    }
    toJson() {
        return JSON.stringify(this.toJsonObj());
    }
    /**
     * Serializes to JSON object.
     *
     * Returned object will not be stringified.
     *
     */
    toJsonObj() {
        const obj = {
            ontid: this.ontid,
            label: this.label,
            lock: this.lock,
            isDefault: this.isDefault,
            controls: this.controls.map(c => c.toJson()),
            extra: this.extra
        };
        return obj;
    }
    exportPrivateKey(password, params) {
        const encryptedKey = this.controls[0].encryptedKey;
        const address = this.controls[0].address;
        const salt = this.controls[0].salt;
        return encryptedKey.decrypt(password, address, salt, params);
    }
    signTransaction(password, tx, params) {
        const pri = this.exportPrivateKey(password, params);
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["signTransaction"])(tx, pri, pri.algorithm.defaultSchema);
        return tx;
    }
}

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default, Account, Identity, Claim, DDO, DDOAttribute, Transaction, Transfer, TxSignature, Parameter, ParameterType, AbiFunction, AbiInfo, TransactionBuilder, OntAssetTxBuilder, GovernanceTxBuilder, utils, scrypt, CONST, Wallet, SDK, Token, OntidContract, RestClient, RpcClient, WebsocketClient, Crypto, Struct, ScriptBuilder, NeoCore, Oep4, Oep8, Oep5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account */ "./src/account.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Account", function() { return _account__WEBPACK_IMPORTED_MODULE_0__["Account"]; });

/* harmony import */ var _claim__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claim */ "./src/claim/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Claim", function() { return _claim__WEBPACK_IMPORTED_MODULE_1__["Claim"]; });

/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "CONST", function() { return _consts__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crypto */ "./src/crypto/index.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Crypto", function() { return _crypto__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./identity */ "./src/identity.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Identity", function() { return _identity__WEBPACK_IMPORTED_MODULE_4__["Identity"]; });

/* harmony import */ var _neocore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./neocore */ "./src/neocore/index.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "NeoCore", function() { return _neocore__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _network_rest_restClient__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./network/rest/restClient */ "./src/network/rest/restClient.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RestClient", function() { return _network_rest_restClient__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _network_rpc_rpcClient__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./network/rpc/rpcClient */ "./src/network/rpc/rpcClient.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RpcClient", function() { return _network_rpc_rpcClient__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _network_websocket_websocketClient__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./network/websocket/websocketClient */ "./src/network/websocket/websocketClient.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebsocketClient", function() { return _network_websocket_websocketClient__WEBPACK_IMPORTED_MODULE_8__["WebsocketClient"]; });

/* harmony import */ var _scrypt__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scrypt */ "./src/scrypt.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "scrypt", function() { return _scrypt__WEBPACK_IMPORTED_MODULE_9__; });
/* harmony import */ var _sdk_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sdk/index */ "./src/sdk/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SDK", function() { return _sdk_index__WEBPACK_IMPORTED_MODULE_10__["SDK"]; });

/* harmony import */ var _smartcontract_abi_abiFunction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./smartcontract/abi/abiFunction */ "./src/smartcontract/abi/abiFunction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbiFunction", function() { return _smartcontract_abi_abiFunction__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _smartcontract_abi_abiInfo__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./smartcontract/abi/abiInfo */ "./src/smartcontract/abi/abiInfo.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbiInfo", function() { return _smartcontract_abi_abiInfo__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./smartcontract/abi/parameter */ "./src/smartcontract/abi/parameter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Parameter", function() { return _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_13__["Parameter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParameterType", function() { return _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_13__["ParameterType"]; });

/* harmony import */ var _smartcontract_abi_struct__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./smartcontract/abi/struct */ "./src/smartcontract/abi/struct.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Struct", function() { return _smartcontract_abi_struct__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _smartcontract_nativevm_governanceContractTxBuilder__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./smartcontract/nativevm/governanceContractTxBuilder */ "./src/smartcontract/nativevm/governanceContractTxBuilder.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "GovernanceTxBuilder", function() { return _smartcontract_nativevm_governanceContractTxBuilder__WEBPACK_IMPORTED_MODULE_15__; });
/* harmony import */ var _smartcontract_nativevm_ontAssetTxBuilder__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./smartcontract/nativevm/ontAssetTxBuilder */ "./src/smartcontract/nativevm/ontAssetTxBuilder.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "OntAssetTxBuilder", function() { return _smartcontract_nativevm_ontAssetTxBuilder__WEBPACK_IMPORTED_MODULE_16__; });
/* harmony import */ var _smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./smartcontract/nativevm/ontidContractTxBuilder */ "./src/smartcontract/nativevm/ontidContractTxBuilder.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "OntidContract", function() { return _smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_17__; });
/* harmony import */ var _smartcontract_nativevm_token__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./smartcontract/nativevm/token */ "./src/smartcontract/nativevm/token.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Token", function() { return _smartcontract_nativevm_token__WEBPACK_IMPORTED_MODULE_18__; });
/* harmony import */ var _smartcontract_neovm_oep4TxBuilder__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./smartcontract/neovm/oep4TxBuilder */ "./src/smartcontract/neovm/oep4TxBuilder.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Oep4", function() { return _smartcontract_neovm_oep4TxBuilder__WEBPACK_IMPORTED_MODULE_19__; });
/* harmony import */ var _smartcontract_neovm_oep5TxBuilder__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./smartcontract/neovm/oep5TxBuilder */ "./src/smartcontract/neovm/oep5TxBuilder.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Oep5", function() { return _smartcontract_neovm_oep5TxBuilder__WEBPACK_IMPORTED_MODULE_20__; });
/* harmony import */ var _smartcontract_neovm_oep8TxBuilder__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./smartcontract/neovm/oep8TxBuilder */ "./src/smartcontract/neovm/oep8TxBuilder.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Oep8", function() { return _smartcontract_neovm_oep8TxBuilder__WEBPACK_IMPORTED_MODULE_21__; });
/* harmony import */ var _transaction_ddo__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./transaction/ddo */ "./src/transaction/ddo.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DDO", function() { return _transaction_ddo__WEBPACK_IMPORTED_MODULE_22__["DDO"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DDOAttribute", function() { return _transaction_ddo__WEBPACK_IMPORTED_MODULE_22__["DDOAttribute"]; });

/* harmony import */ var _transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./transaction/scriptBuilder */ "./src/transaction/scriptBuilder.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ScriptBuilder", function() { return _transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_23__; });
/* harmony import */ var _transaction_transaction__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./transaction/transaction */ "./src/transaction/transaction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transaction", function() { return _transaction_transaction__WEBPACK_IMPORTED_MODULE_24__["Transaction"]; });

/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "TransactionBuilder", function() { return _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_25__; });
/* harmony import */ var _transaction_transfer__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./transaction/transfer */ "./src/transaction/transfer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transfer", function() { return _transaction_transfer__WEBPACK_IMPORTED_MODULE_26__["Transfer"]; });

/* harmony import */ var _transaction_txSignature__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./transaction/txSignature */ "./src/transaction/txSignature.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TxSignature", function() { return _transaction_txSignature__WEBPACK_IMPORTED_MODULE_27__["TxSignature"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return _utils__WEBPACK_IMPORTED_MODULE_28__; });
/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./wallet */ "./src/wallet.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Wallet", function() { return _wallet__WEBPACK_IMPORTED_MODULE_29__["Wallet"]; });

/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */






























class ONT {
    constructor() {
        this.Account = _account__WEBPACK_IMPORTED_MODULE_0__["Account"];
        this.Identity = _identity__WEBPACK_IMPORTED_MODULE_4__["Identity"];
        this.Claim = _claim__WEBPACK_IMPORTED_MODULE_1__["Claim"];
        this.DDO = _transaction_ddo__WEBPACK_IMPORTED_MODULE_22__["DDO"];
        this.DDOAttribute = _transaction_ddo__WEBPACK_IMPORTED_MODULE_22__["DDOAttribute"];
        this.Transaction = _transaction_transaction__WEBPACK_IMPORTED_MODULE_24__["Transaction"];
        this.Transfer = _transaction_transfer__WEBPACK_IMPORTED_MODULE_26__["Transfer"];
        this.TxSignature = _transaction_txSignature__WEBPACK_IMPORTED_MODULE_27__["TxSignature"];
        this.TransactionBuilder = _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_25__;
        this.OntAssetTxBuilder = _smartcontract_nativevm_ontAssetTxBuilder__WEBPACK_IMPORTED_MODULE_16__;
        this.GovernanceTxBuilder = _smartcontract_nativevm_governanceContractTxBuilder__WEBPACK_IMPORTED_MODULE_15__;
        this.Parameter = _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_13__["Parameter"];
        this.ParameterType = _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_13__["ParameterType"];
        this.AbiFunction = _smartcontract_abi_abiFunction__WEBPACK_IMPORTED_MODULE_11__["default"];
        this.AbiInfo = _smartcontract_abi_abiInfo__WEBPACK_IMPORTED_MODULE_12__["default"];
        this.utils = _utils__WEBPACK_IMPORTED_MODULE_28__;
        this.scrypt = _scrypt__WEBPACK_IMPORTED_MODULE_9__;
        this.CONST = _consts__WEBPACK_IMPORTED_MODULE_2__;
        this.Wallet = _wallet__WEBPACK_IMPORTED_MODULE_29__["Wallet"];
        this.SDK = _sdk_index__WEBPACK_IMPORTED_MODULE_10__["SDK"];
        this.Token = _smartcontract_nativevm_token__WEBPACK_IMPORTED_MODULE_18__;
        this.OntidContract = _smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_17__;
        this.RestClient = _network_rest_restClient__WEBPACK_IMPORTED_MODULE_6__["default"];
        this.RpcClient = _network_rpc_rpcClient__WEBPACK_IMPORTED_MODULE_7__["default"];
        this.WebsocketClient = _network_websocket_websocketClient__WEBPACK_IMPORTED_MODULE_8__["WebsocketClient"];
        this.Crypto = _crypto__WEBPACK_IMPORTED_MODULE_3__;
        this.Struct = _smartcontract_abi_struct__WEBPACK_IMPORTED_MODULE_14__["default"];
        this.ScriptBuilder = _transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_23__;
        this.NeoCore = _neocore__WEBPACK_IMPORTED_MODULE_5__;
        this.Oep4 = _smartcontract_neovm_oep4TxBuilder__WEBPACK_IMPORTED_MODULE_19__;
        this.Oep8 = _smartcontract_neovm_oep8TxBuilder__WEBPACK_IMPORTED_MODULE_21__;
        this.Oep5 = _smartcontract_neovm_oep5TxBuilder__WEBPACK_IMPORTED_MODULE_20__;
    }
    setNode(url) {
        this.CONST.TEST_NODE = url;
    }
    setRpcPort(port) {
        this.CONST.HTTP_JSON_PORT = port;
    }
    setRestPort(port) {
        this.CONST.HTTP_REST_PORT = port;
    }
    setSocketPort(port) {
        this.CONST.HTTP_WS_PORT = port;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ONT);


/***/ }),

/***/ "./src/neocore/InvocationTransaction.ts":
/*!**********************************************!*\
  !*** ./src/neocore/InvocationTransaction.ts ***!
  \**********************************************/
/*! exports provided: InvocationTransaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvocationTransaction", function() { return InvocationTransaction; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _transaction_transaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../transaction/transaction */ "./src/transaction/transaction.ts");
/* harmony import */ var _TransactionNeo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TransactionNeo */ "./src/neocore/TransactionNeo.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */




class InvocationTransaction extends _TransactionNeo__WEBPACK_IMPORTED_MODULE_2__["TransactionNeo"] {
    constructor() {
        super();
        this.type = _transaction_transaction__WEBPACK_IMPORTED_MODULE_1__["TxType"].Invoke;
    }
    serializeExclusiveData() {
        let result = '';
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hex2VarBytes"])(this.script);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["num2hexstring"])(this.gas, 8, true);
        return result;
    }
}

/***/ }),

/***/ "./src/neocore/NeoRpc.ts":
/*!*******************************!*\
  !*** ./src/neocore/NeoRpc.ts ***!
  \*******************************/
/*! exports provided: NeoRpc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeoRpc", function() { return NeoRpc; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */

class NeoRpc {
    static sendRawTransaction(url, data) {
        const req = this.makeRequest('sendrawtransaction', data);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, req).then(res => {
            return res.data;
        });
    }
    static makeRequest(method, ...params) {
        const request = {
            jsonrpc: '2.0',
            method,
            params,
            id: 1
        };
        return request;
    }
    static getBalance(url, contractAddr, address) {
        const req = this.makeRequest('getstorage', contractAddr.toHexString(), address.serialize());
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, req).then(res => {
            return res.data;
        });
    }
}

/***/ }),

/***/ "./src/neocore/Program.ts":
/*!********************************!*\
  !*** ./src/neocore/Program.ts ***!
  \********************************/
/*! exports provided: Program */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return Program; });
/* harmony import */ var _transaction_program__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transaction/program */ "./src/transaction/program.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */


class Program {
    static deserialize(hexstring) {
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_1__["StringReader"]();
        const program = new Program();
        program.parameter = sr.readNextBytes();
        program.code = sr.readNextBytes();
        return program;
    }
    static programFromParams(sigData) {
        return Object(_transaction_program__WEBPACK_IMPORTED_MODULE_0__["programFromParams"])(sigData);
    }
    static programFromPubKey(publicKey) {
        return Object(_transaction_program__WEBPACK_IMPORTED_MODULE_0__["programFromPubKey"])(publicKey);
    }
    static programFromMultiPubKey(m, pks) {
        return Object(_transaction_program__WEBPACK_IMPORTED_MODULE_0__["programFromMultiPubKey"])(pks, m);
    }
    serialize() {
        let result = '';
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["hex2VarBytes"])(this.parameter);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["hex2VarBytes"])(this.code);
        return result;
    }
}

/***/ }),

/***/ "./src/neocore/SmartContract.ts":
/*!**************************************!*\
  !*** ./src/neocore/SmartContract.ts ***!
  \**************************************/
/*! exports provided: SmartContract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmartContract", function() { return SmartContract; });
/* harmony import */ var _transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transaction/scriptBuilder */ "./src/transaction/scriptBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _transaction_txAttribute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../transaction/txAttribute */ "./src/transaction/txAttribute.ts");
/* harmony import */ var _InvocationTransaction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InvocationTransaction */ "./src/neocore/InvocationTransaction.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */




class SmartContract {
    static makeInvokeTransaction(contractAddr, addr, abiFunction) {
        let params = Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_0__["serializeAbiFunction"])(abiFunction);
        params += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["num2hexstring"])(0x67);
        params += contractAddr.serialize();
        const tx = this.makeInvocationTransaction(params, addr);
        return tx;
    }
    static makeInvocationTransaction(params, addr) {
        const tx = new _InvocationTransaction__WEBPACK_IMPORTED_MODULE_3__["InvocationTransaction"]();
        tx.version = 1;
        tx.attributes = [];
        const attr1 = new _transaction_txAttribute__WEBPACK_IMPORTED_MODULE_2__["TransactionAttribute"]();
        attr1.usage = _transaction_txAttribute__WEBPACK_IMPORTED_MODULE_2__["TransactionAttributeUsage"].Script;
        attr1.data = addr.serialize();
        tx.attributes[0] = attr1;
        const attr2 = new _transaction_txAttribute__WEBPACK_IMPORTED_MODULE_2__["TransactionAttribute"]();
        attr2.usage = _transaction_txAttribute__WEBPACK_IMPORTED_MODULE_2__["TransactionAttributeUsage"].DescriptionUrl;
        attr2.data = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["randomBytes"])(16);
        tx.attributes[1] = attr2;
        tx.inputs = [];
        tx.outputs = [];
        tx.script = params;
        tx.gas = 0;
        return tx;
    }
}

/***/ }),

/***/ "./src/neocore/TransactionInput.ts":
/*!*****************************************!*\
  !*** ./src/neocore/TransactionInput.ts ***!
  \*****************************************/
/*! exports provided: TransactionInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionInput", function() { return TransactionInput; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */


class TransactionInput {
    static deserialize(hexstr) {
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_0__["StringReader"](hexstr);
        const input = new TransactionInput();
        input.prevHash = sr.read(20);
        input.prevIndex = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["reverseHex"])(sr.read(2)), 16);
        return input;
    }
    equals(o) {
        if (o === this) {
            return true;
        }
        if (null === o) {
            return false;
        }
        if (!(o instanceof TransactionInput)) {
            return false;
        }
        return this.prevHash === o.prevHash && this.prevIndex === o.prevIndex;
    }
    hashCode() {
        return parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["reverseHex"])(this.prevHash), 16) + this.prevIndex;
    }
    serialize() {
        let result = '';
        result += this.prevHash;
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["num2hexstring"])(this.prevIndex, 2, true);
        return result;
    }
}

/***/ }),

/***/ "./src/neocore/TransactionNeo.ts":
/*!***************************************!*\
  !*** ./src/neocore/TransactionNeo.ts ***!
  \***************************************/
/*! exports provided: TransactionNeo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionNeo", function() { return TransactionNeo; });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto-js */ "crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _crypto_SignatureScheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../crypto/SignatureScheme */ "./src/crypto/SignatureScheme.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */



/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
class TransactionNeo {
    constructor() {
        this.version = 0;
    }
    serialize() {
        let result = this.serializeUnsigned();
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2VarInt"])(this.scripts.length);
        for (const s of this.scripts) {
            result += s.serialize();
        }
        return result;
    }
    serializeUnsigned() {
        let result = '';
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(this.type);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(this.version);
        result += this.serializeExclusiveData();
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2VarInt"])(this.attributes.length);
        for (const a of this.attributes) {
            result += a.serialize();
        }
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2VarInt"])(this.inputs.length);
        for (const i of this.inputs) {
            result += i.serialize();
        }
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2VarInt"])(this.outputs.length);
        for (const o of this.outputs) {
            result += o.serialize();
        }
        return result;
    }
    getHash() {
        const data = this.serializeUnsigned();
        const ProgramHexString = crypto_js__WEBPACK_IMPORTED_MODULE_0__["enc"].Hex.parse(data);
        const ProgramSha256 = crypto_js__WEBPACK_IMPORTED_MODULE_0__["SHA256"](ProgramHexString).toString();
        const ProgramSha2562 = crypto_js__WEBPACK_IMPORTED_MODULE_0__["SHA256"](crypto_js__WEBPACK_IMPORTED_MODULE_0__["enc"].Hex.parse(ProgramSha256)).toString();
        return ProgramSha2562;
    }
    getSignContent() {
        return this.getHashData();
    }
    serializeUnsignedData() {
        return this.getHashData();
    }
    getHashData() {
        return this.serializeUnsigned();
    }
    sign(privateKey, scheme = _crypto_SignatureScheme__WEBPACK_IMPORTED_MODULE_1__["SignatureScheme"].ECDSAwithSHA256) {
        const sig = privateKey.sign(this.getHashData(), scheme).serializeHex();
        const signature = sig.substring(2);
        return signature;
    }
    serializeExclusiveData() {
        return '';
    }
}

/***/ }),

/***/ "./src/neocore/TransactionOutput.ts":
/*!******************************************!*\
  !*** ./src/neocore/TransactionOutput.ts ***!
  \******************************************/
/*! exports provided: TransactionOutput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionOutput", function() { return TransactionOutput; });
/* harmony import */ var _crypto_address__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../crypto/address */ "./src/crypto/address.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */


class TransactionOutput {
    static deserialize(hexstring) {
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_1__["StringReader"](hexstring);
        const output = new TransactionOutput();
        output.assetId = sr.read(32);
        output.value = sr.readLong();
        output.scriptHash = new _crypto_address__WEBPACK_IMPORTED_MODULE_0__["Address"](sr.read(20));
        return output;
    }
    serialize() {
        let result = '';
        result += this.assetId;
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["num2hexstring"])(this.value, 8, true);
        result += this.scriptHash.serialize();
        return result;
    }
}

/***/ }),

/***/ "./src/neocore/index.ts":
/*!******************************!*\
  !*** ./src/neocore/index.ts ***!
  \******************************/
/*! exports provided: InvocationTransaction, NeoRpc, Program, SmartContract, TransactionInput, TransactionOutput, TransactionNeo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InvocationTransaction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvocationTransaction */ "./src/neocore/InvocationTransaction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvocationTransaction", function() { return _InvocationTransaction__WEBPACK_IMPORTED_MODULE_0__["InvocationTransaction"]; });

/* harmony import */ var _NeoRpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NeoRpc */ "./src/neocore/NeoRpc.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NeoRpc", function() { return _NeoRpc__WEBPACK_IMPORTED_MODULE_1__["NeoRpc"]; });

/* harmony import */ var _Program__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Program */ "./src/neocore/Program.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return _Program__WEBPACK_IMPORTED_MODULE_2__["Program"]; });

/* harmony import */ var _SmartContract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SmartContract */ "./src/neocore/SmartContract.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmartContract", function() { return _SmartContract__WEBPACK_IMPORTED_MODULE_3__["SmartContract"]; });

/* harmony import */ var _TransactionInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TransactionInput */ "./src/neocore/TransactionInput.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionInput", function() { return _TransactionInput__WEBPACK_IMPORTED_MODULE_4__["TransactionInput"]; });

/* harmony import */ var _TransactionOutput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TransactionOutput */ "./src/neocore/TransactionOutput.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionOutput", function() { return _TransactionOutput__WEBPACK_IMPORTED_MODULE_5__["TransactionOutput"]; });

/* harmony import */ var _TransactionNeo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TransactionNeo */ "./src/neocore/TransactionNeo.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionNeo", function() { return _TransactionNeo__WEBPACK_IMPORTED_MODULE_6__["TransactionNeo"]; });

/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */








/***/ }),

/***/ "./src/network/rest/restClient.ts":
/*!****************************************!*\
  !*** ./src/network/rest/restClient.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RestClient; });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../error */ "./src/error.ts");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../consts */ "./src/consts.ts");
/* harmony import */ var _urlConsts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./urlConsts */ "./src/network/rest/urlConsts.ts");

/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */



/**
 * Wrapper class for restful api.
 */
class RestClient {
    constructor(url) {
        /**
         * Version of restful api
         */
        this.version = 'v1.0.0';
        /**
         * Action name of the request
         */
        this.action = 'sendrawtransaction';
        this.url = url || _consts__WEBPACK_IMPORTED_MODULE_2__["TEST_ONT_URL"].REST_URL;
        if (this.url[this.url.length - 1] === '/') {
            this.url = this.url.substring(0, this.url.length - 1);
        }
    }
    /**
     * Concat params as the query part
     * @param params
     */
    concatParams(params) {
        let result = '';
        if (params.size === 0) {
            return '';
        }
        for (const key of params.keys()) {
            let value = params.get(key);
            if (value) {
                value = encodeURIComponent(value);
            }
            result += `&${key}=${value}`;
        }
        return '?' + result.substr(1);
    }
    /**
     * Get the current blockchain node url
     */
    getUrl() {
        return this.url;
    }
    /**
     * To send raw transaction to blockchian
     * @param hexData Hex encoded data
     * @param preExec Decides if it is a pre-execute transaction
     * @param userId User's id
     */
    sendRawTransaction(hexData, preExec = false, userId) {
        const param = new Map();
        if (userId) {
            param.set('userid', userId);
        }
        if (preExec) {
            param.set('preExec', '1');
        }
        let url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_send_transaction;
        url += this.concatParams(param);
        const body = {
            Action: this.action,
            Version: this.version,
            Data: hexData
        };
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(url, body).then(res => {
            return res.data;
        });
    }
    /**
     * Get raw transaction by transaction hash.
     * The result is hex encoded transaction.
     * @param txHash Transactin hash.Always use the reversed value of transaction hash to query.
     *
     * @example
     *
     * ```typescript
     * import { utils, Transaction } from 'ontology-ts-sdk';
     * const txHash = tx.getHash(); // tx is an instance of Transaction
     * restClient.getRawTransaction(utils.reverseHex(txHash)).then(res => {
     *   const tx = Transaction.deserialize(res.Result)
     * })
     *
     * ````
     */
    getRawTransaction(txHash) {
        const param = new Map();
        param.set('raw', '1');
        let url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_transaction + txHash;
        url += this.concatParams(param);
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get transaction by transaction hash.
     * The result is transaction in json.
     * @param txHash Reversed transaction hash
     */
    getRawTransactionJson(txHash) {
        const param = new Map();
        param.set('raw', '0');
        let url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_transaction + txHash;
        url += this.concatParams(param);
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /** Deprecated
     * Get the generation time for each block.
     * If the blockchain node runs in vbft, the result is null.
     */
    // getGenerateBlockTime(): Promise<any> {
    //     const url = this.url + UrlConsts.Url_get_generate_block_time;
    //     return axios.get(url).then((res) => {
    //         return res.data;
    //     });
    // }
    /**
     * Get the nodes count of the blockchain.
     */
    getNodeCount() {
        const url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_node_count;
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get the current height of the blockchain.
     */
    getBlockHeight() {
        const url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_block_height;
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get block by block's height or hash
     * @param value Block height or block hash
     */
    getBlock(value) {
        const params = new Map();
        params.set('raw', '1');
        let url = '';
        if (typeof value === 'number') {
            url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_block_by_height + value;
        } else if (typeof value === 'string') {
            url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_block_by_hash + value;
        }
        url += this.concatParams(params);
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get contract info by code hash.The result is hex encoded string.
     * @param codeHash Code hash of contract.The value is reversed contract address.
     */
    getContract(codeHash) {
        const params = new Map();
        params.set('raw', '1');
        let url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_contract_state + codeHash;
        url += this.concatParams(params);
        // console.log('url: '+url);
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get contract info by code hash. The result is json.
     * @param codeHash Code hash of contract.
     */
    getContractJson(codeHash) {
        const params = new Map();
        params.set('raw', '0');
        let url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_contract_state + codeHash;
        url += this.concatParams(params);
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get smart contract event by Block height or reversed transaction hash.
     * If the parameter is block height, the result includes all the transaction event of that block;
     * If the parameter is transaction hash, the result is the event of that transaction.
     * @param value Block height or reversed transaction hash
     */
    getSmartCodeEvent(value) {
        let url = '';
        if (typeof value === 'string') {
            url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_smartcodeevent_by_txhash + value;
        } else if (typeof value === 'number') {
            url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_smartcodeevent_txs_by_height + value;
        }
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get the block height by reversed transaction hash.
     * @param hash Reversed transaction hash.
     */
    getBlockHeightByTxHash(hash) {
        const url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_block_height_by_txhash + hash;
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get the stored value in smart contract by the code hash and key.
     * @param codeHash Code hash of the smart contract
     * @param key Key of the stored value
     */
    getStorage(codeHash, key) {
        const url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_storage + codeHash + '/' + key;
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get the merkle proof by transaction hash
     * @param hash Reversed transaction hash
     */
    getMerkleProof(hash) {
        const url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_merkleproof + hash;
        // tslint:disable-next-line:no-console
        console.log('url: ' + url);
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get balance of some address
     * The result contains balance of ONT and ONG
     * @param address Address
     */
    getBalance(address) {
        const url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_account_balance + address.toBase58();
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get block info by block's height or hash.
     * @param value Block's height or hash
     */
    getBlockJson(value) {
        let url = '';
        if (typeof value === 'number') {
            url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_block_by_height + value;
        } else if (typeof value === 'string') {
            url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_block_by_hash + value;
        }
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
    /**
     * Get allowance by address
     * @param asset Asset type. Only ONT or ONG.
     * @param from Address of allowance sender.
     * @param to Address of allowance receiver.
     */
    getAllowance(asset, from, to) {
        asset = asset.toLowerCase();
        if (asset !== 'ont' && asset !== 'ong') {
            throw _error__WEBPACK_IMPORTED_MODULE_0__["ERROR_CODE"].INVALID_PARAMS;
        }
        const url = this.url + _urlConsts__WEBPACK_IMPORTED_MODULE_3__["default"].Url_get_allowance + asset.toLowerCase() + '/' + from.toBase58() + '/' + to.toBase58();
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(res => {
            return res.data;
        });
    }
}

/***/ }),

/***/ "./src/network/rest/urlConsts.ts":
/*!***************************************!*\
  !*** ./src/network/rest/urlConsts.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * Restful api
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  Url_send_transaction: '/api/v1/transaction',
  Url_get_transaction: '/api/v1/transaction/',
  Url_get_generate_block_time: '/api/v1/node/generateblocktime',
  Url_get_node_count: '/api/v1/node/connectioncount',
  Url_get_block_height: '/api/v1/block/height',
  Url_get_block_by_height: '/api/v1/block/details/height/',
  Url_get_block_by_hash: '/api/v1/block/details/hash/',
  Url_get_account_balance: '/api/v1/balance/',
  Url_get_contract_state: '/api/v1/contract/',
  Url_get_smartcodeevent_txs_by_height: '/api/v1/smartcode/event/transactions/',
  Url_get_smartcodeevent_by_txhash: '/api/v1/smartcode/event/txhash/',
  Url_get_block_height_by_txhash: '/api/v1/block/height/txhash/',
  Url_get_storage: '/api/v1/storage/',
  Url_get_merkleproof: '/api/v1/merkleproof/',
  Url_get_allowance: '/api/v1/allowance/'
});

/***/ }),

/***/ "./src/network/rpc/rpcClient.ts":
/*!**************************************!*\
  !*** ./src/network/rpc/rpcClient.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RpcClient; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../consts */ "./src/consts.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error */ "./src/error.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */



/**
 * Wrapper class for RPC apis.
 */
class RpcClient {
    constructor(url) {
        this.url = url || _consts__WEBPACK_IMPORTED_MODULE_1__["TEST_ONT_URL"].RPC_URL;
    }
    /**
     * Get the current blockchain node url.
     */
    getUrl() {
        return this.url;
    }
    /**
     * Make request base on method and parameters
     * @param method Method's name
     * @param params Parameters
     */
    makeRequest(method, ...params) {
        const request = {
            jsonrpc: '2.0',
            method,
            params,
            id: 1
        };
        return request;
    }
    /**
     * Get the balance of some address.
     * The result contains ONT and ONG.
     * @param address Address
     */
    getBalance(address) {
        const req = this.makeRequest('getbalance', address.toBase58());
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Send ran transaction to blockchain.
     * @param data Hex encoded data.
     * @param preExec Decides if it is a pre-execute transaction.
     */
    sendRawTransaction(data, preExec = false) {
        let req;
        if (preExec) {
            req = this.makeRequest('sendrawtransaction', data, 1);
        } else {
            req = this.makeRequest('sendrawtransaction', data);
        }
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get raw transaction by transaction hash.
     * The result is hex encoded string.
     * @param txHash Reversed transaction hash
     */
    getRawTransaction(txHash) {
        const req = this.makeRequest('getrawtransaction', txHash);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get transaction info by transaction hash.
     * The result is json.
     * @param txHash Reversed transaction hash.
     */
    getRawTransactionJson(txHash) {
        const req = this.makeRequest('getrawtransaction', txHash, 1);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /** Deprecated
     * Get the generation time for each block.
     * If the blockchain node runs in vbft, the result is null cause the time is not fixed.
     */
    // getGenerateBlockTime(): Promise<any> {
    //     const req = this.makeRequest('getgenerateblocktime');
    //     return axios.post(this.url, req).then((res) => {
    //         return res.data;
    //     });
    // }
    /**
     * Get the nodes count.
     */
    getNodeCount() {
        const req = this.makeRequest('getconnectioncount');
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get the current block height.
     */
    getBlockHeight() {
        const req = this.makeRequest('getblockcount');
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get the all blocks count.
     */
    getBlockCount() {
        const req = this.makeRequest('getblockcount');
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get block info by block's height or hash.
     * The result is json.
     * @param value Block's hash or height
     */
    getBlockJson(value) {
        const req = this.makeRequest('getblock', value, 1);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get contract info by contract' code hash.
     * The result is hex encoded string.
     * @param hash Contract's code hash.
     */
    getContract(hash) {
        const req = this.makeRequest('getcontractstate', hash);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get contract info by contract's code hash.
     * The result is json.
     * @param codeHash Contract's code hash.
     */
    getContractJson(codeHash) {
        const req = this.makeRequest('getcontractstate', codeHash, 1);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get block info by block's height or hash.
     * The result is hex encoded string.
     *
     * @param value Block's height or hash
     */
    getBlock(value) {
        const req = this.makeRequest('getblock', value);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get smart contract event.
     * If parameter is transaction's hash, the result is the event of that transaction.
     * If parameter is block's height, the result is all the events of that block.
     *
     * @param value Transaction's hash or block's height
     */
    getSmartCodeEvent(value) {
        const req = this.makeRequest('getsmartcodeevent', value);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get block height by transaction hash
     * @param txHash Reversed transaction hash
     */
    getBlockHeightByTxHash(txHash) {
        const req = this.makeRequest('getblockheightbytxhash', txHash);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get stored value in smart contract by contract's code hash and the key.
     * @param codeHash Contract's code hash
     * @param key Key of stored value
     */
    getStorage(codeHash, key) {
        const req = this.makeRequest('getstorage', codeHash, key);
        // tslint:disable-next-line:no-console
        console.log(req);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get merkle proof by transaction hash.
     * @param hash Reversed transaction hash
     */
    getMerkleProof(hash) {
        const req = this.makeRequest('getmerkleproof', hash);
        // tslint:disable-next-line:no-console
        console.log(this.url);
        // tslint:disable-next-line:no-console
        console.log(req);
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
    /**
     * Get allowanece
     * @param asset Asset's type.Only ONT and ONG supported.
     * @param from Address of allowance's sender.
     * @param to Address of allowance's receiver.
     */
    getAllowance(asset, from, to) {
        if (asset !== 'ont' && asset !== 'ong') {
            throw _error__WEBPACK_IMPORTED_MODULE_2__["ERROR_CODE"].INVALID_PARAMS;
        }
        const req = this.makeRequest('getallowance', asset, from.toBase58(), to.toBase58());
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, req).then(res => {
            return res.data;
        });
    }
}

/***/ }),

/***/ "./src/network/websocket/deferred.ts":
/*!*******************************************!*\
  !*** ./src/network/websocket/deferred.ts ***!
  \*******************************************/
/*! exports provided: Deferred */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deferred", function() { return Deferred; });
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
// tslint:disable:variable-name
class Deferred {
    constructor() {
        this.resolve = value => {
            this._resolve(value);
        };
        this.reject = reason => {
            this._reject(reason);
        };
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    get promise() {
        return this._promise;
    }
}

/***/ }),

/***/ "./src/network/websocket/websocketBuilder.ts":
/*!***************************************************!*\
  !*** ./src/network/websocket/websocketBuilder.ts ***!
  \***************************************************/
/*! exports provided: sendHeartBeat, sendSubscribe, sendRawTransaction, getRawTransaction, getRawTransactionJson, getNodeCount, getBlockHeight, getBlock, getBlockJson, getBalance, getUnboundOng, getContract, getContractJson, getSmartCodeEvent, getBlockHeightByTxHash, getStorage, getMerkleProof, getAllowance, getBlockHash, getBlockTxsByHeight, getGasPrice, getGrantOng, getMempoolTxCount, getMempoolTxState, getVersion, getNetworkId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendHeartBeat", function() { return sendHeartBeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendSubscribe", function() { return sendSubscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendRawTransaction", function() { return sendRawTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRawTransaction", function() { return getRawTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRawTransactionJson", function() { return getRawTransactionJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeCount", function() { return getNodeCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockHeight", function() { return getBlockHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlock", function() { return getBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockJson", function() { return getBlockJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBalance", function() { return getBalance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnboundOng", function() { return getUnboundOng; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContract", function() { return getContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContractJson", function() { return getContractJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSmartCodeEvent", function() { return getSmartCodeEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockHeightByTxHash", function() { return getBlockHeightByTxHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorage", function() { return getStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMerkleProof", function() { return getMerkleProof; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllowance", function() { return getAllowance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockHash", function() { return getBlockHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockTxsByHeight", function() { return getBlockTxsByHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGasPrice", function() { return getGasPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGrantOng", function() { return getGrantOng; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMempoolTxCount", function() { return getMempoolTxCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMempoolTxState", function() { return getMempoolTxState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVersion", function() { return getVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNetworkId", function() { return getNetworkId; });
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
// const generateReqId = () => {
//     return Math.floor(Math.random() * 10e8);
// };
function sendHeartBeat() {
    const param = {
        Action: 'heartbeat',
        Version: 'V1.0.0'
    };
    return param;
}
function sendSubscribe(subscribeEvent = false, subscribeJsonBlock = false, subscribeRawBlock = false, subscribeBlockTxHashes = false) {
    const param = {
        Action: 'subscribe',
        Version: '1.0.0',
        SubscribeEvent: subscribeEvent,
        SubscribeJsonBlock: subscribeJsonBlock,
        SubscribeRawBlock: subscribeRawBlock,
        SubscribeBlockTxHashs: subscribeBlockTxHashes // optional
    };
    return param;
}
function sendRawTransaction(hexData, preExec = false) {
    let param = {
        Action: 'sendrawtransaction',
        Version: '1.0.0',
        Data: hexData
    };
    if (preExec) {
        param = Object.assign(param, { PreExec: '1' });
    }
    return param;
}
function getRawTransaction(txHash) {
    const param = {
        Action: 'gettransaction',
        Version: '1.0.0',
        Hash: txHash,
        Raw: '1'
    };
    return param;
}
function getRawTransactionJson(txHash) {
    const param = {
        Action: 'gettransaction',
        Version: '1.0.0',
        Hash: txHash,
        Raw: '0'
    };
    return param;
}
// export function getGenerateBlockTime() {
//     const param = {
//         Action: 'getgenerateblocktime',
//         Version: '1.0.0'
//     };
//     return param;
// }
function getNodeCount() {
    const param = {
        Action: 'getconnectioncount',
        Version: '1.0.0'
    };
    return param;
}
function getBlockHeight() {
    const param = {
        Action: 'getblockheight',
        Version: '1.0.0'
    };
    return param;
}
function getBlock(value) {
    let param = {};
    if (typeof value === 'number') {
        param = {
            Action: 'getblockbyheight',
            Version: '1.0.0',
            Height: value,
            Raw: '1'
        };
    } else if (typeof value === 'string') {
        param = {
            Action: 'getblockbyhash',
            Version: '1.0.0',
            Hash: value,
            Raw: '1'
        };
    }
    return param;
}
function getBlockJson(value) {
    let param = {};
    if (typeof value === 'number') {
        param = {
            Action: 'getblockbyheight',
            Version: '1.0.0',
            Height: value
        };
    } else if (typeof value === 'string') {
        param = {
            Action: 'getblockbyhash',
            Version: '1.0.0',
            Hash: value
        };
    }
    return param;
}
function getBalance(address) {
    const param = {
        Action: 'getbalance',
        Version: '1.0.0',
        Addr: address.toBase58()
    };
    return param;
}
function getUnboundOng(address) {
    const param = {
        Action: 'getunboundong',
        Version: '1.0.0',
        Addr: address.toBase58()
    };
    return param;
}
function getContract(hash) {
    const param = {
        Action: 'getcontract',
        Version: '1.0.0',
        Hash: hash,
        Raw: '1'
    };
    return param;
}
function getContractJson(hash) {
    const param = {
        Action: 'getcontract',
        Version: '1.0.0',
        Hash: hash,
        Raw: '0'
    };
    return param;
}
function getSmartCodeEvent(value) {
    let param = {};
    if (typeof value === 'number') {
        param = {
            Action: 'getsmartcodeeventbyheight',
            Version: '1.0.0',
            Height: value
        };
    } else if (typeof value === 'string') {
        param = {
            Action: 'getsmartcodeeventbyhash',
            Version: '1.0.0',
            Hash: value
        };
    }
    return param;
}
function getBlockHeightByTxHash(hash) {
    const param = {
        Action: 'getblockheightbytxhash',
        Version: '1.0.0',
        Hash: hash
    };
    return param;
}
function getStorage(codeHash, key) {
    const param = {
        Action: 'getstorage',
        Version: '1.0.0',
        Hash: codeHash,
        Key: key
    };
    return param;
}
function getMerkleProof(hash) {
    const param = {
        Action: 'getmerkleproof',
        Version: '1.0.0',
        Hash: hash
    };
    return param;
}
function getAllowance(asset, from, to) {
    const param = {
        Action: 'getallowance',
        Version: '1.0.0',
        Asset: asset,
        From: from.toBase58(),
        To: to.toBase58()
    };
    return param;
}
function getBlockHash(value) {
    const param = {
        Action: 'getblockhash',
        Version: '1.0.0',
        Height: value
    };
    return param;
}
function getBlockTxsByHeight(value) {
    const param = {
        Action: 'getblocktxsbyheight',
        Version: '1.0.0',
        Height: value
    };
    return param;
}
function getGasPrice() {
    const param = {
        Action: 'getgasprice',
        Version: '1.0.0'
    };
    return param;
}
function getGrantOng(address) {
    const param = {
        Action: 'getgrantong',
        Version: '1.0.0',
        Addr: address.toBase58()
    };
    return param;
}
function getMempoolTxCount() {
    const param = {
        Action: 'getmempooltxcount',
        Version: '1.0.0'
    };
    return param;
}
function getMempoolTxState(txHash) {
    const param = {
        Action: 'getmempooltxstate',
        Version: '1.0.0',
        Hash: txHash
    };
    return param;
}
function getVersion() {
    const param = {
        Action: 'getversion',
        Version: '1.0.0'
    };
    return param;
}
function getNetworkId() {
    const param = {
        Action: 'getnetworkid',
        Version: '1.0.0'
    };
    return param;
}

/***/ }),

/***/ "./src/network/websocket/websocketClient.ts":
/*!**************************************************!*\
  !*** ./src/network/websocket/websocketClient.ts ***!
  \**************************************************/
/*! exports provided: WebsocketClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketClient", function() { return WebsocketClient; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../consts */ "./src/consts.ts");
/* harmony import */ var _deferred__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deferred */ "./src/network/websocket/deferred.ts");
/* harmony import */ var _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./websocketBuilder */ "./src/network/websocket/websocketBuilder.ts");
/* harmony import */ var _websocketSender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./websocketSender */ "./src/network/websocket/websocketSender.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */




/**
 * Websocket client.
 *
 * TODO: correlate request and response with id, so socket can be reused.
 */
class WebsocketClient {
    constructor(url = _consts__WEBPACK_IMPORTED_MODULE_0__["TEST_ONT_URL"].SOCKET_URL, debug = false, autoClose = true) {
        this.autoClose = autoClose;
        this.promises = new Map();
        this.sender = new _websocketSender__WEBPACK_IMPORTED_MODULE_3__["WebsocketSender"](url, debug);
        this.sender.addListener(this.notifyListener.bind(this));
    }
    /**
     * Send heart beat request
     */
    async sendHeartBeat() {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["sendHeartBeat"]();
        return this.send(raw);
    }
    /**
     * Send subscribe request
     * @param subscribeEvent
     * @param subscribeJsonBlock
     * @param subscribeRawBlock
     * @param subscribeBlockTxHashes
     */
    async sendSubscribe(subscribeEvent = false, subscribeJsonBlock = false, subscribeRawBlock = false, subscribeBlockTxHashes = false) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["sendSubscribe"](subscribeEvent, subscribeJsonBlock, subscribeRawBlock, subscribeBlockTxHashes);
        return this.send(raw);
    }
    /**
     * Send raw transaction
     * @param hexData Hex encoded data
     * @param preExec Decides if it is a pre-executed transaction
     * @param waitNotify Decides if client waits for notify from blockchain before closing
     */
    async sendRawTransaction(hexData, preExec = false, waitNotify = false) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["sendRawTransaction"](hexData, preExec);
        const sendResult = await this.send(raw, this.autoClose && !waitNotify);
        if (sendResult.Error !== 0) {
            // tslint:disable-next-line:no-console
            console.log(sendResult);
            throw new Error(JSON.stringify(sendResult));
        }
        if (waitNotify) {
            const txHash = sendResult.Result;
            const deferred = new _deferred__WEBPACK_IMPORTED_MODULE_1__["Deferred"]();
            this.promises.set(txHash, deferred);
            return deferred.promise;
        } else {
            return sendResult;
        }
    }
    /**
     * Get raw transaction by transaction hash.
     * The result is hex encoded transaction.
     * @param txHash Reversed transaction hash
     */
    async getRawTransaction(txHash) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getRawTransaction"](txHash);
        return this.send(raw);
    }
    /**
     * Get transaction info by transaction hash.
     * The result is json.
     * @param txHash Reversed transaction hash
     */
    async getRawTransactionJson(txHash) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getRawTransactionJson"](txHash);
        return this.send(raw);
    }
    /** Deprecated
     * Get the generation time for each block.
     * If the blockchain node runs in vbft, the result is null.
     */
    // async getGenerateBlockTime(): Promise<any> {
    //     const raw = Builder.getGenerateBlockTime();
    //     return this.send(raw);
    // }
    /**
     * Get Nodes count
     */
    async getNodeCount() {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getNodeCount"]();
        return this.send(raw);
    }
    /**
     * Get current block height
     */
    async getBlockHeight() {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getBlockHeight"]();
        return this.send(raw);
    }
    /**
     * Get block's info by block's height or hash.
     * The result is hex encoded string.
     * @param value Block's height or hash
     */
    async getBlock(value) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getBlock"](value);
        return this.send(raw);
    }
    /**
     * Get block's info by block's height or hash.
     * The result is json.
     * @param value Block's height or hash
     */
    async getBlockJson(value) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getBlockJson"](value);
        return this.send(raw);
    }
    /**
     * Get the balance of some address.
     * The result contains ONT and ONG.
     * @param address Address
     */
    async getBalance(address) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getBalance"](address);
        return this.send(raw);
    }
    /**
     * Get unbound ong of this address
     * The result contains ONG.
     * @param address Address
     */
    async getUnboundong(address) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getUnboundOng"](address);
        return this.send(raw);
    }
    /**
     * Get contract info by code hash.
     * The result is hex encoded string.
     * @param hash Contract's code hash.
     */
    async getContract(hash) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getContract"](hash);
        return this.send(raw);
    }
    /**
     * Get contract's info by code hash
     * The result is json.
     * @param hash Contract's code hash
     */
    async getContractJson(hash) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getContractJson"](hash);
        return this.send(raw);
    }
    /**
     * Get smart conde event by transaction hash or block's height.
     * If parameter is transaction hash, the result is the event of that transaction.
     * If parameter is block's height, the result is all the events of that block.
     * @param value Reversed transaction hash or block's height
     */
    async getSmartCodeEvent(value) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getSmartCodeEvent"](value);
        return this.send(raw);
    }
    /**
     * Get block's height by transaction hash
     * @param hash Reversed transaction hash
     */
    async getBlockHeightByTxHash(hash) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getBlockHeightByTxHash"](hash);
        return this.send(raw);
    }
    /**
     * Get stored value in smart contract by contract's code hash and the key.
     * @param codeHash Contract's code hash
     * @param key Key of stored value
     */
    async getStorage(codeHash, key) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getStorage"](codeHash, key);
        return this.send(raw);
    }
    /**
     * Get merkle proof by transaction hash.
     * @param hash Reversed transaction hash
     */
    async getMerkleProof(hash) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getMerkleProof"](hash);
        return this.send(raw);
    }
    /**
     * Get allowanece
     * @param asset Asset's type.Only ONT and ONG supported.
     * @param from Address of allowance's sender.
     * @param to Address of allowance's receiver.
     */
    async getAllowance(asset, from, to) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getAllowance"](asset, from, to);
        return this.send(raw);
    }
    /**
     * Get block hash by block height
     * @param height Height of the block
     */
    async getBlockHash(height) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getBlockHash"](height);
        return this.send(raw);
    }
    /**
     * Return all transaction hash contained in the block corresponding to this height
     * @param height Height of the block
     */
    async getBlockTxsByHeight(height) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getBlockTxsByHeight"](height);
        return this.send(raw);
    }
    /**
     * Return the state of transaction locate in memory
     */
    async getGasPrice() {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getGasPrice"]();
        return this.send(raw);
    }
    /**
     * Get grant ong
     * @param address Address
     */
    async getGrantOng(address) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getGrantOng"](address);
        return this.send(raw);
    }
    /**
     * Query the transaction count in the memory pool
     */
    async getMempoolTxCount() {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getMempoolTxCount"]();
        return this.send(raw);
    }
    /**
     * Query the transaction state in the memory pool
     */
    async getMempoolTxState(txHash) {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getMempoolTxState"](txHash);
        return this.send(raw);
    }
    /**
     * Get the version information of the node
     */
    async getVersion() {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getVersion"]();
        return this.send(raw);
    }
    /**
     * Get the network id
     */
    async getNetworkId() {
        const raw = _websocketBuilder__WEBPACK_IMPORTED_MODULE_2__["getNetworkId"]();
        return this.send(raw);
    }
    /**
     * Adds listener for Notify messages.
     *
     * Be careful to not set autoClose = true and close the websocket on your own.
     * @param listener Listener
     */
    addNotifyListener(listener) {
        this.sender.addListener(result => {
            if (result.Action === 'Notify') {
                listener(result);
            }
        });
    }
    /**
     * Close the websocket manually.
     */
    close() {
        this.sender.close();
    }
    /**
     * Send msg to blockchain
     * @param raw Message to send
     * @param close Automaticly close connection if also autoClose is specified
     */
    async send(raw, close = this.autoClose) {
        return this.sender.send(raw, close);
    }
    notifyListener(result) {
        if (result.Action === 'Notify') {
            const txHash = result.Result.TxHash;
            if (txHash !== undefined) {
                const promise = this.promises.get(txHash);
                if (promise !== undefined) {
                    this.promises.delete(txHash);
                    promise.resolve(result);
                } else {
                    // tslint:disable-next-line:no-console
                    console.warn('Received Notify event for unknown transaction');
                }
                if (this.autoClose) {
                    this.sender.close();
                }
            }
        }
    }
}

/***/ }),

/***/ "./src/network/websocket/websocketSender.ts":
/*!**************************************************!*\
  !*** ./src/network/websocket/websocketSender.ts ***!
  \**************************************************/
/*! exports provided: WebsocketSender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketSender", function() { return WebsocketSender; });
/* harmony import */ var _ont_community_html5_websocket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ont-community/html5-websocket */ "@ont-community/html5-websocket");
/* harmony import */ var _ont_community_html5_websocket__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ont_community_html5_websocket__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var websocket_as_promised__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! websocket-as-promised */ "websocket-as-promised");
/* harmony import */ var websocket_as_promised__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(websocket_as_promised__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../consts */ "./src/consts.ts");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */



/**
 * We can import html5-websocket directly, because webpack will use html5-websocket/browser.js
 * in browser environment, which does not require 'ws'.
 */
/**
 * Websocket sender for send messages and handle notify.
 */
class WebsocketSender {
    static generateReqId() {
        return Math.floor(Math.random() * 10e8);
    }
    constructor(url = _consts__WEBPACK_IMPORTED_MODULE_2__["TEST_ONT_URL"].SOCKET_URL, debug = false) {
        this.debug = debug;
        this.wsp = new websocket_as_promised__WEBPACK_IMPORTED_MODULE_1__(url, {
            createWebSocket: socketUrl => new _ont_community_html5_websocket__WEBPACK_IMPORTED_MODULE_0__(socketUrl),
            attachRequestId: (data, id) => _extends({ Id: id }, data),
            extractRequestId: data => data && data.Id,
            packMessage: data => JSON.stringify(data),
            unpackMessage: message => JSON.parse(message)
        });
        this.wsp.onOpen.addListener(() => {
            if (this.debug) {
                // tslint:disable-next-line:no-console
                console.log('connected');
            }
        });
        this.wsp.onClose.addListener(() => {
            if (this.debug) {
                // tslint:disable-next-line:no-console
                console.log('disconnected');
            }
        });
        this.wsp.onSend.addListener(message => {
            if (this.debug) {
                // tslint:disable-next-line:no-console
                console.log('sent: ', message);
            }
        });
        this.wsp.onMessage.addListener(message => {
            if (this.debug) {
                // tslint:disable-next-line:no-console
                console.log('received: ', message);
            }
        });
        this.wsp.onError.addListener(event => {
            if (this.debug) {
                // tslint:disable-next-line:no-console
                console.log('error: ', event);
            }
        });
    }
    async send(param, close = true) {
        try {
            if (!param) {
                return;
            }
            await this.wsp.open();
            const response = await this.wsp.sendRequest(param, { requestId: WebsocketSender.generateReqId() });
            return response;
        } finally {
            if (close) {
                await this.wsp.close();
            }
        }
    }
    addListener(listener) {
        this.wsp.onUnpackedMessage.addListener(listener);
    }
    close() {
        this.wsp.close();
    }
}

/***/ }),

/***/ "./src/scrypt.ts":
/*!***********************!*\
  !*** ./src/scrypt.ts ***!
  \***********************/
/*! exports provided: encryptWithCtr, decryptWithCtr, checkCtrDecrypted, encryptWithEcb, decryptWithEcb, checkEcbDecrypted, encryptWithGcm, decryptWithGcm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encryptWithCtr", function() { return encryptWithCtr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decryptWithCtr", function() { return decryptWithCtr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkCtrDecrypted", function() { return checkCtrDecrypted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encryptWithEcb", function() { return encryptWithEcb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decryptWithEcb", function() { return decryptWithEcb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkEcbDecrypted", function() { return checkEcbDecrypted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encryptWithGcm", function() { return encryptWithGcm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decryptWithGcm", function() { return decryptWithGcm; });
/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bs58 */ "bs58");
/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bs58__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto-js */ "crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scrypt_async__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scrypt-async */ "scrypt-async");
/* harmony import */ var scrypt_async__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(scrypt_async__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");
/* harmony import */ var _crypto_address__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./crypto/address */ "./src/crypto/address.ts");
/* harmony import */ var _crypto_PublicKey__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./crypto/PublicKey */ "./src/crypto/PublicKey.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./error */ "./src/error.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */









/**
 * Synchronious call to scrypt-async-js.
 *
 * @param keyphrase Keyphrase to use
 * @param addressHash Hex encoded address
 * @param params Scrypt params
 */
function scrypt(keyphrase, addressHash, params) {
    let derived = [];
    scrypt_async__WEBPACK_IMPORTED_MODULE_3__(keyphrase.normalize('NFC'), Object(_utils__WEBPACK_IMPORTED_MODULE_8__["hexstring2ab"])(addressHash), {
        N: params.cost,
        r: params.blockSize,
        p: params.parallel,
        dkLen: params.size
    }, result => {
        derived = result;
    });
    return new Buffer(derived);
}
/**
 * Encrypt with aes-ctr
 */
function encryptWithCtr(privateKey, publicKeyEncoded, keyphrase, scryptParams = _consts__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_SCRYPT"]) {
    // let privateKey = PrivateKey.deserializeWIF(wifKey);
    // console.log( "privateKey: ", privateKey );
    // console.log( "publickeyEncode: ", publicKey );
    const publicKey = _crypto_PublicKey__WEBPACK_IMPORTED_MODULE_6__["PublicKey"].deserializeHex(new _utils__WEBPACK_IMPORTED_MODULE_8__["StringReader"](publicKeyEncoded));
    const address = _crypto_address__WEBPACK_IMPORTED_MODULE_5__["Address"].fromPubKey(publicKey);
    // console.log( "address: ", address );
    const addresshash = address.getB58Checksum();
    // console.log( "addresshash: ", addresshash );
    // Scrypt
    const derived = scrypt(keyphrase, addresshash, scryptParams).toString('hex');
    const derived1 = derived.slice(0, 32);
    const derived2 = derived.slice(64);
    const iv = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(derived1);
    // console.log('decrypt derived: ' + derived)
    // console.log('decrypt iv: ' + iv)
    // console.log('decrypt derived2: ' + derived2)
    // AES Encrypt
    // let xor = hexXor(privateKey, derived1);
    const encrypted = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].encrypt(crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(privateKey), crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(derived2), { mode: crypto_js__WEBPACK_IMPORTED_MODULE_2__["mode"].CTR, padding: crypto_js__WEBPACK_IMPORTED_MODULE_2__["pad"].NoPadding, iv });
    // console.log( "encrypted: ", encrypted.ciphertext.toString() );
    // Construct
    // let assembled = OEP_HEADER + OEP_FLAG + addresshash + encrypted.ciphertext.toString();
    const assembled = encrypted.ciphertext.toString();
    // console.log( "enc assembled: ", assembled );
    // return Bs58check.encode(Buffer.from(assembled, 'hex'));
    return new Buffer(assembled, 'hex').toString('base64');
}
/**
 * Decrypt with aes-ctr
 * @param encryptedKey encrypted private key
 * @param keyphrase user's password to encrypt private key
 * @param saltOrAddress 4 hex encoded bytes salt or Address object
 */
function decryptWithCtr(encryptedKey, keyphrase, saltOrAddress, scryptParams = _consts__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_SCRYPT"]) {
    // let assembled = ab2hexstring(Bs58check.decode(encryptedKey));
    const encrypted = Buffer.from(encryptedKey, 'base64').toString('hex');
    // tslint:disable-next-line:no-console
    // console.log('dec assembled: ', encrypted);
    let salt = '';
    if (typeof saltOrAddress === 'string' && saltOrAddress.length === 8) {
        salt = saltOrAddress;
    } else if (saltOrAddress instanceof _crypto_address__WEBPACK_IMPORTED_MODULE_5__["Address"]) {
        salt = saltOrAddress.getB58Checksum();
    } else {
        throw _error__WEBPACK_IMPORTED_MODULE_7__["ERROR_CODE"].INVALID_PARAMS;
    }
    // let addressHash = assembled.substr(0, 8);
    // console.log( "dec addressHash: ", addressHash );
    // let encrypted = assembled.substr(8);
    // console.log( "encrypted: ", encrypted );
    // Scrypt
    const derived = scrypt(keyphrase, salt, scryptParams).toString('hex');
    const derived1 = derived.slice(0, 32);
    const derived2 = derived.slice(64);
    // console.log('decrypt derived: ' + derived)
    const iv = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(derived1);
    // AES Decrypt
    const ciphertexts = { ciphertext: crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(encrypted), salt: '', iv: '' };
    const decrypted = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].decrypt(ciphertexts, crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(derived2), { mode: crypto_js__WEBPACK_IMPORTED_MODULE_2__["mode"].CTR, padding: crypto_js__WEBPACK_IMPORTED_MODULE_2__["pad"].NoPadding, iv });
    // console.log( "decrypted: ", decrypted.toString() );
    // Check PrivateKey
    // ----------------------------------------------------------
    // PrivateKey
    // let privateKey = hexXor(decrypted.toString(), derived1);
    const privateKey = decrypted.toString();
    // console.log( "privateKey: ", privateKey );
    return privateKey;
}
/**
 * Checks if the password supplied to decrypt was correct.
 *
 * This method was taken out from decrypt, because it needs to create public key from private key
 * and it needs to be supplied from outside.
 *
 * @param saltOrAddress 4 hex encoded bytes salt or Address object
 * @param publicKeyEncoded Public key from decrypted key
 */
function checkCtrDecrypted(saltOrAddress, publicKeyEncoded) {
    // const assembled = ab2hexstring(Bs58check.decode(encryptedKey));
    // let assembled = Buffer.from(encryptedKey, 'base64').toString('hex')
    // console.log( "assembled: ", assembled );
    // const addressHash = assembled.substr(0, 8);
    // console.log( "addressHash: ", addressHash );
    // console.log('publicKey', publicKey)
    let salt = '';
    if (typeof saltOrAddress === 'string' && saltOrAddress.length === 8) {
        salt = saltOrAddress;
    } else if (saltOrAddress instanceof _crypto_address__WEBPACK_IMPORTED_MODULE_5__["Address"]) {
        salt = saltOrAddress.getB58Checksum();
    } else {
        throw _error__WEBPACK_IMPORTED_MODULE_7__["ERROR_CODE"].INVALID_PARAMS;
    }
    const publicKey = _crypto_PublicKey__WEBPACK_IMPORTED_MODULE_6__["PublicKey"].deserializeHex(new _utils__WEBPACK_IMPORTED_MODULE_8__["StringReader"](publicKeyEncoded));
    // Address
    const address = _crypto_address__WEBPACK_IMPORTED_MODULE_5__["Address"].fromPubKey(publicKey);
    // console.log('address 2', address)
    // AddressHash
    const saltNew = address.getB58Checksum();
    if (saltNew !== salt) {
        // tslint:disable-next-line:no-console
        console.log('keyphrase error.');
        throw _error__WEBPACK_IMPORTED_MODULE_7__["ERROR_CODE"].Decrypto_ERROR;
    }
    // WIF
    // let wifKey = privateKey.serializeWIF();
    // console.log( "wifKey: ", wifKey );
}
/**
 * Encrypt with aes-ecb
 */
function encryptWithEcb(privateKey, publicKeyEncoded, keyphrase, scryptParams = _consts__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_SCRYPT"]) {
    const publicKey = _crypto_PublicKey__WEBPACK_IMPORTED_MODULE_6__["PublicKey"].deserializeHex(new _utils__WEBPACK_IMPORTED_MODULE_8__["StringReader"](publicKeyEncoded));
    const address = _crypto_address__WEBPACK_IMPORTED_MODULE_5__["Address"].fromPubKey(publicKey);
    // console.log( "address: ", address );
    const addresshash = address.getB58Checksum();
    // console.log( "addresshash: ", addresshash );
    // Scrypt
    const derived = scrypt(keyphrase, addresshash, scryptParams).toString('hex');
    const derived1 = derived.slice(0, 64);
    const derived2 = derived.slice(64);
    // AES Encrypt
    const xor = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["hexXor"])(privateKey, derived1);
    const encrypted = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].encrypt(crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(xor), crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(derived2), { mode: crypto_js__WEBPACK_IMPORTED_MODULE_2__["mode"].ECB, padding: crypto_js__WEBPACK_IMPORTED_MODULE_2__["pad"].NoPadding });
    // console.log( "encrypted: ", encrypted.ciphertext.toString() );
    // Construct
    const assembled = _consts__WEBPACK_IMPORTED_MODULE_4__["OEP_HEADER"] + _consts__WEBPACK_IMPORTED_MODULE_4__["OEP_FLAG"] + addresshash + encrypted.ciphertext.toString();
    // console.log( "assembled: ", assembled );
    return bs58__WEBPACK_IMPORTED_MODULE_0__["encode"](Buffer.from(assembled, 'hex'));
}
/**
 * Decrypt with aes-ecb
 */
function decryptWithEcb(encryptedKey, keyphrase, scryptParams = _consts__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_SCRYPT"]) {
    const assembled = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["ab2hexstring"])(bs58__WEBPACK_IMPORTED_MODULE_0__["decode"](encryptedKey));
    // console.log( "assembled: ", assembled );
    const addressHash = assembled.substr(6, 8);
    // console.log( "addressHash: ", addressHash );
    const encrypted = assembled.substr(-64);
    // console.log( "encrypted: ", encrypted );
    // Scrypt
    const derived = scrypt(keyphrase, addressHash, scryptParams).toString('hex');
    const derived1 = derived.slice(0, 64);
    const derived2 = derived.slice(64);
    // AES Decrypt
    const ciphertexts = { ciphertext: crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(encrypted), salt: '', iv: '' };
    const decrypted = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].decrypt(ciphertexts, crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(derived2), { mode: crypto_js__WEBPACK_IMPORTED_MODULE_2__["mode"].ECB, padding: crypto_js__WEBPACK_IMPORTED_MODULE_2__["pad"].NoPadding });
    // console.log( "decrypted: ", decrypted.toString() );
    // Check PrivateKey
    // ----------------------------------------------------------
    // PrivateKey
    const privateKey = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["hexXor"])(decrypted.toString(), derived1);
    // console.log( "privateKey: ", privateKey );
    return privateKey;
}
/**
 * Checks if the password supplied to decrypt was correct.
 *
 * This method was taken out from decrypt, because it needs to create public key from private key
 * and it needs to be supplied from outside.
 *
 * @param encryptedKey Original encrypted key
 * @param decryptedKey Decrypted key with decrypt
 * @param publicKeyEncoded Public key from decrypted key
 */
function checkEcbDecrypted(encryptedKey, decryptedKey, publicKeyEncoded) {
    const assembled = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["ab2hexstring"])(bs58__WEBPACK_IMPORTED_MODULE_0__["decode"](encryptedKey));
    // console.log( "assembled: ", assembled );
    const addressHash = assembled.substr(6, 8);
    const publicKey = _crypto_PublicKey__WEBPACK_IMPORTED_MODULE_6__["PublicKey"].deserializeHex(new _utils__WEBPACK_IMPORTED_MODULE_8__["StringReader"](publicKeyEncoded));
    // Address
    const address = _crypto_address__WEBPACK_IMPORTED_MODULE_5__["Address"].fromPubKey(publicKey);
    // console.log('address', address)
    // AddressHash
    const addressHashNew = address.getB58Checksum();
    if (addressHashNew !== addressHash) {
        // tslint:disable-next-line:no-console
        console.log('keyphrase error.');
        throw _error__WEBPACK_IMPORTED_MODULE_7__["ERROR_CODE"].Decrypto_ERROR;
    }
}
/**
 * Encrypt with aes-gcm-256
 * This is the default encryption algorithm for private key
 * @param privateKey Private key to encpryt with
 * @param address Adderss to encrypt with
 * @param salt Salt to encrypt with
 * @param keyphrase User's password
 * @param scryptParams Optional params to encrypt
 */
function encryptWithGcm(privateKey, address, salt, keyphrase, scryptParams = _consts__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_SCRYPT"]) {
    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_8__["isHexString"])(privateKey)) {
        throw new Error(_error__WEBPACK_IMPORTED_MODULE_7__["ERROR_CODE"].INVALID_PARAMS + ', Invalid private key');
    }
    const derived = scrypt(keyphrase, salt, scryptParams);
    const derived1 = derived.slice(0, 12);
    const derived2 = derived.slice(32);
    const key = derived2;
    const iv = derived1;
    const aad = new Buffer(address.toBase58());
    const cipher = Object(crypto__WEBPACK_IMPORTED_MODULE_1__["createCipheriv"])('aes-256-gcm', key, iv);
    cipher.setAAD(aad);
    const plainText = Buffer.from(privateKey, 'hex');
    let ciphertext = cipher.update(plainText);
    // ciphertext += cipher.final();
    const final = cipher.final();
    const authTag = cipher.getAuthTag();
    ciphertext = Buffer.concat([ciphertext, final]);
    const result = Buffer.concat([ciphertext, authTag]);
    return result.toString('base64');
}
/**
 * Decrypt with aes-256-gcm
 * @param encrypted Encrypted private key
 * @param address Address to decrypt with
 * @param salt Salt to decrypt with
 * @param keyphrase User's password
 * @param scryptParams Optioanl params to decrypt with
 */
function decryptWithGcm(
// ciphertext: string,
// authTag: string,
encrypted, address, salt, keyphrase, scryptParams = _consts__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_SCRYPT"]) {
    if (salt.length !== 32) {
        throw _error__WEBPACK_IMPORTED_MODULE_7__["ERROR_CODE"].INVALID_PARAMS;
    }
    const result = Buffer.from(encrypted, 'base64');
    const ciphertext = result.slice(0, result.length - 16);
    const authTag = result.slice(result.length - 16);
    const derived = scrypt(keyphrase, salt, scryptParams);
    const derived1 = derived.slice(0, 12);
    const derived2 = derived.slice(32);
    const key = derived2;
    const iv = derived1;
    const aad = new Buffer(address.toBase58());
    // const auth = new Buffer(authTag, 'hex');
    const decipher = Object(crypto__WEBPACK_IMPORTED_MODULE_1__["createDecipheriv"])('aes-256-gcm', key, iv);
    decipher.setAAD(aad);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(ciphertext).toString('hex');
    try {
        decrypted += decipher.final().toString('hex');
    } catch (err) {
        throw _error__WEBPACK_IMPORTED_MODULE_7__["ERROR_CODE"].Decrypto_ERROR;
    }
    return decrypted;
}

/***/ }),

/***/ "./src/sdk/index.ts":
/*!**************************!*\
  !*** ./src/sdk/index.ts ***!
  \**************************/
/*! exports provided: SDK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDK", function() { return SDK; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bip39 */ "bip39");
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bip39__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../account */ "./src/account.ts");
/* harmony import */ var _claim_claim__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../claim/claim */ "./src/claim/claim.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../consts */ "./src/consts.ts");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../crypto */ "./src/crypto/index.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../error */ "./src/error.ts");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../identity */ "./src/identity.ts");
/* harmony import */ var _neocore_NeoRpc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../neocore/NeoRpc */ "./src/neocore/NeoRpc.ts");
/* harmony import */ var _neocore_Program__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../neocore/Program */ "./src/neocore/Program.ts");
/* harmony import */ var _neocore_SmartContract__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../neocore/SmartContract */ "./src/neocore/SmartContract.ts");
/* harmony import */ var _network_rest_restClient__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../network/rest/restClient */ "./src/network/rest/restClient.ts");
/* harmony import */ var _scrypt__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../scrypt */ "./src/scrypt.ts");
/* harmony import */ var _smartcontract_abi_abiInfo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../smartcontract/abi/abiInfo */ "./src/smartcontract/abi/abiInfo.ts");
/* harmony import */ var _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../smartcontract/abi/parameter */ "./src/smartcontract/abi/parameter.ts");
/* harmony import */ var _smartcontract_nativevm_ontAssetTxBuilder__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../smartcontract/nativevm/ontAssetTxBuilder */ "./src/smartcontract/nativevm/ontAssetTxBuilder.ts");
/* harmony import */ var _smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../smartcontract/nativevm/ontidContractTxBuilder */ "./src/smartcontract/nativevm/ontidContractTxBuilder.ts");
/* harmony import */ var _smartcontract_neovm_oep8TxBuilder__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../smartcontract/neovm/oep8TxBuilder */ "./src/smartcontract/neovm/oep8TxBuilder.ts");
/* harmony import */ var _transaction_ddo__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../transaction/ddo */ "./src/transaction/ddo.ts");
/* harmony import */ var _transaction_transaction__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../transaction/transaction */ "./src/transaction/transaction.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../wallet */ "./src/wallet.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
********************************* Notice ********************************************
*************************************************************************************
* All the methods in this file is only for our native app development!!!
* We do not recommend you to use these methods directly.
* You can refer to these methods or the test cases to implement the same methods.
*************************************************************************************
*************************************************************************************
*/
























// tslint:disable-next-line:no-var-requires
const HDKey = __webpack_require__(/*! @ont-community/hdkey-secp256r1 */ "@ont-community/hdkey-secp256r1");
// tslint:disable:no-unused-expression
// tslint:disable:no-shadowed-variable
// neo contract
const CONTRACT_HASH = 'ceab719b8baa2310f232ee0d277c061704541cfb';
// neo node
const NEO_NODE = 'http://neonode1.ont.network:10332';
// neo abi
// tslint:disable-next-line:max-line-length
const NEP5_ABI = '{"hash":"0x5bb169f915c916a5e30a3c13a5e0cd228ea26826","entrypoint":"Main","functions":[{"name":"Name","parameters":[],"returntype":"String"},{"name":"Symbol","parameters":[],"returntype":"String"},{"name":"Decimals","parameters":[],"returntype":"Integer"},{"name":"Main","parameters":[{"name":"operation","type":"String"},{"name":"args","type":"Array"}],"returntype":"Any"},{"name":"Init","parameters":[],"returntype":"Boolean"},{"name":"TotalSupply","parameters":[],"returntype":"Integer"},{"name":"Transfer","parameters":[{"name":"from","type":"ByteArray"},{"name":"to","type":"ByteArray"},{"name":"value","type":"Integer"}],"returntype":"Boolean"},{"name":"BalanceOf","parameters":[{"name":"address","type":"ByteArray"}],"returntype":"Integer"}],"events":[{"name":"transfer","parameters":[{"name":"arg1","type":"ByteArray"},{"name":"arg2","type":"ByteArray"},{"name":"arg3","type":"Integer"}],"returntype":"Void"}]}';
// neo swap address
// const RECEIVER_ADDR = 'AFmseVrdL9f9oyCzZefL9tG6UbvhPbdYzM';
const NEO_TRAN = 100000000;
class SDK {
    static setServerNode(node) {
        if (node) {
            let url = '';
            if (node.indexOf('http') > -1) {
                url = node.substr('http://'.length);
            } else {
                url = node;
            }
            SDK.SERVER_NODE = url;
            return;
        }
        throw new Error('Can not set ' + node + 'as server node');
    }
    static setRestPort(port) {
        if (port) {
            SDK.REST_PORT = port;
            SDK.restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_11__["default"](`http://${SDK.SERVER_NODE}:${SDK.REST_PORT}`);
            return;
        }
        throw new Error('Can not set ' + port + ' as restful port');
    }
    static setSocketPort(port) {
        if (port) {
            SDK.SOCKET_PORT = port;
            return;
        }
        throw new Error('Can not set ' + port + 'as socket port');
    }
    static getDecryptError(err) {
        return {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].Decrypto_ERROR,
            result: ''
        };
    }
    static transformPassword(password) {
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_21__["isBase64"])(password)) {
            return Buffer.from(password, 'base64').toString();
        }
        return password;
    }
    static createWallet(name, password, payer, gasPrice, gasLimit, callback) {
        const wallet = _wallet__WEBPACK_IMPORTED_MODULE_22__["Wallet"].create(name);
        password = this.transformPassword(password);
        const privateKey = _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"].random();
        const identity = _identity__WEBPACK_IMPORTED_MODULE_7__["Identity"].create(privateKey, password, name);
        wallet.defaultOntid = identity.ontid;
        wallet.addIdentity(identity);
        // let account = new Account()
        // account.create(privateKey, password, name)
        // wallet.addAccount(account)
        const walletDataStr = wallet.toJson();
        let obj = {
            error: 0,
            result: walletDataStr,
            tx: ''
        };
        const publicKey = privateKey.getPublicKey();
        const tx = Object(_smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_16__["buildRegisterOntidTx"])(identity.ontid, publicKey, gasPrice, gasLimit);
        tx.payer = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](payer);
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["signTransaction"])(tx, privateKey);
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        // add preExec
        const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_11__["default"](`http://${SDK.SERVER_NODE}:${SDK.REST_PORT}`);
        return restClient.sendRawTransaction(tx.serialize(), true).then(res => {
            // preExec success, send real request
            if (res.Result.Result === '01') {
                // restClient.sendRawTransaction(tx.serialize(), false)
                obj.tx = tx.serialize();
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
                }
                return obj;
            } else {
                const errResult = {
                    error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].PreExec_ERROR,
                    result: ''
                };
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(errResult), callback);
                }
                return errResult;
            }
        }).catch(err => {
            obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].NETWORK_ERROR,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            }
        });
    }
    static importIdentityWithWallet(label, encryptedPrivateKey, password, address, salt, callback) {
        let obj;
        let identity = new _identity__WEBPACK_IMPORTED_MODULE_7__["Identity"]();
        try {
            // TODO check ontid
            const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
            password = this.transformPassword(password);
            identity = _identity__WEBPACK_IMPORTED_MODULE_7__["Identity"].importIdentity(label, encryptedPrivateKeyObj, password, addr, salt);
        } catch (err) {
            obj = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            }
            return obj;
        }
        obj = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: identity.toJson()
        };
        // check ontid on chain
        const tx = Object(_smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_16__["buildGetDDOTx"])(identity.ontid);
        const param = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["buildRestfulParam"])(tx);
        const restUrl = `http://${SDK.SERVER_NODE}:${SDK.REST_PORT}`;
        const url = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["sendRawTxRestfulUrl"])(restUrl, true);
        // clear privateKey and password
        password = '';
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, param).then(res => {
            const result = res.data.Result;
            if (result.Result) {
                //
            } else {
                obj.error = _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].UNKNOWN_ONTID;
                obj.result = '';
            }
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            }
            return obj;
        }).catch(err => {
            obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].NETWORK_ERROR,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            }
        });
    }
    // send http post to check
    static importIdentityAndCreateWallet(label, encryptedPrivateKey, password, address, salt, callback) {
        let identity = new _identity__WEBPACK_IMPORTED_MODULE_7__["Identity"]();
        let error = {};
        let obj;
        try {
            password = this.transformPassword(password);
            const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
            identity = _identity__WEBPACK_IMPORTED_MODULE_7__["Identity"].importIdentity(label, encryptedPrivateKeyObj, password, addr, salt);
            const wallet = _wallet__WEBPACK_IMPORTED_MODULE_22__["Wallet"].create(identity.label);
            wallet.defaultOntid = identity.ontid;
            wallet.addIdentity(identity);
            const walletStr = wallet.toJson();
            obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                result: walletStr
            };
            // check ontid on chain
            const tx = Object(_smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_16__["buildGetDDOTx"])(identity.ontid);
            const param = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["buildRestfulParam"])(tx);
            const restUrl = `http://${SDK.SERVER_NODE}:${SDK.REST_PORT}`;
            const url = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["sendRawTxRestfulUrl"])(restUrl, true);
            return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, param).then(res => {
                const result = res.data.Result;
                if (result.Result) {
                    //
                } else {
                    obj.error = _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].UNKNOWN_ONTID;
                    obj.result = '';
                }
                // clear privateKey and password
                password = '';
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
                }
                return obj;
            }).catch(err => {
                obj = {
                    error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].NETWORK_ERROR,
                    result: ''
                };
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
                }
            });
            // callback && sendBackResult2Native(JSON.stringify(obj), callback)
            // return obj
        } catch (err) {
            error = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(error), callback);
            }
            return Promise.reject(error);
        }
    }
    static createIdentity(label, password, payer, gasPrice, gasLimit, callback) {
        const privateKey = _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"].random();
        password = this.transformPassword(password);
        const identity = _identity__WEBPACK_IMPORTED_MODULE_7__["Identity"].create(privateKey, password, label);
        const result = identity.toJson();
        let obj = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result,
            tx: ''
        };
        // register ontid
        const publicKey = privateKey.getPublicKey();
        const tx = Object(_smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_16__["buildRegisterOntidTx"])(identity.ontid, publicKey, gasPrice, gasLimit);
        tx.payer = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](payer);
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["signTransaction"])(tx, privateKey);
        password = '';
        privateKey.key = '';
        const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_11__["default"](`http://${SDK.SERVER_NODE}:${SDK.REST_PORT}`);
        return restClient.sendRawTransaction(tx.serialize(), true).then(res => {
            // preExec success, send real request
            if (res.Result.Result === '01') {
                // restClient.sendRawTransaction(tx.serialize(), false)
                obj.tx = tx.serialize();
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
                }
                // clear privateKey and password
                privateKey.key = '';
                password = '';
                return obj;
            } else {
                const errResult = {
                    error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].PreExec_ERROR,
                    result: ''
                };
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(errResult), callback);
                }
                return errResult;
            }
        }).catch(err => {
            obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].NETWORK_ERROR,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            }
        });
    }
    static createAccount(label, password, callback) {
        // generate mnemnic
        let mnemonic = Object(_utils__WEBPACK_IMPORTED_MODULE_21__["generateMnemonic"])();
        password = this.transformPassword(password);
        const mnemonicHex = Object(_utils__WEBPACK_IMPORTED_MODULE_21__["str2hexstr"])(mnemonic);
        const privateKey = _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"].generateFromMnemonic(mnemonic);
        const account = _account__WEBPACK_IMPORTED_MODULE_2__["Account"].create(privateKey, password, label);
        const addr = account.address;
        const salt = Buffer.from(account.salt, 'base64').toString('hex');
        const mnemonicEnc = _scrypt__WEBPACK_IMPORTED_MODULE_12__["encryptWithGcm"](mnemonicHex, addr, salt, password);
        const result = account.toJson();
        const obj = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result,
            mnemonicEnc
        };
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
        }
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        mnemonic = '';
        return obj;
    }
    static decryptMnemonicEnc(mnemonicEnc, address, salt, password, callback) {
        let obj;
        password = this.transformPassword(password);
        const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
        const saltHex = Buffer.from(salt, 'base64').toString('hex');
        const decMneHex = _scrypt__WEBPACK_IMPORTED_MODULE_12__["decryptWithGcm"](mnemonicEnc, addr, saltHex, password);
        const decMne = Object(_utils__WEBPACK_IMPORTED_MODULE_21__["hexstr2str"])(decMneHex);
        obj = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: decMne
        };
        // tslint:disable-next-line:no-unused-expression
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
        return obj;
    }
    static importAccountWithWallet(label, encryptedPrivateKey, address, salt, password, callback) {
        let account = new _account__WEBPACK_IMPORTED_MODULE_2__["Account"]();
        password = this.transformPassword(password);
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        try {
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
            account = _account__WEBPACK_IMPORTED_MODULE_2__["Account"].importAccount(label, encryptedPrivateKeyObj, password, addr, salt);
        } catch (err) {
            const result = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        const obj = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: account.toJson()
        };
        // add address check
        if (address !== account.address.toBase58()) {
            obj.error = _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_ADDR, obj.result = '';
        }
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
        }
        // clear privateKey and password
        password = '';
        return obj;
    }
    static signSelfClaim(context, claimData, ontid, encryptedPrivateKey, password, address, salt, callback) {
        let privateKey;
        password = this.transformPassword(password);
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        const restUrl = `http://${SDK.SERVER_NODE}:${SDK.REST_PORT}${_consts__WEBPACK_IMPORTED_MODULE_4__["REST_API"].sendRawTx}`;
        try {
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            privateKey = encryptedPrivateKeyObj.decrypt(password, addr, saltHex);
        } catch (err) {
            const result = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        // const claimDataObj = JSON.parse(claimData);
        const metadata = {
            issuer: ontid,
            subject: ontid,
            issuedAt: Object(_utils__WEBPACK_IMPORTED_MODULE_21__["now"])()
        };
        // todo: pass real public key id
        const publicKeyId = ontid + '#keys-1';
        const claim = new _claim_claim__WEBPACK_IMPORTED_MODULE_3__["Claim"](metadata, undefined, undefined);
        claim.sign(restUrl, publicKeyId, privateKey);
        const obj = {
            error: 0,
            result: claim
        };
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
        }
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        return obj;
    }
    static decryptEncryptedPrivateKey(encryptedPrivateKey, password, address, salt, callback) {
        password = this.transformPassword(password);
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        let pri;
        try {
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            pri = encryptedPrivateKeyObj.decrypt(password, addr, saltHex);
        } catch (err) {
            const result = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        const obj = {
            error: 0,
            result: pri.key
        };
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
        }
        // clear privateKey and password
        password = '';
        return obj;
    }
    static getClaim(claimId, context, issuer, subject, encryptedPrivateKey, password, address, salt, payer, gasPrice, gasLimit, callback) {
        let privateKey;
        password = this.transformPassword(password);
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        try {
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            privateKey = encryptedPrivateKeyObj.decrypt(password, addr, saltHex);
        } catch (err) {
            const result = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        const path = 'claim' + claimId;
        const valueObj = {
            Type: 'JSON',
            Value: {
                Context: context,
                Issuer: issuer
            }
        };
        // const type = 'JSON';
        const value = JSON.stringify(valueObj);
        const attr = new _transaction_ddo__WEBPACK_IMPORTED_MODULE_18__["DDOAttribute"]();
        attr.key = path;
        attr.type = 'JSON';
        attr.value = value;
        const publicKey = privateKey.getPublicKey();
        const tx = Object(_smartcontract_nativevm_ontidContractTxBuilder__WEBPACK_IMPORTED_MODULE_16__["buildAddAttributeTx"])(subject, [attr], publicKey, gasPrice, gasLimit);
        tx.payer = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](payer);
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["signTransaction"])(tx, privateKey);
        const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_11__["default"](`http://${SDK.SERVER_NODE}:${SDK.REST_PORT}`);
        return restClient.sendRawTransaction(tx.serialize(), true).then(res => {
            if (res.Result.Result === '01') {
                // user agent will do this
                // restClient.sendRawTransaction(tx.serialize(), false)
                // const hash = sha256(sha256(tx.serializeUnsignedData()))
                const obj = {
                    error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                    result: '',
                    tx: tx.serialize()
                };
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
                }
                // clear privateKey and password
                privateKey.key = '';
                password = '';
                return obj;
            } else {
                const obj = {
                    error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].PreExec_ERROR,
                    result: ''
                };
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
                }
                return obj;
            }
        }).catch(err => {
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].NETWORK_ERROR,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            }
        });
    }
    static signData(content, // hex string
    encryptedPrivateKey, password, address, salt, callback) {
        let privateKey;
        password = this.transformPassword(password);
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        let result;
        try {
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            privateKey = encryptedPrivateKeyObj.decrypt(password, addr, saltHex);
        } catch (err) {
            result = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        const signature = privateKey.sign(content);
        result = signature.serializePgp();
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        }
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        return result;
    }
    static getBalance(address, callback) {
        const addressObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
        const request = `http://${SDK.SERVER_NODE}:${SDK.REST_PORT}${_consts__WEBPACK_IMPORTED_MODULE_4__["REST_API"].getBalance}/${addressObj.toBase58()}`;
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(request).then(res => {
            if (res.data.Error === 0) {
                const result = res.data.Result;
                const obj = {
                    error: 0,
                    result
                };
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
                }
                return obj;
            } else {
                const obj = {
                    error: res.data.Error,
                    result: ''
                };
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
                }
                return obj;
            }
        }).catch(err => {
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].NETWORK_ERROR,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            }
            return Promise.reject(obj);
        });
    }
    // pls check balance before transfer
    static transferAssets(token, from, to, value, encryptedPrivateKey, password, salt, gasPrice, gasLimit, payer, callback) {
        let fromAddress;
        let toAddress;
        password = this.transformPassword(password);
        try {
            fromAddress = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](from);
            toAddress = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](to);
        } catch (err) {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        let privateKey;
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        try {
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](from);
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            privateKey = encryptedPrivateKeyObj.decrypt(password, addr, saltHex);
        } catch (err) {
            const result = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        const tx = Object(_smartcontract_nativevm_ontAssetTxBuilder__WEBPACK_IMPORTED_MODULE_15__["makeTransferTx"])(token, fromAddress, toAddress, value, gasPrice, gasLimit);
        tx.payer = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](payer);
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["signTransaction"])(tx, privateKey);
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: '',
            tx: tx.serialize(),
            txHash: Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(tx.getSignContent())
        };
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        return result;
    }
    static claimOng(address, value, encryptedPrivateKey, password, salt, gasPrice, gasLimit, payer, callback) {
        let addressObj;
        password = this.transformPassword(password);
        try {
            addressObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
        } catch (err) {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        let privateKey;
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        try {
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            privateKey = encryptedPrivateKeyObj.decrypt(password, addressObj, saltHex);
        } catch (err) {
            const result = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        const tx = Object(_smartcontract_nativevm_ontAssetTxBuilder__WEBPACK_IMPORTED_MODULE_15__["makeWithdrawOngTx"])(addressObj, addressObj, value, new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](payer), gasPrice, gasLimit);
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["signTransaction"])(tx, privateKey);
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: '',
            tx: tx.serialize(),
            txHash: Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(tx.getSignContent())
        };
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        return result;
    }
    static exportIdentityToQrcode(identityDataStr, callback) {
        const obj = _identity__WEBPACK_IMPORTED_MODULE_7__["Identity"].parseJson(identityDataStr);
        let salt = obj.controls[0].salt;
        if (!Object(_utils__WEBPACK_IMPORTED_MODULE_21__["isBase64"])(salt)) {
            salt = Buffer.from(salt, 'hex').toString('base64');
        }
        const result = {
            type: 'I',
            label: obj.label,
            algorithm: 'ECDSA',
            scrypt: {
                n: 4096,
                p: 8,
                r: 8,
                dkLen: 64
            },
            key: obj.controls[0].encryptedKey.key,
            salt,
            address: obj.controls[0].address.toBase58(),
            parameters: {
                curve: 'secp256r1'
            }
        };
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        }
        return result;
    }
    static exportIdentityToKeystring(identityDataStr, callback) {
        const obj = _identity__WEBPACK_IMPORTED_MODULE_7__["Identity"].parseJson(identityDataStr);
        const address = obj.controls[0].address.toBase58();
        const salt = obj.controls[0].salt;
        const key = obj.controls[0].encryptedKey.key;
        const result = salt + address + key;
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        }
        return result;
    }
    static exportAccountToQrcode(accountDataStr, callback) {
        const obj = _account__WEBPACK_IMPORTED_MODULE_2__["Account"].parseJson(accountDataStr);
        const result = {
            type: 'A',
            label: obj.label,
            algorithm: 'ECDSA',
            scrypt: {
                n: 4096,
                p: 8,
                r: 8,
                dkLen: 64
            },
            key: obj.encryptedKey.key,
            salt: obj.salt,
            address: obj.address.toBase58(),
            parameters: {
                curve: 'secp256r1'
            }
        };
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        }
        return result;
    }
    static exportAccountToKeystring(accountDataStr, callback) {
        const obj = _account__WEBPACK_IMPORTED_MODULE_2__["Account"].parseJson(accountDataStr);
        const salt = obj.salt;
        const address = obj.address.toBase58();
        const key = obj.encryptedKey.key;
        const result = salt + address + key;
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        }
        return result;
    }
    static importAccountMnemonic(label, mnemonic, password, callback) {
        mnemonic = mnemonic.trim();
        password = this.transformPassword(password);
        if (!bip39__WEBPACK_IMPORTED_MODULE_1__["validateMnemonic"](mnemonic)) {
            // tslint:disable-next-line:no-shadowed-variable
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            // tslint:disable-next-line:no-unused-expression
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            return obj;
        }
        const seed = bip39__WEBPACK_IMPORTED_MODULE_1__["mnemonicToSeedHex"](mnemonic);
        const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'));
        const pri = hdkey.derive(_consts__WEBPACK_IMPORTED_MODULE_4__["ONT_BIP44_PATH"]);
        const key = Buffer.from(pri.privateKey).toString('hex');
        const privateKey = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](key);
        const account = _account__WEBPACK_IMPORTED_MODULE_2__["Account"].create(privateKey, password, label);
        const result = account.toJson();
        const obj = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result
        };
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
        }
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        mnemonic = '';
        return obj;
    }
    static exportWifPrivakeKey(encryptedKey, password, address, salt, callback) {
        if (address.length !== 34 && address.length !== 40) {
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            return obj;
        }
        password = this.transformPassword(password);
        const encrypt = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedKey);
        const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
        const saltHex = Buffer.from(salt, 'base64').toString('hex');
        const privateKey = encrypt.decrypt(password, addr, saltHex);
        let wif = privateKey.serializeWIF();
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: wif
        };
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        // clear privateKey and password
        privateKey.key = '';
        wif = '';
        password = '';
        return result;
    }
    static importAccountWithWif(label, wif, password, callback) {
        let privateKey;
        password = this.transformPassword(password);
        try {
            privateKey = _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"].deserializeWIF(wif);
        } catch (err) {
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            return obj;
        }
        const account = _account__WEBPACK_IMPORTED_MODULE_2__["Account"].create(privateKey, password, label);
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: account.toJson()
        };
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        return result;
    }
    static importAccountWithPrivateKey(label, privateKey, password, callback) {
        privateKey = privateKey.trim();
        password = this.transformPassword(password);
        if (!privateKey || privateKey.length !== 64 || !Object(_utils__WEBPACK_IMPORTED_MODULE_21__["isHexString"])(privateKey)) {
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            return obj;
        }
        const pri = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](privateKey);
        const account = _account__WEBPACK_IMPORTED_MODULE_2__["Account"].create(pri, password, label);
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: account.toJson()
        };
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        // clear privateKey and password
        privateKey = '';
        password = '';
        return result;
    }
    /**
     * Actually import with Qrcode
     */
    static importAccountWithKeystore(keystore, password, callback) {
        let keyStoreObj;
        password = this.transformPassword(password);
        try {
            keyStoreObj = JSON.parse(keystore);
        } catch (err) {
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            return obj;
        }
        if (keyStoreObj.type !== 'A') {
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            return obj;
        } else {
            let account = new _account__WEBPACK_IMPORTED_MODULE_2__["Account"]();
            const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](keyStoreObj.key);
            try {
                const params = {
                    cost: keyStoreObj.scrypt.n || 4096,
                    blockSize: keyStoreObj.scrypt.p || 8,
                    parallel: keyStoreObj.scrypt.r || 8,
                    size: keyStoreObj.scrypt.dkLen || 64
                };
                const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](keyStoreObj.address);
                account = _account__WEBPACK_IMPORTED_MODULE_2__["Account"].importAccount(keyStoreObj.label, encryptedPrivateKeyObj, password, addr, keyStoreObj.salt, params);
                const obj = {
                    error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                    result: account.toJson()
                };
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
                }
                // clear privateKey and password
                password = '';
                return obj;
            } catch (err) {
                const result = this.getDecryptError(err);
                if (callback) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
                }
                return result;
            }
        }
    }
    static getUnclaimedOng(address, callback) {
        const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_11__["default"](`http://${SDK.SERVER_NODE}:${SDK.REST_PORT}`);
        return restClient.getAllowance('ong', new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](_smartcontract_nativevm_ontAssetTxBuilder__WEBPACK_IMPORTED_MODULE_15__["ONT_CONTRACT"]), new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address)).then(res => {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                result: res.Result
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }).catch(err => {
            const result = {
                error: err.Error,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        });
    }
    static querySmartCodeEventByTxhash(txHash, callback) {
        const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_11__["default"](`http://${SDK.SERVER_NODE}:${SDK.REST_PORT}`);
        return restClient.getSmartCodeEvent(txHash).then(res => {
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                result: res
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            }
            return obj;
        }).catch(err => {
            const result = {
                error: err.Error,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        });
    }
    static createSharedWallet(requiredSignatureNum, allRelatedPks, callback) {
        const M = parseInt(requiredSignatureNum, 10);
        let pks = [];
        let pubs = [];
        let error = _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS;
        try {
            pks = JSON.parse(allRelatedPks);
            pubs = pks.map(p => _crypto__WEBPACK_IMPORTED_MODULE_5__["PublicKey"].deserializeHex(new _utils__WEBPACK_IMPORTED_MODULE_21__["StringReader"](p)));
        } catch (err) {
            error = _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS;
        }
        if (M < 2 || pks.length < M || pks.length > 12) {
            error = _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS;
        }
        let address = '';
        try {
            address = _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"].fromMultiPubKeys(M, pubs).toBase58();
        } catch (err) {
            error = _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS;
        }
        if (callback) {
            const result = {
                error,
                result: address
            };
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        }
        return address;
    }
    static adderssFromPublicKey(publicKey, callback) {
        const pk = _crypto__WEBPACK_IMPORTED_MODULE_5__["PublicKey"].deserializeHex(new _utils__WEBPACK_IMPORTED_MODULE_21__["StringReader"](publicKey));
        const address = _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"].fromPubKey(pk).toBase58();
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: address
        };
        if (callback) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        }
        return address;
    }
    static makeMultiSignTransaction(asset, from, to, amount, gasPrice, gasLimit, callback) {
        let fromAddress;
        let toAddress;
        try {
            fromAddress = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](from);
            toAddress = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](to);
        } catch (err) {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        const tx = Object(_smartcontract_nativevm_ontAssetTxBuilder__WEBPACK_IMPORTED_MODULE_15__["makeTransferTx"])(asset, fromAddress, toAddress, amount, gasPrice, gasLimit);
        tx.payer = fromAddress;
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            txHash: Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(tx.getSignContent()),
            txData: tx.serialize()
        };
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        return result;
    }
    static signMultiAddrTransaction(encryptedPrivateKey, address, salt, password, allRelatedPks, requiredSignatureNum, txDada, callback) {
        password = this.transformPassword(password);
        let privateKey;
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        try {
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            privateKey = encryptedPrivateKeyObj.decrypt(password, addr, saltHex);
        } catch (err) {
            const result = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        const M = parseInt(requiredSignatureNum, 10);
        const tx = _transaction_transaction__WEBPACK_IMPORTED_MODULE_19__["Transaction"].deserialize(txDada);
        const pubs = JSON.parse(allRelatedPks);
        const pks = pubs.map(p => new _crypto__WEBPACK_IMPORTED_MODULE_5__["PublicKey"](p));
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["signTx"])(tx, M, pks, privateKey);
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            signedHash: tx.serialize()
        };
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        return tx;
    }
    /**
     * Neo transfer
     */
    static neoTransfer(from, to, value, encryptedPrivateKey, password, salt, callback, params) {
        password = this.transformPassword(password);
        const recv = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](to);
        const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](from);
        const abiInfo = _smartcontract_abi_abiInfo__WEBPACK_IMPORTED_MODULE_13__["default"].parseJson(NEP5_ABI);
        const contractAddr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(CONTRACT_HASH));
        const amount = parseInt(value, 10);
        const func = abiInfo.getFunction('Transfer');
        func.name = func.name.toLowerCase();
        let privateKey;
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        try {
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            privateKey = encryptedPrivateKeyObj.decrypt(password, addr, saltHex, params);
        } catch (err) {
            const result = this.getDecryptError(err);
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        }
        const p1 = new _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_14__["Parameter"]('from', _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_14__["ParameterType"].ByteArray, addr.serialize());
        const p2 = new _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_14__["Parameter"]('to', _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_14__["ParameterType"].ByteArray, recv.serialize());
        const p3 = new _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_14__["Parameter"]('value', _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_14__["ParameterType"].Integer, amount * NEO_TRAN);
        func.setParamsValue(p1, p2, p3);
        const tx = _neocore_SmartContract__WEBPACK_IMPORTED_MODULE_10__["SmartContract"].makeInvokeTransaction(contractAddr, addr, func);
        const p = new _neocore_Program__WEBPACK_IMPORTED_MODULE_9__["Program"]();
        p.parameter = _neocore_Program__WEBPACK_IMPORTED_MODULE_9__["Program"].programFromParams([tx.sign(privateKey)]);
        p.code = _neocore_Program__WEBPACK_IMPORTED_MODULE_9__["Program"].programFromPubKey(privateKey.getPublicKey());
        tx.scripts = [p];
        return _neocore_NeoRpc__WEBPACK_IMPORTED_MODULE_8__["NeoRpc"].sendRawTransaction(NEO_NODE, tx.serialize()).then(res => {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                result: ''
            };
            if (res.result) {
                result.result = Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(tx.getHash());
                callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            } else {
                result.error = _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].NETWORK_ERROR;
                callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        });
    }
    static getNeoBalance(address, callback) {
        const contractAddr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(CONTRACT_HASH));
        const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](address);
        return _neocore_NeoRpc__WEBPACK_IMPORTED_MODULE_8__["NeoRpc"].getBalance(NEO_NODE, contractAddr, addr).then(res => {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                result: 0
            };
            if (res.result) {
                const balance = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(res.result), 16);
                result.result = balance;
            }
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            return result;
        });
    }
    static sendTransaction(txData, callback) {
        const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_11__["default"](`http://${SDK.SERVER_NODE}:${SDK.REST_PORT}`);
        return restClient.sendRawTransaction(txData).then(res => {
            const obj = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                result: res
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(obj), callback);
            }
            return obj;
        }).catch(err => {
            const result = {
                error: err.Error,
                result: ''
            };
            if (callback) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            }
            return result;
        });
    }
    // ope8 apis for ONTO
    static queryOep8Balance(contractHash, account, tokenId, callback) {
        const contractAddr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(contractHash));
        const oep8 = new _smartcontract_neovm_oep8TxBuilder__WEBPACK_IMPORTED_MODULE_17__["Oep8TxBuilder"](contractAddr);
        const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](account);
        const tx = oep8.makeQueryBalanceOfTx(addr, tokenId);
        return SDK.restClient.sendRawTransaction(tx.serialize(), true).then(res => {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                result: 0
            };
            if (res.Result.Result) {
                result.result = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(res.Result.Result), 16);
            }
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            return result;
        });
    }
    static queryOep8Balances(contractHash, account, callback) {
        const contractAddr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(contractHash));
        const oep8 = new _smartcontract_neovm_oep8TxBuilder__WEBPACK_IMPORTED_MODULE_17__["Oep8TxBuilder"](contractAddr);
        const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](account);
        const tx = oep8.makeQueryBalancesTx(addr);
        return SDK.restClient.sendRawTransaction(tx.serialize(), true).then(res => {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                result: [0, 0, 0, 0, 0, 0, 0, 0]
            };
            if (res.Result.Result) {
                const vals = res.Result.Result.map(v => v ? parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(v), 16) : 0);
                result.result = vals;
            }
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            return result;
        });
    }
    static queryOep8TotalBalance(contractHash, account, callback) {
        const contractAddr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(contractHash));
        const oep8 = new _smartcontract_neovm_oep8TxBuilder__WEBPACK_IMPORTED_MODULE_17__["Oep8TxBuilder"](contractAddr);
        const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](account);
        const tx = oep8.makeQueryTotalBalanceTx(addr);
        return SDK.restClient.sendRawTransaction(tx.serialize(), true).then(res => {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
                result: 0
            };
            if (res.Result.Result) {
                result.result = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(res.Result.Result), 16);
            }
            callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
            return result;
        });
    }
    static transferOep8(contractHash, from, to, value, tokenId, encryptedPrivateKey, password, salt, gasPrice, gasLimit, payer, callback) {
        let fromAddress;
        let toAddress;
        let payerAddress;
        password = this.transformPassword(password);
        try {
            fromAddress = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](from);
            toAddress = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](to);
            payerAddress = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](payer);
        } catch (err) {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            return result;
        }
        let privateKey;
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        try {
            const addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](from);
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            privateKey = encryptedPrivateKeyObj.decrypt(password, addr, saltHex);
        } catch (err) {
            const result = this.getDecryptError(err);
            return result;
        }
        const contractAddr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(contractHash));
        const oep8 = new _smartcontract_neovm_oep8TxBuilder__WEBPACK_IMPORTED_MODULE_17__["Oep8TxBuilder"](contractAddr);
        const tx = oep8.makeTransferTx(fromAddress, toAddress, tokenId, value, gasPrice, gasLimit, payerAddress);
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["signTransaction"])(tx, privateKey);
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: '',
            tx: tx.serialize(),
            txHash: Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(tx.getSignContent())
        };
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        return result;
    }
    static compoundOep8(contractHash, account, compoundNum, encryptedPrivateKey, password, salt, gasPrice, gasLimit, payer, callback) {
        let addr;
        password = this.transformPassword(password);
        try {
            addr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](account);
        } catch (err) {
            const result = {
                error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS,
                result: ''
            };
            return result;
        }
        let privateKey;
        const encryptedPrivateKeyObj = new _crypto__WEBPACK_IMPORTED_MODULE_5__["PrivateKey"](encryptedPrivateKey);
        try {
            const saltHex = Buffer.from(salt, 'base64').toString('hex');
            privateKey = encryptedPrivateKeyObj.decrypt(password, addr, saltHex);
        } catch (err) {
            const result = this.getDecryptError(err);
            return result;
        }
        const contractAddr = new _crypto__WEBPACK_IMPORTED_MODULE_5__["Address"](Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(contractHash));
        const oep8 = new _smartcontract_neovm_oep8TxBuilder__WEBPACK_IMPORTED_MODULE_17__["Oep8TxBuilder"](contractAddr);
        const tx = oep8.makeCompoundTx(addr, compoundNum, gasPrice, gasLimit, addr);
        Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_20__["signTransaction"])(tx, privateKey);
        const result = {
            error: _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].SUCCESS,
            result: '',
            tx: tx.serialize(),
            txHash: Object(_utils__WEBPACK_IMPORTED_MODULE_21__["reverseHex"])(tx.getSignContent())
        };
        callback && Object(_utils__WEBPACK_IMPORTED_MODULE_21__["sendBackResult2Native"])(JSON.stringify(result), callback);
        // clear privateKey and password
        privateKey.key = '';
        password = '';
        return result;
    }
}
SDK.SERVER_NODE = _consts__WEBPACK_IMPORTED_MODULE_4__["TEST_NODE"];
SDK.REST_PORT = _consts__WEBPACK_IMPORTED_MODULE_4__["HTTP_REST_PORT"];
SDK.SOCKET_PORT = _consts__WEBPACK_IMPORTED_MODULE_4__["HTTP_WS_PORT"];
SDK.restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_11__["default"]();

/***/ }),

/***/ "./src/smartcontract/abi/abiFunction.ts":
/*!**********************************************!*\
  !*** ./src/smartcontract/abi/abiFunction.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbiFunction; });
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * Describes the Abi function
 */
class AbiFunction {
    constructor(name, returntype, parameters) {
        this.name = name;
        this.returntype = returntype;
        this.parameters = parameters;
    }
    getParameter(name) {
        // const p = {} as Parameter;
        for (const v of this.parameters) {
            if (v.getName() === name) {
                return v;
            }
        }
        return null;
    }
    setParamsValue(...args) {
        for (let i = 0, len = args.length; i < len; i++) {
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < this.parameters.length; j++) {
                if (args[i].name === this.parameters[j].getName()) {
                    this.parameters[j].setValue(args[i]);
                }
            }
        }
        // const parameters = [];
        // for (let i = 0, len = args.length; i < len; i++) {
        //     parameters.push(args[i]);
        // }
        // this.parameters = parameters;
    }
    toString() {
        const json = {
            name: this.name,
            returntype: this.returntype,
            parameters: this.parameters
        };
        return JSON.stringify(json);
    }
}

/***/ }),

/***/ "./src/smartcontract/abi/abiInfo.ts":
/*!******************************************!*\
  !*** ./src/smartcontract/abi/abiInfo.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbiInfo; });
/* harmony import */ var _abiFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abiFunction */ "./src/smartcontract/abi/abiFunction.ts");
/* harmony import */ var _parameter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parameter */ "./src/smartcontract/abi/parameter.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * Decribes the Abi info.
 */
class AbiInfo {
    constructor() {
        this.functions = [];
    }
    static parseJson(json) {
        const a = new AbiInfo();
        const obj = JSON.parse(json);
        a.hash = obj.hash;
        a.entrypoint = obj.entrypoint;
        a.functions = obj.functions;
        return a;
    }
    getHash() {
        return this.hash;
    }
    getEntryPoint() {
        return this.entrypoint;
    }
    getFunction(name) {
        for (const v of this.functions) {
            if (v.name === name) {
                const parameters = v.parameters.map(p => new _parameter__WEBPACK_IMPORTED_MODULE_1__["Parameter"](p.name, p.type, ''));
                return new _abiFunction__WEBPACK_IMPORTED_MODULE_0__["default"](v.name, v.returntype, parameters);
            }
        }
        throw Error('not found');
    }
}

/***/ }),

/***/ "./src/smartcontract/abi/nativeVmParamsBuilder.ts":
/*!********************************************************!*\
  !*** ./src/smartcontract/abi/nativeVmParamsBuilder.ts ***!
  \********************************************************/
/*! exports provided: buildParams, createCodeParamScript, buildNativeCodeScript, isTypedArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildParams", function() { return buildParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCodeParamScript", function() { return createCodeParamScript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildNativeCodeScript", function() { return buildNativeCodeScript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTypedArray", function() { return isTypedArray; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _crypto_address__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../crypto/address */ "./src/crypto/address.ts");
/* harmony import */ var _transaction_opcode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../transaction/opcode */ "./src/transaction/opcode.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../transaction/scriptBuilder */ "./src/transaction/scriptBuilder.ts");
/* harmony import */ var _parameter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parameter */ "./src/smartcontract/abi/parameter.ts");
/* harmony import */ var _struct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./struct */ "./src/smartcontract/abi/struct.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/







function buildParams(params) {
    let result = '';
    for (const p of params) {
        const type = p.getType();
        switch (type) {
            case _parameter__WEBPACK_IMPORTED_MODULE_5__["ParameterType"].ByteArray:
                result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["hex2VarBytes"])(p.value);
                break;
            case _parameter__WEBPACK_IMPORTED_MODULE_5__["ParameterType"].Int:
                result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(p.value, 4, true);
                break;
            case _parameter__WEBPACK_IMPORTED_MODULE_5__["ParameterType"].String:
                result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["str2VarBytes"])(p.value);
                break;
            case _parameter__WEBPACK_IMPORTED_MODULE_5__["ParameterType"].Address:
                result += p.value.serialize();
            default:
                break;
        }
    }
    return result;
}
function createCodeParamScript(obj) {
    let result = '';
    // Consider string as hexstr
    if (typeof obj === 'string') {
        result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushHexString"])(obj);
    } else if (typeof obj === 'boolean') {
        result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushBool"])(obj);
    } else if (typeof obj === 'number') {
        result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushInt"])(obj);
    } else if (obj instanceof bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"]) {
        result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushBigNum"])(obj);
    } else if (obj instanceof _crypto_address__WEBPACK_IMPORTED_MODULE_1__["Address"]) {
        result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushHexString"])(obj.serialize());
    } else if (obj instanceof _struct__WEBPACK_IMPORTED_MODULE_6__["default"]) {
        for (const v of obj.list) {
            result += createCodeParamScript(v);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].DUPFROMALTSTACK);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].SWAP);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].APPEND);
        }
    }
    return result;
}
function buildNativeCodeScript(list) {
    let result = '';
    for (let i = list.length - 1; i >= 0; i--) {
        const val = list[i];
        // Consider string as hexstr
        if (typeof val === 'string') {
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushHexString"])(val);
        } else if (typeof val === 'boolean') {
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushBool"])(val);
        } else if (typeof val === 'number') {
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushInt"])(val);
        } else if (val instanceof bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"]) {
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushBigNum"])(val);
        } else if (val instanceof _crypto_address__WEBPACK_IMPORTED_MODULE_1__["Address"]) {
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushHexString"])(val.serialize());
        } else if (val instanceof _struct__WEBPACK_IMPORTED_MODULE_6__["default"]) {
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushInt"])(0);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].NEWSTRUCT);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].TOALTSTACK);
            for (const v of val.list) {
                result += createCodeParamScript(v);
                result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].DUPFROMALTSTACK);
                result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].SWAP);
                result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].APPEND);
            }
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].FROMALTSTACK);
        } else if (Array.isArray(val) && isTypedArray(val, _struct__WEBPACK_IMPORTED_MODULE_6__["default"])) {
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushInt"])(0);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].NEWSTRUCT);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].TOALTSTACK);
            for (const s of val) {
                result += createCodeParamScript(s);
            }
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].FROMALTSTACK);
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushInt"])(val.length);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].PACK);
        } else if (Array.isArray(val)) {
            result += buildNativeCodeScript(val);
            result += Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_4__["pushInt"])(val.length);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(_transaction_opcode__WEBPACK_IMPORTED_MODULE_2__["default"].PACK);
        }
    }
    return result;
}
function isTypedArray(arr, type) {
    let result = true;
    for (const a of arr) {
        if (!(a instanceof type)) {
            result = false;
            break;
        }
    }
    return result;
}

/***/ }),

/***/ "./src/smartcontract/abi/parameter.ts":
/*!********************************************!*\
  !*** ./src/smartcontract/abi/parameter.ts ***!
  \********************************************/
/*! exports provided: ParameterType, ParameterTypeVal, Parameter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParameterType", function() { return ParameterType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParameterTypeVal", function() { return ParameterTypeVal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parameter", function() { return Parameter; });
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
var ParameterType;
(function (ParameterType) {
    ParameterType["Boolean"] = "Boolean";
    ParameterType["Integer"] = "Integer";
    ParameterType["ByteArray"] = "ByteArray";
    ParameterType["Interface"] = "Interface";
    ParameterType["Array"] = "Array";
    ParameterType["Struct"] = "Struct";
    ParameterType["Map"] = "Map";
    ParameterType["String"] = "String";
    ParameterType["Int"] = "Int";
    ParameterType["Long"] = "Long";
    ParameterType["IntArray"] = "IntArray";
    ParameterType["LongArray"] = "LongArray";
    ParameterType["Address"] = "Address";
})(ParameterType || (ParameterType = {}));
var ParameterTypeVal;
(function (ParameterTypeVal) {
    ParameterTypeVal[ParameterTypeVal["ByteArray"] = 0] = "ByteArray";
    ParameterTypeVal[ParameterTypeVal["Boolean"] = 1] = "Boolean";
    ParameterTypeVal[ParameterTypeVal["Integer"] = 2] = "Integer";
    ParameterTypeVal[ParameterTypeVal["Interface"] = 64] = "Interface";
    ParameterTypeVal[ParameterTypeVal["Array"] = 128] = "Array";
    ParameterTypeVal[ParameterTypeVal["Struct"] = 129] = "Struct";
    ParameterTypeVal[ParameterTypeVal["Map"] = 130] = "Map";
})(ParameterTypeVal || (ParameterTypeVal = {}));
/**
 * Decribes the parameter.
 */
class Parameter {
    constructor(name, type, value) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        if (value.type === this.type && value.name === this.name && value.value != null) {
            this.value = value.value;
            return true;
        }
        return false;
    }
}

/***/ }),

/***/ "./src/smartcontract/abi/struct.ts":
/*!*****************************************!*\
  !*** ./src/smartcontract/abi/struct.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Struct; });
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * Struct is a special kind of parameter that used in smart contract.
 */
class Struct {
    constructor() {
        this.list = [];
    }
    /**
     * Add arguments to struct.
     * @param args Array of some kinds of value.
     * Boolean, number, string, Address and Struct are supported.
     */
    add(...args) {
        for (const a of args) {
            this.list.push(a);
        }
    }
}

/***/ }),

/***/ "./src/smartcontract/data/attestClaim.ts":
/*!***********************************************!*\
  !*** ./src/smartcontract/data/attestClaim.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    hash: '36bb5c053b6b839c8f6b923fe852f91239b9fccc',
    entrypoint: 'Main',
    functions: [{
        name: 'Main',
        parameters: [{
            name: 'operation',
            type: 'String'
        }, {
            name: 'args',
            type: 'Array'
        }],
        returntype: 'Any'
    }, {
        name: 'Commit',
        parameters: [{
            name: 'claimId',
            type: 'ByteArray'
        }, {
            name: 'commiterId',
            type: 'ByteArray'
        }, {
            name: 'ownerId',
            type: 'ByteArray'
        }],
        returntype: 'Boolean'
    }, {
        name: 'Revoke',
        parameters: [{
            name: 'claimId',
            type: 'ByteArray'
        }, {
            name: 'ontId',
            type: 'ByteArray'
        }],
        returntype: 'Boolean'
    }, {
        name: 'GetStatus',
        parameters: [{
            name: 'claimId',
            type: 'ByteArray'
        }],
        returntype: 'ByteArray'
    }],
    events: [{
        name: 'ErrorMsg',
        parameters: [{
            name: 'arg1',
            type: 'ByteArray'
        }, {
            name: 'arg2',
            type: 'String'
        }],
        returntype: 'Void'
    }, {
        name: 'Push',
        parameters: [{
            name: 'arg1',
            type: 'ByteArray'
        }, {
            name: 'arg2',
            type: 'String'
        }, {
            name: 'arg3',
            type: 'ByteArray'
        }],
        returntype: 'Void'
    }]
});

/***/ }),

/***/ "./src/smartcontract/nativevm/governanceContractTxBuilder.ts":
/*!*******************************************************************!*\
  !*** ./src/smartcontract/nativevm/governanceContractTxBuilder.ts ***!
  \*******************************************************************/
/*! exports provided: makeRegisterCandidateTx, makeUnregisterCandidateTx, makeApproveCandidateTx, makeRejectCandidateTx, makeVoteForPeerTx, makeUnvoteForPeerTx, makeWithdrawTx, makeQuitNodeTx, makeChangeAuthorizationTx, makeSetPeerCostTx, makeWithdrawFeeTx, makeAuthorizeForPeerTx, makeUnauthorizeForPeerTx, makeAddInitPosTx, makeReduceInitPosTx, makeWithdrawPeerUnboundOngTx, getAttributes, getSplitFeeAddress, getAuthorizeInfo, getGovernanceView, getPeerPoolMap, getGlobalParam, getTotalStake, getPeerUnboundOng, GovernanceView, PeerPoolItem, PeerAttributes, SplitFeeAddress, AuthorizeInfo, GlobalParam, TotalStake */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeRegisterCandidateTx", function() { return makeRegisterCandidateTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeUnregisterCandidateTx", function() { return makeUnregisterCandidateTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeApproveCandidateTx", function() { return makeApproveCandidateTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeRejectCandidateTx", function() { return makeRejectCandidateTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeVoteForPeerTx", function() { return makeVoteForPeerTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeUnvoteForPeerTx", function() { return makeUnvoteForPeerTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeWithdrawTx", function() { return makeWithdrawTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeQuitNodeTx", function() { return makeQuitNodeTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeChangeAuthorizationTx", function() { return makeChangeAuthorizationTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeSetPeerCostTx", function() { return makeSetPeerCostTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeWithdrawFeeTx", function() { return makeWithdrawFeeTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeAuthorizeForPeerTx", function() { return makeAuthorizeForPeerTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeUnauthorizeForPeerTx", function() { return makeUnauthorizeForPeerTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeAddInitPosTx", function() { return makeAddInitPosTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeReduceInitPosTx", function() { return makeReduceInitPosTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeWithdrawPeerUnboundOngTx", function() { return makeWithdrawPeerUnboundOngTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttributes", function() { return getAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSplitFeeAddress", function() { return getSplitFeeAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthorizeInfo", function() { return getAuthorizeInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGovernanceView", function() { return getGovernanceView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPeerPoolMap", function() { return getPeerPoolMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGlobalParam", function() { return getGlobalParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTotalStake", function() { return getTotalStake; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPeerUnboundOng", function() { return getPeerUnboundOng; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GovernanceView", function() { return GovernanceView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeerPoolItem", function() { return PeerPoolItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeerAttributes", function() { return PeerAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplitFeeAddress", function() { return SplitFeeAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthorizeInfo", function() { return AuthorizeInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalParam", function() { return GlobalParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TotalStake", function() { return TotalStake; });
/* harmony import */ var _common_bigInt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/bigInt */ "./src/common/bigInt.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../consts */ "./src/consts.ts");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../crypto */ "./src/crypto/index.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error */ "./src/error.ts");
/* harmony import */ var _network_rest_restClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../network/rest/restClient */ "./src/network/rest/restClient.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../abi/nativeVmParamsBuilder */ "./src/smartcontract/abi/nativeVmParamsBuilder.ts");
/* harmony import */ var _abi_struct__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../abi/struct */ "./src/smartcontract/abi/struct.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/









const GOVERNANCE_CONTRACT = '0000000000000000000000000000000000000007';
const PEER_ATTRIBUTES = 'peerAttributes';
const SPLIT_FEE_ADDRESS = 'splitFeeAddress';
const AUTHORIZE_INFO_POOL = 'voteInfoPool';
const GLOBAL_PARAM = 'globalParam';
const TOTAL_STAKE = 'totalStake';
const contractAddress = new _crypto__WEBPACK_IMPORTED_MODULE_2__["Address"](GOVERNANCE_CONTRACT);
/* TODO: Test */
// tslint:disable:no-console
/**
 * Register to be candidate node.
 * This tx needs signatures from userAddr and payer if these two address are not the same.
 * @param ontid user's ONT ID, must be assigned with the role.
 * @param peerPubKey public key of user's peer
 * @param userAddr user's address to pledge ONT&ONG. This address must have enough ONT & ONG.
 * @param keyNo user's pk id
 * @param initPos Initial state
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeRegisterCandidateTx(ontid, peerPubKey, keyNo, userAddr, initPos, payer, gasPrice, gasLimit) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_6__["varifyPositiveInt"])(initPos);
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(ontid);
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(peerPubKey), userAddr.serialize(), initPos, ontid, keyNo);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('registerCandidate', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 *
 * @param userAddr User's address to pledge ONT&ONG.
 * @param peerPubKey Public key of user's peer
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeUnregisterCandidateTx(userAddr, peerPubKey, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(peerPubKey), userAddr.serialize());
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('unRegisterCandidate', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Creates transaction to approve candidate
 * @param peerPubKey Public key of user's peer
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeApproveCandidateTx(peerPubKey, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(peerPubKey));
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('approveCandidate', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Creates transaction to reject candidate
 * @param peerPubKey Public key of user's peer
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeRejectCandidateTx(peerPubKey, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(peerPubKey));
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('rejectCandidate', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Creates transaction to vote for some peers.
 * Can only vote for peers that with status 1 or 2
 * This tx needs signatures from userAddr and payer if these two address are not the same.
 * @param userAddr User's address
 * @param peerPubKeys Public keys of peers that to be voted
 * @param posList Array of token that to vote
 * @param payer Address to pay for transaction's gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeVoteForPeerTx(userAddr, peerPubKeys, posList, payer, gasPrice, gasLimit) {
    if (peerPubKeys.length !== posList.length) {
        throw _error__WEBPACK_IMPORTED_MODULE_3__["ERROR_CODE"].INVALID_PARAMS;
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(userAddr.serialize());
    struct.add(peerPubKeys.length);
    for (const p of peerPubKeys) {
        struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(p));
    }
    struct.add(posList.length);
    for (const n of posList) {
        struct.add(n);
    }
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('voteForPeer', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * User unvotes peer nodes
 * @param userAddr user's address
 * @param peerPubKeys peer's pks
 * @param posList amount of ONT to unvote
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeUnvoteForPeerTx(userAddr, peerPubKeys, posList, payer, gasPrice, gasLimit) {
    if (peerPubKeys.length !== posList.length) {
        throw _error__WEBPACK_IMPORTED_MODULE_3__["ERROR_CODE"].INVALID_PARAMS;
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(userAddr.serialize());
    struct.add(peerPubKeys.length);
    for (const p of peerPubKeys) {
        struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(p));
    }
    struct.add(posList.length);
    for (const n of posList) {
        struct.add(n);
    }
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('unVoteForPeer', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Withdraw the unvote ONT
 * Need two signatures if userAddr and payer are not the same
 * @param userAddr
 * @param peerPubKeys
 * @param withdrawList
 */
function makeWithdrawTx(userAddr, peerPubKeys, withdrawList, payer, gasPrice, gasLimit) {
    if (peerPubKeys.length !== withdrawList.length) {
        throw _error__WEBPACK_IMPORTED_MODULE_3__["ERROR_CODE"].INVALID_PARAMS;
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(userAddr.serialize());
    struct.add(peerPubKeys.length);
    for (const p of peerPubKeys) {
        struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(p));
    }
    struct.add(withdrawList.length);
    for (const w of withdrawList) {
        struct.add(w);
    }
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('withdraw', params, contractAddress, gasPrice, gasLimit, payer);
}
/** Quit node register
 * Need two signatures if userAddr and payer are not the same
 */
function makeQuitNodeTx(userAddr, peerPubKey, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(peerPubKey), userAddr.serialize());
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('quitNode', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Peer change the status of authorization
 * @param peerPubKey Peer's public key
 * @param userAddr User's address
 * @param maxAuthorize Allowed max amount of stake authorization
 * @param payer Payer of the transaction fee
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeChangeAuthorizationTx(peerPubKey, userAddr, maxAuthorize, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(peerPubKey), userAddr.serialize(), maxAuthorize);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('changeMaxAuthorization', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Update allocation proportion of peer
 * @param peerPubKey
 * @param userAddr
 * @param peerCost
 * @param payer
 * @param gasPrice
 * @param gasLimit
 */
function makeSetPeerCostTx(peerPubKey, userAddr, peerCost, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(peerPubKey), userAddr.serialize(), peerCost);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('setPeerCost', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Withdraw fee to user's address
 * @param userAddr User's address
 * @param payer
 * @param gasPrice
 * @param gasLimit
 */
function makeWithdrawFeeTx(userAddr, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(userAddr.serialize());
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('withdrawFee', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * User authorize some peers
 * @param userAddr
 * @param peerPubKeyList
 * @param posList
 * @param payer
 * @param gasPrice
 * @param gasLimit
 */
function makeAuthorizeForPeerTx(userAddr, peerPubKeyList, posList, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(userAddr.serialize());
    struct.add(peerPubKeyList.length);
    for (const p of peerPubKeyList) {
        struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(p));
    }
    struct.add(posList.length);
    for (const w of posList) {
        struct.add(w);
    }
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('authorizeForPeer', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * User cancels the authorization of peer
 */
function makeUnauthorizeForPeerTx(userAddr, peerPubKeyList, posList, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(userAddr.serialize());
    struct.add(peerPubKeyList.length);
    for (const p of peerPubKeyList) {
        struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(p));
    }
    struct.add(posList.length);
    for (const w of posList) {
        struct.add(w);
    }
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('unAuthorizeForPeer', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Peer add the init pos
 * @param peerPubkey Peer's public key
 * @param userAddr Stake wallet address
 * @param pos Amount of pos to add
 * @param payer Payer of the transaction
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeAddInitPosTx(peerPubkey, userAddr, pos, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(peerPubkey), userAddr.serialize(), pos);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('addInitPos', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Peer reduce the init pos
 * @param peerPubkey Peer's public key
 * @param userAddr Stake wallet address
 * @param pos Amount of pos to reduce
 * @param payer Payer of the transaction
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeReduceInitPosTx(peerPubkey, userAddr, pos, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(peerPubkey), userAddr.serialize(), pos);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('reduceInitPos', params, contractAddress, gasPrice, gasLimit, payer);
}
function makeWithdrawPeerUnboundOngTx(userAddr, payer, gasPrice, gasLimit) {
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_8__["default"]();
    struct.add(userAddr.serialize());
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_7__["buildNativeCodeScript"])([struct]);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["makeNativeContractTx"])('withdrawOng', params, contractAddress, gasPrice, gasLimit, payer);
}
/**
 * If not set ifAuthorize or cost before, query result will be empty.
 * @param peerPubKey
 * @param url
 */
async function getAttributes(peerPubKey, url) {
    const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_4__["default"](url);
    const codeHash = contractAddress.toHexString();
    const key = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(PEER_ATTRIBUTES) + peerPubKey;
    const res = await restClient.getStorage(codeHash, key);
    const result = res.Result;
    if (result) {
        return PeerAttributes.deserialize(new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](result));
    } else {
        return new PeerAttributes();
    }
}
/**
 * Get the reward fee of address
 * @param address User's address
 * @param url Node's restfull url
 */
async function getSplitFeeAddress(address, url) {
    const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_4__["default"](url);
    const codeHash = contractAddress.toHexString();
    const key = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(SPLIT_FEE_ADDRESS) + address.serialize();
    const res = await restClient.getStorage(codeHash, key);
    const result = res.Result;
    if (result) {
        return SplitFeeAddress.deserialize(new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](result));
    } else {
        return new SplitFeeAddress();
    }
}
/**
 * Get authorization of user's address
 * @param peerPubKey Peer's public key
 * @param address User's address
 * @param url Node's restful url
 */
async function getAuthorizeInfo(peerPubKey, address, url) {
    const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_4__["default"](url);
    const codeHash = contractAddress.toHexString();
    const key = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(AUTHORIZE_INFO_POOL) + peerPubKey + address.serialize();
    const res = await restClient.getStorage(codeHash, key);
    const result = res.Result;
    if (result) {
        return AuthorizeInfo.deserialize(new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](result));
    } else {
        return new AuthorizeInfo();
    }
}
/**
 * Query the governance view
 * @param url Url of restful api
 */
async function getGovernanceView(url) {
    const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_4__["default"](url);
    const codeHash = contractAddress.toHexString();
    const key = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])('governanceView');
    const viewRes = await restClient.getStorage(codeHash, key);
    const view = viewRes.Result;
    const governanceView = GovernanceView.deserialize(new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](view));
    return governanceView;
}
/**
 * Query all the peer's state. The result is a map.
 * @param url Url of blockchain node
 */
async function getPeerPoolMap(url) {
    const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_4__["default"](url);
    const codeHash = contractAddress.toHexString();
    const governanceView = await getGovernanceView(url);
    const key1 = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])('peerPool');
    const key2 = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(governanceView.view, 4, true);
    const keyP = key1 + key2;
    const res = await restClient.getStorage(codeHash, keyP);
    const sr = new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](res.Result);
    const length = sr.readInt();
    const result = {};
    for (let i = 0; i < length; i++) {
        const p = PeerPoolItem.deserialize(sr);
        result[p.peerPubkey] = p;
    }
    return result;
}
async function getGlobalParam(url) {
    const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_4__["default"](url);
    const codeHash = contractAddress.toHexString();
    const key = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(GLOBAL_PARAM);
    const res = await restClient.getStorage(codeHash, key);
    if (res.Result) {
        return GlobalParam.deserialize(new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](res.Result));
    } else {
        return new GlobalParam();
    }
}
async function getTotalStake(userAddr, url) {
    const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_4__["default"](url);
    const codeHash = contractAddress.toHexString();
    const key = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2hexstr"])(TOTAL_STAKE) + userAddr.serialize();
    const res = await restClient.getStorage(codeHash, key);
    if (res.Result) {
        return TotalStake.deserialize(new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](res.Result));
    } else {
        return new TotalStake();
    }
}
async function getPeerUnboundOng(userAddr, url) {
    const totalStake = await getTotalStake(userAddr, url);
    if (!totalStake.address) {
        return 0;
    }
    const restClient = new _network_rest_restClient__WEBPACK_IMPORTED_MODULE_4__["default"](url);
    const blockHeight = (await restClient.getBlockHeight()).Result;
    const block = (await restClient.getBlockJson(blockHeight)).Result;
    const timeStamp = block.Header.Timestamp - _consts__WEBPACK_IMPORTED_MODULE_1__["GENESIS_BLOCK_TIMESTAMP"];
    return Object(_utils__WEBPACK_IMPORTED_MODULE_6__["calcUnboundOng"])(totalStake.stake, totalStake.timeOffset, timeStamp);
}
/**
 * Use to store governance state.
 */
class GovernanceView {
    constructor() {
        this.view = 0;
        this.height = 0;
        this.txhash = '';
    }
    static deserialize(sr) {
        const g = new GovernanceView();
        g.view = sr.readUint32();
        g.height = sr.readUint32();
        g.txhash = sr.read(64); // uint256
        return g;
    }
    serialize() {
        let result = '';
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(this.view, 4, true);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(this.height, 4, true);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["hex2VarBytes"])(this.txhash);
        return result;
    }
}
/**
 * Describs the peer's state in the pool.
 */
class PeerPoolItem {
    constructor() {
        this.index = 0;
        this.peerPubkey = '';
        this.status = 0;
        this.initPos = 0;
        this.totalPos = 0;
    }
    static deserialize(sr) {
        const p = new PeerPoolItem();
        p.index = sr.readInt();
        p.peerPubkey = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["hexstr2str"])(sr.readNextBytes());
        p.address = _crypto__WEBPACK_IMPORTED_MODULE_2__["Address"].deserialize(sr);
        p.status = parseInt(sr.read(1), 16);
        p.initPos = sr.readLong();
        p.totalPos = sr.readLong();
        return p;
    }
    serialize() {
        let result = '';
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(this.index, 4, true);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["str2VarBytes"])(this.peerPubkey);
        result += this.address.serialize();
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(this.status);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(this.initPos, 8, true);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(this.totalPos, 8, true);
        return result;
    }
}
class PeerAttributes {
    constructor() {
        this.peerPubkey = '';
        this.maxAuthorize = 0;
        this.t2PeerCost = 100; // peer cost, active in view T + 2
        this.t1PeerCost = 100; // peer cost, active in view T + 1
        this.tPeerCost = 0; // peer cost, active in view T
        this.field1 = '';
        this.field2 = '';
        this.field3 = '';
        this.field4 = '';
    }
    static deserialize(sr) {
        const pr = new PeerAttributes();
        pr.peerPubkey = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["hexstr2str"])(sr.readNextBytes());
        pr.maxAuthorize = sr.readLong();
        pr.t2PeerCost = sr.readLong();
        pr.t1PeerCost = sr.readLong();
        pr.tPeerCost = sr.readLong();
        if (sr.isEmpty) {
            return pr;
        }
        pr.field1 = sr.readNextBytes();
        pr.field2 = sr.readNextBytes();
        pr.field3 = sr.readNextBytes();
        pr.field4 = sr.readNextBytes();
        return pr;
    }
    serialize() {
        return '';
    }
}
class SplitFeeAddress {
    constructor() {
        this.amount = 0;
    }
    static deserialize(sr) {
        const sfa = new SplitFeeAddress();
        sfa.address = _crypto__WEBPACK_IMPORTED_MODULE_2__["Address"].deserialize(sr);
        sfa.amount = sr.readLong();
        return sfa;
    }
}
class AuthorizeInfo {
    constructor() {
        this.peerPubkey = '';
        this.consensusPos = 0;
        this.freezePos = 0;
        this.newPos = 0;
        this.withdrawPos = 0;
        this.withdrawFreezePos = 0;
        this.withdrawUnfreezePos = 0;
    }
    static deserialize(sr) {
        const ai = new AuthorizeInfo();
        ai.peerPubkey = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["hexstr2str"])(sr.readNextBytes());
        ai.address = _crypto__WEBPACK_IMPORTED_MODULE_2__["Address"].deserialize(sr);
        ai.consensusPos = sr.readLong();
        ai.freezePos = sr.readLong();
        ai.newPos = sr.readLong();
        ai.withdrawPos = sr.readLong();
        ai.withdrawFreezePos = sr.readLong();
        ai.withdrawUnfreezePos = sr.readLong();
        return ai;
    }
}
class GlobalParam {
    static deserialize(sr) {
        const gp = new GlobalParam();
        const feeHexStr = sr.readNextBytes();
        const candidateFeeStr = _common_bigInt__WEBPACK_IMPORTED_MODULE_0__["default"].fromHexstr(feeHexStr).value;
        gp.candidateFee = Number(candidateFeeStr);
        const minStr = _common_bigInt__WEBPACK_IMPORTED_MODULE_0__["default"].fromHexstr(sr.readNextBytes()).value;
        gp.minInitState = Number(minStr);
        const candidateNumStr = _common_bigInt__WEBPACK_IMPORTED_MODULE_0__["default"].fromHexstr(sr.readNextBytes()).value;
        const candidateNum = Number(candidateNumStr);
        gp.candidateNum = candidateNum;
        const posLimitStr = _common_bigInt__WEBPACK_IMPORTED_MODULE_0__["default"].fromHexstr(sr.readNextBytes()).value;
        gp.posLimit = Number(posLimitStr);
        const aStr = _common_bigInt__WEBPACK_IMPORTED_MODULE_0__["default"].fromHexstr(sr.readNextBytes()).value;
        const a = Number(aStr);
        const bStr = _common_bigInt__WEBPACK_IMPORTED_MODULE_0__["default"].fromHexstr(sr.readNextBytes()).value;
        const b = Number(bStr);
        const yStr = _common_bigInt__WEBPACK_IMPORTED_MODULE_0__["default"].fromHexstr(sr.readNextBytes()).value;
        const yita = Number(yStr);
        const pStr = _common_bigInt__WEBPACK_IMPORTED_MODULE_0__["default"].fromHexstr(sr.readNextBytes()).value;
        const penalty = Number(pStr);
        gp.A = a;
        gp.B = b;
        gp.yita = yita;
        gp.penalty = penalty;
        return gp;
    }
}
class TotalStake {
    static deserialize(sr) {
        const ts = new TotalStake();
        ts.address = _crypto__WEBPACK_IMPORTED_MODULE_2__["Address"].deserialize(sr);
        ts.stake = sr.readLong();
        ts.timeOffset = sr.readUint32();
        return ts;
    }
}

/***/ }),

/***/ "./src/smartcontract/nativevm/ontAssetTxBuilder.ts":
/*!*********************************************************!*\
  !*** ./src/smartcontract/nativevm/ontAssetTxBuilder.ts ***!
  \*********************************************************/
/*! exports provided: ONT_CONTRACT, ONG_CONTRACT, getTokenContract, verifyAmount, makeTransferTx, makeWithdrawOngTx, makeQueryAllowanceTx, makeQueryBalanceTx, deserializeTransferTx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONT_CONTRACT", function() { return ONT_CONTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONG_CONTRACT", function() { return ONG_CONTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTokenContract", function() { return getTokenContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyAmount", function() { return verifyAmount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeTransferTx", function() { return makeTransferTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeWithdrawOngTx", function() { return makeWithdrawOngTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeQueryAllowanceTx", function() { return makeQueryAllowanceTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeQueryBalanceTx", function() { return makeQueryBalanceTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeTransferTx", function() { return deserializeTransferTx; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_bigInt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/bigInt */ "./src/common/bigInt.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../consts */ "./src/consts.ts");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../crypto */ "./src/crypto/index.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../error */ "./src/error.ts");
/* harmony import */ var _transaction_transaction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../transaction/transaction */ "./src/transaction/transaction.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../abi/nativeVmParamsBuilder */ "./src/smartcontract/abi/nativeVmParamsBuilder.ts");
/* harmony import */ var _abi_struct__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../abi/struct */ "./src/smartcontract/abi/struct.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/










const ONT_CONTRACT = '0000000000000000000000000000000000000001';
const ONG_CONTRACT = '0000000000000000000000000000000000000002';
/**
 * Get the address of native asset contract
 * @param tokenType Token type. Can only be ONT or ONG
 */
function getTokenContract(tokenType) {
    if (tokenType === _consts__WEBPACK_IMPORTED_MODULE_2__["TOKEN_TYPE"].ONT) {
        return new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](ONT_CONTRACT);
    } else if (tokenType === _consts__WEBPACK_IMPORTED_MODULE_2__["TOKEN_TYPE"].ONG) {
        return new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](ONG_CONTRACT);
    } else {
        throw new Error('Error token type.');
    }
}
/**
 * Verify amount
 * @param amount Amount
 */
function verifyAmount(amount) {
    const value = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](amount);
    if (!value.isInteger() || value.lte(new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](0))) {
        throw new Error('Amount is invalid.');
    }
}
/**
 * Creates transaction to transfer native assets.
 * @param tokenType ONT or ONG
 * @param from sender's address
 * @param to receiver's address
 * @param amount Amount of amount to transfer
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Address to pay for transaction's gas.
 */
function makeTransferTx(tokenType, from, to, amount, gasPrice, gasLimit, payer) {
    verifyAmount(amount);
    const num = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](amount);
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_9__["default"]();
    struct.add(from, to, num);
    const list = [];
    list.push([struct]);
    const contract = getTokenContract(tokenType);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_8__["buildNativeCodeScript"])(list);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_7__["makeNativeContractTx"])('transfer', params, contract, gasPrice, gasLimit);
    tx.tokenType = tokenType;
    tx.from = from;
    tx.to = to;
    tx.amount = amount;
    tx.method = 'transfer';
    if (payer) {
        tx.payer = payer;
    } else {
        tx.payer = from;
    }
    return tx;
}
/**
 * transfer from multiple senders to one receiver
 * this tx needs multiple senders' signature.
 * @param tokenType
 * @param from array of senders' address
 * @param to receiver's address
 * @param amounts
 */
/* export function makeTransferFromManyTx(
    tokenType: string,
    from: Address[],
    to: Address,
    amounts: string[],
    gasPrice: string,
    gasLimit: string
): Transaction {
    const states = new Array<State>(from.length);

    if (from.length !== amounts.length) {
        throw new Error('Params error.');
    }
    for (let i = 0; i < from.length; i++) {
        verifyAmount(amounts[i]);
        const s = new State(from[i], to, amounts[i]);
        states[i] = s;
    }

    const transfers = new Transfers();
    transfers.states = states;

    const contract = getTokenContract(tokenType);
    const params = transfers.serialize();
    const tx = makeNativeContractTx('transfer', params, contract, gasPrice, gasLimit);
    tx.payer = from[0];
    return tx;
} */
/**
 * transfer from one sender to multiple receivers
 * @param tokenType
 * @param from
 * @param to
 * @param amounts
 */
/* export function makeTransferToMany(
    tokenType: string,
    from: Address,
    to: Address[],
    amounts: string[],
    gasPrice: string,
    gasLimit: string
): Transaction {
    const states = new Array<State>(to.length);

    if (to.length !== amounts.length) {
        throw new Error('Params error.');
    }

    for (let i = 0; i < to.length; i++) {
        verifyAmount(amounts[i]);
        const s = new State(from, to[i], amounts[i]);
        states[i] = s;
    }

    const transfers = new Transfers();
    transfers.states = states;

    const contract = getTokenContract(tokenType);
    const params = transfers.serialize();
    const tx = makeNativeContractTx('transfer', params, contract, gasPrice, gasLimit);
    tx.payer = from;
    return tx;
} */
/**
 * Withdraw ong from sender's address and send to receiver's address
 * @param from Sender's address
 * @param to Receiver's address
 * @param amount Amount of ONG to withdraw.The value needs to multiply 1e9 to keep precision
 * @param payer Address to pay for transaction's gas
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
function makeWithdrawOngTx(from, to, amount, payer, gasPrice, gasLimit) {
    verifyAmount(amount);
    const num = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](amount);
    // const tf = new TransferFrom(from, new Address(ONT_CONTRACT), to, amount);
    // const params = tf.serialize();
    const list = [];
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_9__["default"]();
    struct.add(from, new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](ONT_CONTRACT), to, num);
    list.push(struct);
    const args = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_8__["buildNativeCodeScript"])(list);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_7__["makeNativeContractTx"])('transferFrom', args, new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](ONG_CONTRACT), gasPrice, gasLimit);
    tx.payer = payer;
    tx.tokenType = 'ONG';
    tx.from = from;
    tx.to = to;
    tx.amount = amount;
    tx.method = 'transferFrom';
    return tx;
}
/**
 * Creates transaction to query allowance that can be sent from sender to receiver
 * @param asset Asset type. Only ONT or ONg.
 * @param from Sender's address
 * @param to Receiver's address
 */
function makeQueryAllowanceTx(asset, from, to) {
    asset = asset.toLowerCase();
    if (asset !== 'ont' && asset !== 'ong') {
        throw _error__WEBPACK_IMPORTED_MODULE_4__["ERROR_CODE"].INVALID_PARAMS;
    }
    let contract = '';
    if (asset === 'ong') {
        contract = ONG_CONTRACT;
    } else {
        contract = ONT_CONTRACT;
    }
    const list = [];
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_9__["default"]();
    struct.add(from, to);
    list.push(struct);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_8__["buildNativeCodeScript"])(list);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_7__["makeNativeContractTx"])('allowance', params, new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](contract), '0', '0');
    return tx;
}
/**
 * Creates transaction to query balance.
 * @param asset Token type,ont or ong
 * @param address Address to query balance
 */
function makeQueryBalanceTx(asset, address) {
    asset = asset.toLowerCase();
    if (asset !== 'ont' && asset !== 'ong') {
        throw _error__WEBPACK_IMPORTED_MODULE_4__["ERROR_CODE"].INVALID_PARAMS;
    }
    let contract = '';
    if (asset === 'ong') {
        contract = ONG_CONTRACT;
    } else {
        contract = ONT_CONTRACT;
    }
    const params = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["hex2VarBytes"])(address.serialize());
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_7__["makeNativeContractTx"])('balanceOf', params, new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](contract), '0', '0');
    return tx;
}
function deserializeTransferTx(str) {
    const tx = _transaction_transaction__WEBPACK_IMPORTED_MODULE_5__["Transaction"].deserialize(str);
    const code = tx.payload.serialize();
    const contractIndex1 = code.lastIndexOf('14' + '000000000000000000000000000000000000000');
    const contractIndex2 = code.lastIndexOf('14' + '0000000000000000000000000000000000000002');
    if (contractIndex1 > 0 && code.substr(contractIndex1 + 41, 1) === '1') {
        tx.tokenType = 'ONT';
    } else if (contractIndex1 > 0 && code.substr(contractIndex1 + 41, 1) === '2') {
        tx.tokenType = 'ONG';
    } else {
        throw new Error('Not a transfer tx');
    }
    const contractIndex = Math.max(contractIndex1, contractIndex2);
    const params = code.substring(0, contractIndex);
    const paramsEnd = params.indexOf('6a7cc86c') + 8;
    if (params.substr(paramsEnd, 4) === '51c1') {
        // transfer
        const methodStr = params.substring(paramsEnd + 6);
        tx.method = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["hexstr2str"])(methodStr);
    } else {
        const methodStr = params.substring(paramsEnd + 2);
        tx.method = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["hexstr2str"])(methodStr);
    }
    if (tx.method === 'transfer') {
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](params);
        // const codeLength = sr.readNextLen();
        // const bytes = sr.read(4);
        sr.pos += 10;
        const from = new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](sr.read(20));
        tx.from = from;
        // const bytes2 = sr.read(4);
        sr.pos += 8;
        const to = new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](sr.read(20));
        tx.to = to;
        // const bytes3 = sr.read(3);
        sr.pos += 6;
        const numTmp = parseInt(sr.read(1), 16);
        if (sr.str.substr(sr.pos, 6) === '6a7cc8') {
            tx.amount = numTmp - 80;
        } else {
            const amount = _common_bigInt__WEBPACK_IMPORTED_MODULE_1__["default"].fromHexstr(sr.read(numTmp)).value;
            tx.amount = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](amount).toString();
        }
    } else if (tx.method === 'transferFrom') {
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](params);
        // const codeLength = sr.readNextLen();
        // const bytes = sr.read(4);
        sr.pos += 10;
        const from = new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](sr.read(20));
        tx.from = from;
        // const bytes1 = sr.read(4);
        // const contract = new Address(sr.read(20));
        // const bytes2 = sr.read(4);
        sr.pos += 56;
        const to = new _crypto__WEBPACK_IMPORTED_MODULE_3__["Address"](sr.read(20));
        tx.to = to;
        // const bytes3 = sr.read(3);
        sr.pos += 6;
        const numTmp = parseInt(sr.read(1), 16);
        if (sr.str.substr(sr.pos, 6) === '6a7cc8') {
            tx.amount = numTmp - 80;
        } else {
            const amount = _common_bigInt__WEBPACK_IMPORTED_MODULE_1__["default"].fromHexstr(sr.read(numTmp)).value;
            tx.amount = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](amount).toString();
        }
    } else {
        throw new Error('Not a transfer tx');
    }
    return tx;
}

/***/ }),

/***/ "./src/smartcontract/nativevm/ontidContractTxBuilder.ts":
/*!**************************************************************!*\
  !*** ./src/smartcontract/nativevm/ontidContractTxBuilder.ts ***!
  \**************************************************************/
/*! exports provided: ONTID_CONTRACT, buildRegisterOntidTx, buildRegIdWithAttributes, buildAddAttributeTx, buildRemoveAttributeTx, buildGetAttributesTx, buildGetDDOTx, buildAddControlKeyTx, buildRemoveControlKeyTx, buildGetPublicKeysTx, buildAddRecoveryTx, buildChangeRecoveryTx, buildGetPublicKeyStateTx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONTID_CONTRACT", function() { return ONTID_CONTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRegisterOntidTx", function() { return buildRegisterOntidTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRegIdWithAttributes", function() { return buildRegIdWithAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildAddAttributeTx", function() { return buildAddAttributeTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRemoveAttributeTx", function() { return buildRemoveAttributeTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildGetAttributesTx", function() { return buildGetAttributesTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildGetDDOTx", function() { return buildGetDDOTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildAddControlKeyTx", function() { return buildAddControlKeyTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRemoveControlKeyTx", function() { return buildRemoveControlKeyTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildGetPublicKeysTx", function() { return buildGetPublicKeysTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildAddRecoveryTx", function() { return buildAddRecoveryTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildChangeRecoveryTx", function() { return buildChangeRecoveryTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildGetPublicKeyStateTx", function() { return buildGetPublicKeyStateTx; });
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../crypto */ "./src/crypto/index.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../abi/nativeVmParamsBuilder */ "./src/smartcontract/abi/nativeVmParamsBuilder.ts");
/* harmony import */ var _abi_struct__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../abi/struct */ "./src/smartcontract/abi/struct.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/





/**
 * Address of ONT ID contract
 */
const ONTID_CONTRACT = '0000000000000000000000000000000000000003';
/**
 * Method names in ONT ID contract
 */
const ONTID_METHOD = {
    regIDWithPublicKey: 'regIDWithPublicKey',
    regIDWithAttributes: 'regIDWithAttributes',
    addAttributes: 'addAttributes',
    removeAttribute: 'removeAttribute',
    getAttributes: 'getAttributes',
    getDDO: 'getDDO',
    addKey: 'addKey',
    removeKey: 'removeKey',
    getPublicKeys: 'getPublicKeys',
    addRecovery: 'addRecovery',
    changeRecovery: 'changeRecovery',
    getKeyState: 'getKeyState'
};
/**
 * Registers Identity.
 *
 * GAS calculation: gasLimit * gasPrice is equal to the amount of gas consumed.
 *
 * @param ontid User's ONT ID
 * @param publicKey Public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
function buildRegisterOntidTx(ontid, publicKey, gasPrice, gasLimit, payer) {
    const method = ONTID_METHOD.regIDWithPublicKey;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(ontid, publicKey.serializeHex());
    const list = [struct];
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])(list);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT), gasPrice, gasLimit, payer);
    return tx;
}
/**
 * Registers Identity with initial attributes.
 *
 * @param ontid User's ONT ID
 * @param attributes Array of DDOAttributes
 * @param publicKey User's public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
function buildRegIdWithAttributes(ontid, attributes, publicKey, gasPrice, gasLimit, payer) {
    const method = ONTID_METHOD.regIDWithAttributes;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    // let attrs = '';
    // for (const a of attributes) {
    //     attrs += a.serialize();
    // }
    // const p1 = new Parameter(f.parameters[0].getName(), ParameterType.ByteArray, ontid);
    // const p2 = new Parameter(f.parameters[1].getName(), ParameterType.ByteArray, publicKey.serializeHex());
    // const p3 = new Parameter(f.parameters[2].getName(), ParameterType.ByteArray, attrs);
    // f.setParamsValue(p1, p2, p3);
    const attrLen = attributes.length;
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(ontid, publicKey.serializeHex(), attrLen);
    for (const a of attributes) {
        const key = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(a.key);
        const type = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(a.type);
        const value = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(a.value);
        struct.add(key, type, value);
    }
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT), gasPrice, gasLimit, payer);
    return tx;
}
/**
 * Adds attributes to ONT ID.
 *
 * @param ontid User's ONT ID
 * @param attributes Array of DDOAttributes
 * @param publicKey User's public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
function buildAddAttributeTx(ontid, attributes, publicKey, gasPrice, gasLimit, payer) {
    const method = ONTID_METHOD.addAttributes;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(ontid, attributes.length);
    for (const a of attributes) {
        const key = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(a.key);
        const type = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(a.type);
        const value = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(a.value);
        struct.add(key, type, value);
    }
    struct.list.push(publicKey.serializeHex());
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT), gasPrice, gasLimit, payer);
    return tx;
}
/**
 * Removes attribute from ONT ID.
 *
 * @param ontid User's ONT ID
 * @param key Key of attribute to remove
 * @param publicKey User's public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 *
 */
function buildRemoveAttributeTx(ontid, key, publicKey, gasPrice, gasLimit, payer) {
    const method = ONTID_METHOD.removeAttribute;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(ontid, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(key), publicKey.serializeHex());
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT), gasPrice, gasLimit, payer);
    return tx;
}
/**
 * Queries attributes attached to ONT ID.
 *
 * @param ontid User's ONT ID
 */
function buildGetAttributesTx(ontid) {
    const method = ONTID_METHOD.getAttributes;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(ontid);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT));
    return tx;
}
/**
 * Queries Description Object of ONT ID(DDO).
 *
 * @param ontid User's ONT ID
 */
function buildGetDDOTx(ontid) {
    const method = ONTID_METHOD.getDDO;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(ontid);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT));
    return tx;
}
/**
 * Adds a new public key to ONT ID.
 *
 * @param ontid User's ONT ID
 * @param newPk New public key to be added
 * @param userKey User's public key or address
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
function buildAddControlKeyTx(ontid, newPk, userKey, gasPrice, gasLimit, payer) {
    const method = ONTID_METHOD.addKey;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const p1 = ontid;
    const p2 = newPk.serializeHex();
    let p3;
    if (userKey instanceof _crypto__WEBPACK_IMPORTED_MODULE_0__["PublicKey"]) {
        p3 = userKey.serializeHex();
    } else if (userKey instanceof _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"]) {
        p3 = userKey.serialize();
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(p1, p2, p3);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT), gasPrice, gasLimit, payer);
    return tx;
}
/**
 * Revokes a public key from ONT ID.
 *
 * @param ontid User's ONT ID
 * @param pk2Remove Public key to be removed
 * @param sender User's public key or address
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
function buildRemoveControlKeyTx(ontid, pk2Remove, sender, gasPrice, gasLimit, payer) {
    const method = ONTID_METHOD.removeKey;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const p1 = ontid;
    const p2 = pk2Remove.serializeHex();
    let p3;
    if (sender instanceof _crypto__WEBPACK_IMPORTED_MODULE_0__["PublicKey"]) {
        p3 = sender.serializeHex();
    } else if (sender instanceof _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"]) {
        p3 = sender.serialize();
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(p1, p2, p3);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT), gasPrice, gasLimit, payer);
    return tx;
}
/**
 * Queries public keys attached to ONT ID.
 *
 * @param ontid User's ONT ID
 */
function buildGetPublicKeysTx(ontid) {
    const method = ONTID_METHOD.getPublicKeys;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(ontid);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT));
    return tx;
}
/**
 * Adds recovery address to ONT ID.
 *
 * @param ontid User's ONT ID
 * @param recovery Recovery address, must have not be set
 * @param publicKey User's public key, must be user's existing public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
function buildAddRecoveryTx(ontid, recovery, publicKey, gasPrice, gasLimit, payer) {
    const method = ONTID_METHOD.addRecovery;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const p1 = ontid;
    const p2 = recovery;
    const p3 = publicKey.serializeHex();
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(p1, p2, p3);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT), gasPrice, gasLimit, payer);
    return tx;
}
/**
 * Changes recovery address of ONT ID.
 *
 * This contract call must be initiated by the original recovery address.
 *
 * @param ontid user's ONT ID
 * @param newrecovery New recovery address
 * @param oldrecovery Original recoevery address
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
function buildChangeRecoveryTx(ontid, newrecovery, oldrecovery, gasPrice, gasLimit, payer) {
    const method = ONTID_METHOD.changeRecovery;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    const p1 = ontid;
    const p2 = newrecovery;
    const p3 = oldrecovery;
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(p1, p2, p3);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT), gasPrice, gasLimit);
    tx.payer = payer || oldrecovery;
    return tx;
}
/**
 * Queries the state of the public key associated with ONT ID.
 *
 * @param ontid user's ONT ID
 * @param pkId User's public key Id
 */
function buildGetPublicKeyStateTx(ontid, pkId) {
    const method = ONTID_METHOD.getKeyState;
    if (ontid.substr(0, 3) === 'did') {
        ontid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(ontid);
    }
    // tslint:disable-next-line:no-console
    console.log('did: ' + ontid);
    const index = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(pkId, 4, true);
    // tslint:disable-next-line:no-console
    console.log('index: ' + index);
    const struct = new _abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]();
    struct.add(ontid, pkId);
    const params = Object(_abi_nativeVmParamsBuilder__WEBPACK_IMPORTED_MODULE_3__["buildNativeCodeScript"])([struct]);
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_1__["makeNativeContractTx"])(method, params, new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](ONTID_CONTRACT));
    return tx;
}

/***/ }),

/***/ "./src/smartcontract/nativevm/token.ts":
/*!*********************************************!*\
  !*** ./src/smartcontract/nativevm/token.ts ***!
  \*********************************************/
/*! exports provided: Transfers, TokenTransfer, State, Contract, TransferFrom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transfers", function() { return Transfers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenTransfer", function() { return TokenTransfer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contract", function() { return Contract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferFrom", function() { return TransferFrom; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_bigInt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/bigInt */ "./src/common/bigInt.ts");
/* harmony import */ var _crypto_address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../crypto/address */ "./src/crypto/address.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error */ "./src/error.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */





class Transfers {
    constructor() {
        // byte
        // version : string
        this.states = [];
        // this.version = '00';
    }
    static deserialize(sr) {
        const t = new Transfers();
        // const version = sr.read(1);
        // t.version = version;
        const states = [];
        const stateLen = sr.readNextLen();
        for (let i = 0; i < stateLen; i++) {
            const state = State.deserialize(sr);
            states.push(state);
        }
        t.states = states;
        return t;
    }
    serialize() {
        let result = '';
        // result += this.version
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["num2hexstring"])(this.states.length);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.states.length; i++) {
            result += this.states[i].serialize();
        }
        return result;
    }
}
class TokenTransfer {
    static deserialize(sr) {
        const tf = new TokenTransfer();
        tf.states = [];
        const contract = sr.read(20);
        tf.contract = contract;
        const len = sr.readNextLen();
        for (let i = 0; i < len; i++) {
            const state = State.deserialize(sr);
            tf.states.push(state);
        }
        return tf;
    }
    serialize() {
        let result = '';
        result += this.contract;
        const len = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["num2hexstring"])(this.states.length);
        result += len;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.states.length; i++) {
            result += this.states[i].serialize();
        }
        return result;
    }
}
class State {
    static deserialize(sr) {
        // const version = sr.read(1);
        const from = new _crypto_address__WEBPACK_IMPORTED_MODULE_2__["Address"](sr.readNextBytes());
        const to = new _crypto_address__WEBPACK_IMPORTED_MODULE_2__["Address"](sr.readNextBytes());
        // const value = (new BigNumber(sr.readNextBytes(), 16)).toString();
        // const value = sr.read(8);
        const value = _common_bigInt__WEBPACK_IMPORTED_MODULE_1__["default"].fromHexstr(sr.readNextBytes()).value;
        return new State(from, to, value.toString());
    }
    constructor(from, to, value) {
        const bi = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](value);
        if (!bi.isInteger() || bi.isNegative()) {
            throw _error__WEBPACK_IMPORTED_MODULE_3__["ERROR_CODE"].INVALID_PARAMS;
        }
        this.from = from;
        this.to = to;
        this.value = value;
    }
    serialize() {
        let result = '';
        // result += this.version
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hex2VarBytes"])(this.from.serialize());
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hex2VarBytes"])(this.to.serialize());
        const bi = new _common_bigInt__WEBPACK_IMPORTED_MODULE_1__["default"](this.value).toHexstr();
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hex2VarBytes"])(bi);
        return result;
    }
}
class Contract {
    static deserialize(sr) {
        const c = new Contract();
        const version = sr.read(1);
        const address = _crypto_address__WEBPACK_IMPORTED_MODULE_2__["Address"].deserialize(sr);
        const method = sr.readNextBytes();
        const args = sr.readNextBytes();
        c.version = version;
        c.address = address;
        c.method = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hexstr2str"])(method);
        c.args = args;
        return c;
    }
    constructor() {
        this.version = '00';
    }
    serialize() {
        let result = '';
        result += this.version;
        result += this.address.serialize();
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["str2VarBytes"])(this.method);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hex2VarBytes"])(this.args);
        return result;
    }
}
class TransferFrom {
    static deserialize(sr) {
        // const version = sr.read(1);
        const sender = new _crypto_address__WEBPACK_IMPORTED_MODULE_2__["Address"](sr.readNextBytes());
        const from = new _crypto_address__WEBPACK_IMPORTED_MODULE_2__["Address"](sr.readNextBytes());
        const to = new _crypto_address__WEBPACK_IMPORTED_MODULE_2__["Address"](sr.readNextBytes());
        const value = _common_bigInt__WEBPACK_IMPORTED_MODULE_1__["default"].fromHexstr(sr.readNextBytes()).value;
        const tf = new TransferFrom(sender, from, to, value.toString());
        return tf;
    }
    constructor(sender, from, to, value) {
        const bi = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](value);
        if (!bi.isInteger() || !bi.isNegative()) {
            throw _error__WEBPACK_IMPORTED_MODULE_3__["ERROR_CODE"].INVALID_PARAMS;
        }
        this.sender = sender;
        this.from = from;
        this.to = to;
        this.value = value;
    }
    serialize() {
        let result = '';
        // result += this.version
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hex2VarBytes"])(this.sender.serialize());
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hex2VarBytes"])(this.from.serialize());
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hex2VarBytes"])(this.to.serialize());
        const biHex = new _common_bigInt__WEBPACK_IMPORTED_MODULE_1__["default"](this.value).toHexstr();
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["hex2VarBytes"])(biHex);
        return result;
    }
}

/***/ }),

/***/ "./src/smartcontract/neovm/attestClaimTxBuilder.ts":
/*!*********************************************************!*\
  !*** ./src/smartcontract/neovm/attestClaimTxBuilder.ts ***!
  \*********************************************************/
/*! exports provided: buildCommitRecordTx, buildRevokeRecordTx, buildGetRecordStatusTx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCommitRecordTx", function() { return buildCommitRecordTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRevokeRecordTx", function() { return buildRevokeRecordTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildGetRecordStatusTx", function() { return buildGetRecordStatusTx; });
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../crypto */ "./src/crypto/index.ts");
/* harmony import */ var _smartcontract_abi_abiInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../smartcontract/abi/abiInfo */ "./src/smartcontract/abi/abiInfo.ts");
/* harmony import */ var _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../smartcontract/abi/parameter */ "./src/smartcontract/abi/parameter.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _transaction_transaction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../transaction/transaction */ "./src/transaction/transaction.ts");
/* harmony import */ var _data_attestClaim__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../data/attestClaim */ "./src/smartcontract/data/attestClaim.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/







const abiInfo = _smartcontract_abi_abiInfo__WEBPACK_IMPORTED_MODULE_1__["default"].parseJson(JSON.stringify(_data_attestClaim__WEBPACK_IMPORTED_MODULE_6__["default"]));
const contractHash = abiInfo.getHash().replace('0x', '');
const contractAddress = new _crypto__WEBPACK_IMPORTED_MODULE_0__["Address"](Object(_utils__WEBPACK_IMPORTED_MODULE_4__["reverseHex"])(contractHash));
/* TODO : Test */
/**
 * Attests the claim.
 *
 * @param claimId Unique id of the claim
 * @param issuer Issuer's ONT ID
 * @param subject Subject's ONT ID
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer's address
 */
function buildCommitRecordTx(claimId, issuer, subject, gasPrice, gasLimit, payer) {
    const f = abiInfo.getFunction('Commit');
    if (issuer.substr(0, 3) === 'did') {
        issuer = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["str2hexstr"])(issuer);
    }
    if (subject.substr(0, 3) === 'did') {
        subject = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["str2hexstr"])(issuer);
    }
    const p1 = new _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["Parameter"](f.parameters[0].getName(), _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["ParameterType"].ByteArray, Object(_utils__WEBPACK_IMPORTED_MODULE_4__["str2hexstr"])(claimId));
    const p2 = new _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["Parameter"](f.parameters[1].getName(), _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["ParameterType"].ByteArray, issuer);
    const p3 = new _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["Parameter"](f.parameters[2].getName(), _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["ParameterType"].ByteArray, subject);
    let tx = new _transaction_transaction__WEBPACK_IMPORTED_MODULE_5__["Transaction"]();
    tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(f.name, [p1, p2, p3], contractAddress, gasPrice, gasLimit, payer);
    return tx;
}
/**
 * Revokes the claim.
 *
 * @param claimId Unique id of the claim
 * @param revokerOntid Revoker's ONT ID
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer's address
 */
function buildRevokeRecordTx(claimId, revokerOntid, gasPrice, gasLimit, payer) {
    const f = abiInfo.getFunction('Revoke');
    const name1 = f.parameters[0].getName();
    const type1 = _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["ParameterType"].ByteArray;
    if (revokerOntid.substr(0, 3) === 'did') {
        revokerOntid = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["str2hexstr"])(revokerOntid);
    }
    const p1 = new _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["Parameter"](name1, type1, Object(_utils__WEBPACK_IMPORTED_MODULE_4__["str2hexstr"])(claimId));
    const p2 = new _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["Parameter"](f.parameters[1].getName(), _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["ParameterType"].ByteArray, revokerOntid);
    return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(f.name, [p1, p2], contractAddress, gasPrice, gasLimit, payer);
}
/**
 * Queries the state of attest.
 *
 * @param claimId Unique id of the claim
 */
function buildGetRecordStatusTx(claimId) {
    const f = abiInfo.getFunction('GetStatus');
    const p1 = new _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["Parameter"](f.parameters[0].getName(), _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_2__["ParameterType"].ByteArray, Object(_utils__WEBPACK_IMPORTED_MODULE_4__["str2hexstr"])(claimId));
    const tx = Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(f.name, [p1], contractAddress);
    return tx;
}

/***/ }),

/***/ "./src/smartcontract/neovm/oep4TxBuilder.ts":
/*!**************************************************!*\
  !*** ./src/smartcontract/neovm/oep4TxBuilder.ts ***!
  \**************************************************/
/*! exports provided: Oep4State, Oep4TxBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Oep4State", function() { return Oep4State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Oep4TxBuilder", function() { return Oep4TxBuilder; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../transaction/scriptBuilder */ "./src/transaction/scriptBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _abi_parameter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../abi/parameter */ "./src/smartcontract/abi/parameter.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/





const functionNames = {
    Init: 'init',
    Transfer: 'transfer',
    TransferMulti: 'transferMulti',
    Approve: 'approve',
    TransferFromm: 'transferFrom',
    Allowance: 'allowance',
    BalanceOf: 'balanceOf',
    TotalSupply: 'totalSupply',
    Symbol: 'symbol',
    Decimals: 'decimals',
    Name: 'name'
};
class Oep4State {
    constructor(from, to, amount) {
        this.from = from.serialize();
        this.to = to.serialize();
        this.amount = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](amount);
    }
}
/**
 * Transaction builder for oep-4 contracts
 */
class Oep4TxBuilder {
    constructor(contractAddr) {
        this.contractAddr = contractAddr;
    }
    /**
     * Init the oep-4 smart contract
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer's address to pay for gas
     */
    init(gasPrice, gasLimit, payer) {
        const funcName = functionNames.Init;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, [], this.contractAddr, gasPrice, gasLimit, payer);
    }
    /**
     * Make transaction for transfer
     * @param from Sender's address
     * @param to Receiver's address
     * @param amount Amountof asset to transfer
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer's address to pay for gas
     */
    makeTransferTx(from, to, amount, gasPrice, gasLimit, payer) {
        const funcName = functionNames.Transfer;
        const p1 = new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('from', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, from.serialize());
        const p2 = new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('to', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, to.serialize());
        const p3 = new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('value', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Long, amount);
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, [p1, p2, p3], this.contractAddr, gasPrice, gasLimit, payer);
    }
    /**
     * Make transaction for multi transfer.
     * The transaction needs signatures of each sender in states and the signature of the payer.
     * @param states Array of State(sender, receiver, amount)
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer to pay for gas
     */
    makeTransferMultiTx(states, gasPrice, gasLimit, payer) {
        const list = [];
        list.push(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(functionNames.TransferMulti));
        const temp = [];
        for (const state of states) {
            temp.push([state.from, state.to, state.amount]);
        }
        list.push(temp);
        const params = Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_1__["createCodeParamsScript"])(list);
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])('', params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    /**
     * Make transaction for approve
     * @param owner Owner's address
     * @param spender Spender's address
     * @param amount Amount
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer to pay for gas
     */
    makeApproveTx(owner, spender, amount, gasPrice, gasLimit, payer) {
        const funcName = functionNames.Approve;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('owner', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, owner.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('spender', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, spender.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('amount', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Long, amount)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeTransferFromTx(sender, from, to, amount, gasPrice, gasLimit, payer) {
        const funcName = functionNames.TransferFromm;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('owner', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, sender.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('from', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, from.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('to', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, to.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('amount', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Long, amount)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeQueryAllowanceTx(owner, spender) {
        const funcName = functionNames.Allowance;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('owner', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, owner.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('spender', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, spender.serialize())];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, params, this.contractAddr);
    }
    /**
     * Query the balance
     * @param address Address to query balance
     */
    queryBalanceOf(address) {
        const funcName = functionNames.BalanceOf;
        const p1 = new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('from', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, address.serialize());
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, [p1], this.contractAddr);
    }
    /**
     * Query the total supply of oep-4 contract
     */
    queryTotalSupply() {
        const funcName = functionNames.TotalSupply;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, [], this.contractAddr);
    }
    /**
     * Query the total supply of oep-4 contract
     */
    queryDecimals() {
        const funcName = functionNames.Decimals;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, [], this.contractAddr);
    }
    /**
     * Query the total supply of oep-4 contract
     */
    querySymbol() {
        const funcName = functionNames.Symbol;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, [], this.contractAddr);
    }
    /**
     * Query the total supply of oep-4 contract
     */
    queryName() {
        const funcName = functionNames.Name;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_4__["makeInvokeTransaction"])(funcName, [], this.contractAddr);
    }
}

/***/ }),

/***/ "./src/smartcontract/neovm/oep5TxBuilder.ts":
/*!**************************************************!*\
  !*** ./src/smartcontract/neovm/oep5TxBuilder.ts ***!
  \**************************************************/
/*! exports provided: Oep5Param, Oep5TxBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Oep5Param", function() { return Oep5Param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Oep5TxBuilder", function() { return Oep5TxBuilder; });
/* harmony import */ var _transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../transaction/scriptBuilder */ "./src/transaction/scriptBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _abi_parameter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../abi/parameter */ "./src/smartcontract/abi/parameter.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/




class Oep5Param {
    constructor(toAcct, tokenId) {
        this.toAcct = toAcct.serialize();
        this.tokenId = tokenId;
    }
}
const FunctionNames = {
    Init: 'init',
    Name: 'name',
    Symbol: 'symbol',
    TotalSupply: 'totalSupply',
    BalanceOf: 'balanceOf',
    OwnerOf: 'ownerOf',
    Transfer: 'transfer',
    TransferMulti: 'transferMulti',
    Approve: 'approve',
    ApproveMulti: 'approveMulti',
    TakeOwnership: 'takeOwnership',
    QueryTokenIDByIndex: 'queryTokenIDByIndex',
    QueryTokenByID: 'queryTokenByID',
    GetApproved: 'getApproved',
    CreateMultiTokens: 'createMultiTokens',
    CreateOneToken: 'createOneToken'
};
class Oep5TxBuilder {
    constructor(contractAddr) {
        this.contractAddr = contractAddr;
    }
    makeInitTx(gasPrice, gasLimit, payer) {
        const func = FunctionNames.Init;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, [], this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeOwnerOfTx(tokenId) {
        const func = FunctionNames.OwnerOf;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, tokenId)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    /**
     * Transfer the control to someone else
     * @param oep5Param
     * @param gasPrice
     * @param gasLimit
     * @param payer
     */
    makeTransferTx(oep5Param, gasPrice, gasLimit, payer) {
        const func = FunctionNames.Transfer;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('toAcct', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, oep5Param.toAcct), new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, oep5Param.tokenId)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    /**
     * Transfer the control to multi people
     */
    makeTransferMultiTx(oep5Params, gasPrice, gasLimit, payer) {
        const list = [];
        list.push(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["str2hexstr"])(FunctionNames.TransferMulti));
        const temp = [];
        for (const param of oep5Params) {
            temp.push([param.toAcct, param.tokenId]);
        }
        list.push(temp);
        const params = Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_0__["createCodeParamsScript"])(list);
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])('', params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    /**
     * Approve the token to toAcct address, it can overwrite older approved address
     * @param oep5Param
     * @param gasPrice
     * @param gasLimit
     * @param payer
     */
    makeApproveTx(oep5Param, gasPrice, gasLimit, payer) {
        const func = FunctionNames.Approve;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('toAcct', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, oep5Param.toAcct), new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, oep5Param.tokenId)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    /**
     * Take the approved token.
     * @param oep5Param
     * @param gasPrice
     * @param gasLimit
     * @param payer
     */
    makeTakeOwnershipTx(oep5Param, gasPrice, gasLimit, payer) {
        const func = FunctionNames.TakeOwnership;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('toAcct', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, oep5Param.toAcct), new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, oep5Param.tokenId)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeQueryBalanceOfTx(addr) {
        const func = FunctionNames.BalanceOf;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('addr', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, addr.serialize())];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeQueryTotalSupplyTx() {
        const func = FunctionNames.TotalSupply;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, [], this.contractAddr);
    }
    makeQueryTokenIDByIndexTx(index) {
        const func = FunctionNames.QueryTokenIDByIndex;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('index', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Long, index)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeQueryTokenByIDTx(tokenId) {
        const func = FunctionNames.QueryTokenByID;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, tokenId)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeGetApprovedTx(tokenId) {
        const func = FunctionNames.GetApproved;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray, tokenId)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeQueryNameTx() {
        const func = FunctionNames.Name;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, [], this.contractAddr);
    }
    makeQuerySymbolTx() {
        const func = FunctionNames.Symbol;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_2__["makeInvokeTransaction"])(func, [], this.contractAddr);
    }
}

/***/ }),

/***/ "./src/smartcontract/neovm/oep8TxBuilder.ts":
/*!**************************************************!*\
  !*** ./src/smartcontract/neovm/oep8TxBuilder.ts ***!
  \**************************************************/
/*! exports provided: Oep8State, TransferFrom, Oep8TxBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Oep8State", function() { return Oep8State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferFrom", function() { return TransferFrom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Oep8TxBuilder", function() { return Oep8TxBuilder; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../transaction/scriptBuilder */ "./src/transaction/scriptBuilder.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../transaction/transactionBuilder */ "./src/transaction/transactionBuilder.ts");
/* harmony import */ var _abi_parameter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../abi/parameter */ "./src/smartcontract/abi/parameter.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/






class Oep8State {
    constructor(from, to, tokenId, value) {
        this.from = from.serialize();
        this.to = to.serialize();
        this.tokenId = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(tokenId);
        this.value = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](value);
    }
}
class TransferFrom {
    constructor(spender, from, to, tokenId, value) {
        this.spender = spender.serialize();
        this.from = from.serialize();
        this.to = to.serialize();
        this.tokenId = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(tokenId);
        this.value = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](value);
    }
}
const FunctionNames = {
    Name: 'name',
    Symbol: 'symbol',
    TotalSupply: 'totalSupply',
    BalanceOf: 'balanceOf',
    Transfer: 'transfer',
    TransferMulti: 'transferMulti',
    Approve: 'approve',
    ApproveMulti: 'approveMulti',
    Allowance: 'allowance',
    TransferFrom: 'transferFrom',
    TransferFromMulti: 'transferFromMulti',
    Compound: 'compound',
    Concatkey: 'concatkey',
    Init: 'init',
    CreateMultiKindsPumpkin: 'createMultiKindsPumpkin',
    CheckTokenPrefix: 'checkTokenPrefix',
    BalancesOf: 'balancesOf',
    TotalBalanceOf: 'totalBalanceOf',
    CheckTokenId: 'checkTokenId'
};
class Oep8TxBuilder {
    constructor(contractAddr) {
        this.contractAddr = contractAddr;
    }
    makeInitTx(gasPrice, gasLimit, payer) {
        const func = FunctionNames.Init;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, [], this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeTransferTx(sendAddr, recvAddr, tokenId, amount, gasPrice, gasLimit, payer) {
        const func = FunctionNames.Transfer;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('sender', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, sendAddr.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('recv', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, recvAddr.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, tokenId), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('amount', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].Long, amount)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeTransferMultiTx(states, gasPrice, gasLimit, payer) {
        const list = [];
        list.push(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(FunctionNames.TransferMulti));
        const temp = [];
        for (const state of states) {
            temp.push([state.from, state.to, state.tokenId, state.value]);
        }
        list.push(temp);
        const params = Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_1__["createCodeParamsScript"])(list);
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])('', params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeApproveTx(owner, spender, tokenId, amount, gasPrice, gasLimit, payer) {
        const func = FunctionNames.Approve;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('owner', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, owner.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('spender', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, spender.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(tokenId)), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('amount', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].Long, amount)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeApproveMulti(states, gasPrice, gasLimit, payer) {
        const func = FunctionNames.ApproveMulti;
        const list = [];
        list.push(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(func));
        const temp = [];
        for (const state of states) {
            temp.push([state.from, state.to, state.tokenId, state.value]);
        }
        list.push(temp);
        const params = Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_1__["createCodeParamsScript"])(list);
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])('', params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeTransferFromMulti(states, gasPrice, gasLimit, payer) {
        const func = FunctionNames.TransferFromMulti;
        const list = [];
        list.push(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["str2hexstr"])(func));
        const temp = [];
        for (const state of states) {
            temp.push([state.spender, state.from, state.to, state.tokenId, state.value]);
        }
        list.push(temp);
        const params = Object(_transaction_scriptBuilder__WEBPACK_IMPORTED_MODULE_1__["createCodeParamsScript"])(list);
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])('', params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeTransferFromTx(sender, from, to, tokenId, amount, gasPrice, gasLimit, payer) {
        const func = FunctionNames.TransferFrom;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('sender', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, sender.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('from', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, from.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('to', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, to.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(tokenId)), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('amount', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].Long, amount)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    /**
     * Compound tokens
     * @param account User's address
     * @param compoundNum 0 - compound all tokens that can be compounded; 1 - compound 1 token of each type.
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer to pay for gas
     */
    makeCompoundTx(account, compoundNum, gasPrice, gasLimit, payer) {
        const func = FunctionNames.Compound;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('account', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, account.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('compoundNum', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].Integer, compoundNum)];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr, gasPrice, gasLimit, payer);
    }
    makeQueryAllowanceTx(owner, spender, tokenId) {
        const func = FunctionNames.Allowance;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('owner', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, owner.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('spender', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, spender.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(tokenId))];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeQueryBalanceOfTx(addr, tokenId) {
        const func = FunctionNames.BalanceOf;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('addr', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, addr.serialize()), new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(tokenId))];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeQueryTotalSupplyTx(tokenId) {
        const func = FunctionNames.TotalSupply;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(tokenId))];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeQueryNameTx(tokenId) {
        const func = FunctionNames.Name;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(tokenId))];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeQueryDecimalsTx() {
        const func = FunctionNames.Symbol;
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, [], this.contractAddr);
    }
    makeQuerySymbolTx(tokenId) {
        const func = FunctionNames.Symbol;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('tokenId', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["num2hexstring"])(tokenId))];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeQueryBalancesTx(account) {
        const func = FunctionNames.BalancesOf;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('account', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, account.serialize())];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
    makeQueryTotalBalanceTx(account) {
        const func = FunctionNames.TotalBalanceOf;
        const params = [new _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["Parameter"]('account', _abi_parameter__WEBPACK_IMPORTED_MODULE_4__["ParameterType"].ByteArray, account.serialize())];
        return Object(_transaction_transactionBuilder__WEBPACK_IMPORTED_MODULE_3__["makeInvokeTransaction"])(func, params, this.contractAddr);
    }
}

/***/ }),

/***/ "./src/transaction/ddo.ts":
/*!********************************!*\
  !*** ./src/transaction/ddo.ts ***!
  \********************************/
/*! exports provided: PublicKeyWithId, DDOAttribute, DDO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicKeyWithId", function() { return PublicKeyWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DDOAttribute", function() { return DDOAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DDO", function() { return DDO; });
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../crypto */ "./src/crypto/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * Public key representation with recorded id from blockchain.
 *
 */
class PublicKeyWithId {
    /**
     * Deserialize from hex string to PublicKeyWithId
     * @param hexstr
     */
    static deserialize(hexstr) {
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_1__["StringReader"](hexstr);
        const result = [];
        while (!sr.isEmpty()) {
            const index = sr.readUint32();
            const data = sr.readNextBytes();
            const p = new PublicKeyWithId();
            p.id = index;
            p.pk = _crypto__WEBPACK_IMPORTED_MODULE_0__["PublicKey"].deserializeHex(new _utils__WEBPACK_IMPORTED_MODULE_1__["StringReader"](data));
            result.push(p);
        }
        return result;
    }
}
/**
 * Description attribute of ONT ID
 */
class DDOAttribute {
    static deserialize(hexstr) {
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_1__["StringReader"](hexstr);
        const result = [];
        while (!sr.isEmpty()) {
            const key = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["hexstr2str"])(sr.readNextBytes());
            const type = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["hexstr2str"])(sr.readNextBytes());
            const value = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["hexstr2str"])(sr.readNextBytes());
            const d = new DDOAttribute();
            d.key = key;
            d.type = type;
            d.value = value;
            result.push(d);
        }
        return result;
    }
    /**
     * Serialize DDO to hex string
     */
    serialize() {
        let result = '';
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["str2VarBytes"])(this.key);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["str2VarBytes"])(this.type);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["str2VarBytes"])(this.value);
        return result;
    }
}
/**
 * Description object of ONT ID
 */
class DDO {
    constructor() {
        /**
         * Array of public keys
         */
        this.publicKeys = [];
        /**
         * Array of attributes
         */
        this.attributes = [];
        /**
         * Recovery of DDO
         */
        this.recovery = '';
    }
    /**
     * Deserialize from hex string to DDO
     * @param hexstr Hex encoded string
     */
    static deserialize(hexstr) {
        const ss = new _utils__WEBPACK_IMPORTED_MODULE_1__["StringReader"](hexstr);
        const ddo = new DDO();
        const pkLen = ss.readNextLen();
        if (pkLen > 0) {
            ddo.publicKeys = PublicKeyWithId.deserialize(ss.read(pkLen));
        }
        const attrLen = ss.readNextLen();
        if (attrLen > 0) {
            ddo.attributes = DDOAttribute.deserialize(ss.read(attrLen));
        }
        const recoveryLen = ss.readNextLen();
        if (recoveryLen > 0) {
            ddo.recovery = ss.read(recoveryLen);
        }
        return ddo;
    }
}

/***/ }),

/***/ "./src/transaction/opcode.ts":
/*!***********************************!*\
  !*** ./src/transaction/opcode.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/
var OPCODE;
(function (OPCODE) {
    // Constants
    OPCODE[OPCODE["PUSH0"] = 0] = "PUSH0";
    OPCODE[OPCODE["PUSHF"] = 0] = "PUSHF";
    OPCODE[OPCODE["PUSHBYTES1"] = 1] = "PUSHBYTES1";
    OPCODE[OPCODE["PUSHBYTES75"] = 75] = "PUSHBYTES75";
    OPCODE[OPCODE["PUSHDATA1"] = 76] = "PUSHDATA1";
    OPCODE[OPCODE["PUSHDATA2"] = 77] = "PUSHDATA2";
    OPCODE[OPCODE["PUSHDATA4"] = 78] = "PUSHDATA4";
    OPCODE[OPCODE["PUSHM1"] = 79] = "PUSHM1";
    OPCODE[OPCODE["PUSH1"] = 81] = "PUSH1";
    OPCODE[OPCODE["PUSHT"] = 81] = "PUSHT";
    OPCODE[OPCODE["PUSH2"] = 82] = "PUSH2";
    OPCODE[OPCODE["PUSH3"] = 83] = "PUSH3";
    OPCODE[OPCODE["PUSH4"] = 84] = "PUSH4";
    OPCODE[OPCODE["PUSH5"] = 85] = "PUSH5";
    OPCODE[OPCODE["PUSH6"] = 86] = "PUSH6";
    OPCODE[OPCODE["PUSH7"] = 87] = "PUSH7";
    OPCODE[OPCODE["PUSH8"] = 88] = "PUSH8";
    OPCODE[OPCODE["PUSH9"] = 89] = "PUSH9";
    OPCODE[OPCODE["PUSH10"] = 90] = "PUSH10";
    OPCODE[OPCODE["PUSH11"] = 91] = "PUSH11";
    OPCODE[OPCODE["PUSH12"] = 92] = "PUSH12";
    OPCODE[OPCODE["PUSH13"] = 93] = "PUSH13";
    OPCODE[OPCODE["PUSH14"] = 94] = "PUSH14";
    OPCODE[OPCODE["PUSH15"] = 95] = "PUSH15";
    OPCODE[OPCODE["PUSH16"] = 96] = "PUSH16";
    // Flow control
    OPCODE[OPCODE["NOP"] = 97] = "NOP";
    OPCODE[OPCODE["JMP"] = 98] = "JMP";
    OPCODE[OPCODE["JMPIF"] = 99] = "JMPIF";
    OPCODE[OPCODE["JMPIFNOT"] = 100] = "JMPIFNOT";
    OPCODE[OPCODE["CALL"] = 101] = "CALL";
    OPCODE[OPCODE["RET"] = 102] = "RET";
    OPCODE[OPCODE["APPCALL"] = 103] = "APPCALL";
    OPCODE[OPCODE["SYSCALL"] = 104] = "SYSCALL";
    OPCODE[OPCODE["TAILCALL"] = 105] = "TAILCALL";
    OPCODE[OPCODE["DUPFROMALTSTACK"] = 106] = "DUPFROMALTSTACK";
    // Stack
    OPCODE[OPCODE["TOALTSTACK"] = 107] = "TOALTSTACK";
    OPCODE[OPCODE["FROMALTSTACK"] = 108] = "FROMALTSTACK";
    OPCODE[OPCODE["XDROP"] = 109] = "XDROP";
    OPCODE[OPCODE["XSWAP"] = 114] = "XSWAP";
    OPCODE[OPCODE["XTUCK"] = 115] = "XTUCK";
    OPCODE[OPCODE["DEPTH"] = 116] = "DEPTH";
    OPCODE[OPCODE["DROP"] = 117] = "DROP";
    OPCODE[OPCODE["DUP"] = 118] = "DUP";
    OPCODE[OPCODE["NIP"] = 119] = "NIP";
    OPCODE[OPCODE["OVER"] = 120] = "OVER";
    OPCODE[OPCODE["PICK"] = 121] = "PICK";
    OPCODE[OPCODE["ROLL"] = 122] = "ROLL";
    OPCODE[OPCODE["ROT"] = 123] = "ROT";
    OPCODE[OPCODE["SWAP"] = 124] = "SWAP";
    OPCODE[OPCODE["TUCK"] = 125] = "TUCK";
    // Splice
    OPCODE[OPCODE["CAT"] = 126] = "CAT";
    OPCODE[OPCODE["SUBSTR"] = 127] = "SUBSTR";
    OPCODE[OPCODE["LEFT"] = 128] = "LEFT";
    OPCODE[OPCODE["RIGHT"] = 129] = "RIGHT";
    OPCODE[OPCODE["SIZE"] = 130] = "SIZE";
    // Bitwise logic
    OPCODE[OPCODE["INVERT"] = 131] = "INVERT";
    OPCODE[OPCODE["AND"] = 132] = "AND";
    OPCODE[OPCODE["OR"] = 133] = "OR";
    OPCODE[OPCODE["XOR"] = 134] = "XOR";
    OPCODE[OPCODE["EQUAL"] = 135] = "EQUAL";
    // EQUALVERIFY = 0x88, // Same as EQUAL, but runs VERIFY afterward.
    // RESERVED1 = 0x89, // Transaction is invalid unless occuring in an unexecuted IF branch
    // RESERVED2 = 0x8A, // Transaction is invalid unless occuring in an unexecuted IF branch
    // Arithmetic
    // Note: Arithmetic inputs are limited to signed 32-bit integers, but may overflow their output.
    OPCODE[OPCODE["INC"] = 139] = "INC";
    OPCODE[OPCODE["DEC"] = 140] = "DEC";
    // SAL           = 0x8D, // The input is multiplied by 2.
    // SAR           = 0x8E, // The input is divided by 2.
    OPCODE[OPCODE["NEGATE"] = 143] = "NEGATE";
    OPCODE[OPCODE["ABS"] = 144] = "ABS";
    OPCODE[OPCODE["NOT"] = 145] = "NOT";
    OPCODE[OPCODE["NZ"] = 146] = "NZ";
    OPCODE[OPCODE["ADD"] = 147] = "ADD";
    OPCODE[OPCODE["SUB"] = 148] = "SUB";
    OPCODE[OPCODE["MUL"] = 149] = "MUL";
    OPCODE[OPCODE["DIV"] = 150] = "DIV";
    OPCODE[OPCODE["MOD"] = 151] = "MOD";
    OPCODE[OPCODE["SHL"] = 152] = "SHL";
    OPCODE[OPCODE["SHR"] = 153] = "SHR";
    OPCODE[OPCODE["BOOLAND"] = 154] = "BOOLAND";
    OPCODE[OPCODE["BOOLOR"] = 155] = "BOOLOR";
    OPCODE[OPCODE["NUMEQUAL"] = 156] = "NUMEQUAL";
    OPCODE[OPCODE["NUMNOTEQUAL"] = 158] = "NUMNOTEQUAL";
    OPCODE[OPCODE["LT"] = 159] = "LT";
    OPCODE[OPCODE["GT"] = 160] = "GT";
    OPCODE[OPCODE["LTE"] = 161] = "LTE";
    OPCODE[OPCODE["GTE"] = 162] = "GTE";
    OPCODE[OPCODE["MIN"] = 163] = "MIN";
    OPCODE[OPCODE["MAX"] = 164] = "MAX";
    OPCODE[OPCODE["WITHIN"] = 165] = "WITHIN";
    // Crypto
    // RIPEMD160 = 0xA6, // The input is hashed using RIPEMD-160.
    OPCODE[OPCODE["SHA1"] = 167] = "SHA1";
    OPCODE[OPCODE["SHA256"] = 168] = "SHA256";
    OPCODE[OPCODE["HASH160"] = 169] = "HASH160";
    OPCODE[OPCODE["HASH256"] = 170] = "HASH256";
    // tslint:disable-next-line:max-line-length
    OPCODE[OPCODE["CHECKSIG"] = 172] = "CHECKSIG";
    // tslint:disable-next-line:max-line-length
    OPCODE[OPCODE["CHECKMULTISIG"] = 174] = "CHECKMULTISIG";
    // Array
    // tslint:disable:indent
    OPCODE[OPCODE["ARRAYSIZE"] = 192] = "ARRAYSIZE";
    OPCODE[OPCODE["PACK"] = 193] = "PACK";
    OPCODE[OPCODE["UNPACK"] = 194] = "UNPACK";
    OPCODE[OPCODE["PICKITEM"] = 195] = "PICKITEM";
    OPCODE[OPCODE["SETITEM"] = 196] = "SETITEM";
    OPCODE[OPCODE["NEWARRAY"] = 197] = "NEWARRAY";
    OPCODE[OPCODE["NEWSTRUCT"] = 198] = "NEWSTRUCT";
    OPCODE[OPCODE["NEWMAP"] = 199] = "NEWMAP";
    OPCODE[OPCODE["APPEND"] = 200] = "APPEND";
    OPCODE[OPCODE["REVERSE"] = 201] = "REVERSE";
    OPCODE[OPCODE["REMOVE"] = 202] = "REMOVE";
    OPCODE[OPCODE["HASKEY"] = 203] = "HASKEY";
    OPCODE[OPCODE["KEYS"] = 204] = "KEYS";
    OPCODE[OPCODE["VALUES"] = 205] = "VALUES";
    // Exception
    OPCODE[OPCODE["THROW"] = 240] = "THROW";
    OPCODE[OPCODE["THROWIFNOT"] = 241] = "THROWIFNOT";
})(OPCODE || (OPCODE = {}));
/* harmony default export */ __webpack_exports__["default"] = (OPCODE);

/***/ }),

/***/ "./src/transaction/payload/deployCode.ts":
/*!***********************************************!*\
  !*** ./src/transaction/payload/deployCode.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DeployCode; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _payload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payload */ "./src/transaction/payload/payload.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * Describes the payload of deploy code
 */
class DeployCode extends _payload__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Serialize deploy code to hex string
   */
  serialize() {
    let result = '';
    // result += this.code.serialize();
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hex2VarBytes"])(this.code);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["bool2VarByte"])(this.needStorage);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["str2VarBytes"])(this.name);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["str2VarBytes"])(this.version);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["str2VarBytes"])(this.author);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["str2VarBytes"])(this.email);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["str2VarBytes"])(this.description);
    return result;
  }
  /**
   * Deserialize deploy code
   * @param sr
   */
  deserialize(sr) {
    // const code = VmCode.deserialize(sr);
    const code = sr.readNextBytes();
    this.code = code;
    const boolValue = sr.read(1);
    this.needStorage = boolValue === '00' ? false : true;
    const name = sr.readNextBytes();
    this.name = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hexstr2str"])(name);
    const codeVersion = sr.readNextBytes();
    this.version = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hexstr2str"])(codeVersion);
    const author = sr.readNextBytes();
    this.author = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hexstr2str"])(author);
    const email = sr.readNextBytes();
    this.email = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hexstr2str"])(email);
    const description = sr.readNextBytes();
    this.description = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hexstr2str"])(description);
  }
}

/***/ }),

/***/ "./src/transaction/payload/invokeCode.ts":
/*!***********************************************!*\
  !*** ./src/transaction/payload/invokeCode.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvokeCode; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _payload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payload */ "./src/transaction/payload/payload.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */


class InvokeCode extends _payload__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super();
        // this.gasLimit = new Fixed64()
    }
    /*     serialize() : string {
            let payloadLength
            let paramsLength = num2hexstring( 0x50 + this.parameters.length) //start from '0x50'
            const paramsEnd = 'c1'
            let funcNameHex = str2hexstr(this.functionName)
            const funcNameLength = num2hexstring(funcNameHex.length/2)
    
            let params = []
            for(let i = this.parameters.length-1; i > -1; i--) {
                let p = this.parameters[i]
                let hexP = p.getValue()
                let hexPLength = num2VarInt( hexP.length / 2)
                let opcode = ''
                if( hexP.length/2 < OPCODE.PUSHBYTES75) {
    
                } else if (hexP.length / 2 < 0x100) {
                    opcode = num2VarInt( OPCODE.PUSHDATA1 )
                } else if( hexP.length/2 < 0x1000 ) {
                    opcode = num2hexstring( OPCODE.PUSHDATA2, 2, true)
                } else {
                    opcode = num2hexstring( OPCODE.PUSHDATA4, 4, true)
                }
                params.push ({
                    hexPLength,
                    hexP,
                    opcode
                })
            }
    
            let result = ''
            //scripthash
            // result += this.scriptHash
            //params
            for(let v of params) {
                if(v.opcode) {
                    result += v.opcode
                }
                result += v.hexPLength
                result += v.hexP
            }
            result += paramsLength
            //end
            result += paramsEnd
            //function
            result += funcNameLength
            result += funcNameHex
            let totalParamsLength = num2VarInt(result.length / 2)
            //result = this.scriptHash + totalParamsLength + result
    
            console.log('invode serialze: '+ result)
    
            return result
        }  */
    serialize() {
        let result = '';
        // if(this.gasLimit) {
        //     result += this.gasLimit.serialize()
        // }
        // result += this.code.serialize();
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hex2VarBytes"])(this.code);
        return result;
    }
    /* deserialize(ss : StringReader) : void {
        //scriptHash, fixed langth
        this.scriptHash = ss.read(20)
        //payload total lenght
        const payloadLen = ss.readNextLen()
         //read params start
        let params = []
        let nextByte = ss.readNextLen()
        //params's length start from 0x50
        while(nextByte < 0x50) {
            let p = ss.read(nextByte)
            params.push(p)
            nextByte = ss.readNextLen()
        }
        //params end
        let end = ss.read(1)
        console.log('end :' + end)
        if(end === 'c1') {
            for(let i=0; i< params.length; i++) {
                //TODO can only get value
                this.parameters.push(new Parameter('','',params[i]))
            }
        }
        //function name
        let funNameLen = ss.readNextLen()
        let func = ss.read(funNameLen)
        func = hexstr2str(func)
        //payload end
        this.functionName = func
     }  */
    deserialize(sr) {
        // let gasLimit = Fixed64.deserialize(sr);
        // const code = VmCode.deserialize(sr);
        const code = sr.readNextBytes();
        // this.gasLimit = gasLimit;
        this.code = code;
        return this;
    }
}

/***/ }),

/***/ "./src/transaction/payload/payload.ts":
/*!********************************************!*\
  !*** ./src/transaction/payload/payload.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Payload; });
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */
class Payload {}

/***/ }),

/***/ "./src/transaction/program.ts":
/*!************************************!*\
  !*** ./src/transaction/program.ts ***!
  \************************************/
/*! exports provided: comparePublicKeys, pushOpCode, pushPubKey, pushBigInt, pushNum, pushBytes, programFromPubKey, programFromMultiPubKey, programFromParams, readOpcode, readNum, readBytes, readPubKey, getParamsFromProgram, ProgramInfo, getProgramInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comparePublicKeys", function() { return comparePublicKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushOpCode", function() { return pushOpCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushPubKey", function() { return pushPubKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushBigInt", function() { return pushBigInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushNum", function() { return pushNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushBytes", function() { return pushBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "programFromPubKey", function() { return programFromPubKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "programFromMultiPubKey", function() { return programFromMultiPubKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "programFromParams", function() { return programFromParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readOpcode", function() { return readOpcode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readNum", function() { return readNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readBytes", function() { return readBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readPubKey", function() { return readPubKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParamsFromProgram", function() { return getParamsFromProgram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramInfo", function() { return ProgramInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProgramInfo", function() { return getProgramInfo; });
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! elliptic */ "elliptic");
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(elliptic__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sm.js */ "sm.js");
/* harmony import */ var sm_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sm_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_bigInt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/bigInt */ "./src/common/bigInt.ts");
/* harmony import */ var _crypto_KeyType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../crypto/KeyType */ "./src/crypto/KeyType.ts");
/* harmony import */ var _crypto_PublicKey__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../crypto/PublicKey */ "./src/crypto/PublicKey.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../error */ "./src/error.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../utils */ "./src/utils.ts");
/* harmony import */ var _opcode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./opcode */ "./src/transaction/opcode.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */








// The sorting rules is as follows:
//    1. if keys have different types, then sorted by the KeyType value.
//    2. else,
//       2.1. ECDSA or SM2:
//           2.1.1. if on different curves, then sorted by the curve label.
//           2.1.2. else if x values are different, then sorted by x.
//           2.1.3. else sorted by y.
//       2.2. EdDSA: sorted by the byte sequence directly.
function comparePublicKeys(a, b) {
    if (a.algorithm !== b.algorithm) {
        return a.algorithm.hex - b.algorithm.hex;
    }
    switch (a.algorithm) {
        case _crypto_KeyType__WEBPACK_IMPORTED_MODULE_3__["KeyType"].ECDSA:
            const ec = new elliptic__WEBPACK_IMPORTED_MODULE_0__["ec"](a.parameters.curve.preset);
            const paKey = ec.keyFromPublic(a.key, 'hex', true);
            const pbKey = ec.keyFromPublic(b.key, 'hex', true);
            const pa = paKey.getPublic();
            const pb = pbKey.getPublic();
            if (pa.getX() !== pb.getX()) {
                return pa.getX() - pb.getX();
            } else {
                return pa.getY() - pb.getY();
            }
        case _crypto_KeyType__WEBPACK_IMPORTED_MODULE_3__["KeyType"].SM2:
            const pka = new sm_js__WEBPACK_IMPORTED_MODULE_1__["sm2"].SM2KeyPair();
            const pkb = new sm_js__WEBPACK_IMPORTED_MODULE_1__["sm2"].SM2KeyPair();
            pka._pubFromString(a.key);
            pkb._pubFromString(b.key);
            if (pka.getX().toString() !== pkb.getX().toString()) {
                return Number(pka.getX().toString()) - Number(pkb.getX().toString());
            } else {
                return Number(pka.getY().toString()) - Number(pkb.getY().toString());
            }
        case _crypto_KeyType__WEBPACK_IMPORTED_MODULE_3__["KeyType"].EDDSA:
            return Number(a.key) - Number(b.key);
        default:
            return 0;
    }
}
function pushOpCode(op) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(op);
}
function pushPubKey(pk) {
    const pkStr = pk.serializeHex();
    return pushBytes(pkStr);
}
function pushBigInt(num) {
    if (num === -1) {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHM1);
    }
    if (num === 0) {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSH0);
    }
    if (num > 0 && num <= 16) {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSH1 - 1 + num);
    }
    return Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(num, 8, true);
}
function pushNum(num) {
    if (num === 0) {
        return pushOpCode(_opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSH0);
    } else if (num <= 16) {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(num - 1 + _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSH1);
    }
    const bint = new _common_bigInt__WEBPACK_IMPORTED_MODULE_2__["default"](num.toString());
    return pushBytes(bint.toHexstr());
}
function pushBytes(hexstr) {
    let result = '';
    if (hexstr.length === 0) {
        throw new Error('pushBytes error, hexstr is empty.');
    }
    const len = hexstr.length / 2;
    if (len <= _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHBYTES75 + 1 - _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHBYTES1) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(len + _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHBYTES1 - 1);
    } else if (len < 0x100) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHDATA1);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(len);
    } else if (len < 0x10000) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHDATA2);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(len, 2, true);
    } else if (len < 0x100000000) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHDATA4);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_6__["num2hexstring"])(len, 4, true);
    } else {
        throw _error__WEBPACK_IMPORTED_MODULE_5__["ERROR_CODE"].INVALID_PARAMS;
    }
    result += hexstr;
    return result;
}
function programFromPubKey(pk) {
    let result = '';
    result += pushPubKey(pk);
    result += pushOpCode(_opcode__WEBPACK_IMPORTED_MODULE_7__["default"].CHECKSIG);
    return result;
}
function programFromMultiPubKey(pubkeys, m) {
    const n = pubkeys.length;
    if (!(1 <= m && m <= n && n <= 1024)) {
        throw new Error('Wrong multi-sig param');
    }
    // const pkStrList = pubkeys.map( (p) => p.serializeHex());
    // pkStrList.sort();
    pubkeys.sort(comparePublicKeys);
    let result = '';
    result += pushNum(m);
    for (const pk of pubkeys) {
        result += pushBytes(pk.serializeHex());
    }
    result += pushNum(n);
    result += pushOpCode(_opcode__WEBPACK_IMPORTED_MODULE_7__["default"].CHECKMULTISIG);
    return result;
}
function programFromParams(sigs) {
    let result = '';
    sigs.sort();
    for (const s of sigs) {
        result += pushBytes(s);
    }
    return result;
}
function readOpcode(sr) {
    return parseInt(sr.read(1), 16);
}
function readNum(sr) {
    let code;
    try {
        code = readOpcode(sr);
    } catch (err) {
        return 0;
    }
    let num = code - _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSH1 + 1;
    if (code === _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSH0) {
        readOpcode(sr);
        return 0;
    } else if (1 <= num && num <= 16) {
        readOpcode(sr);
        return num;
    }
    const bint = _common_bigInt__WEBPACK_IMPORTED_MODULE_2__["default"].fromHexstr(sr.readNextBytes());
    num = parseInt(bint.value.toString(), 10);
    return num;
}
function readBytes(sr) {
    const code = readOpcode(sr);
    let keylen;
    if (code === _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHDATA4) {
        keylen = sr.readUint32();
    } else if (code === _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHDATA2) {
        keylen = sr.readUint16();
    } else if (code === _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHDATA1) {
        keylen = sr.readUint8();
    } else if (code <= _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHBYTES75 && code >= _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHBYTES1) {
        keylen = code - _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSHBYTES1 + 1;
    } else {
        throw new Error('unexpected opcode: ' + code);
    }
    return sr.read(keylen);
}
function readPubKey(sr) {
    const pkStr = sr.readNextBytes();
    return _crypto_PublicKey__WEBPACK_IMPORTED_MODULE_4__["PublicKey"].deserializeHex(new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](pkStr));
}
function getParamsFromProgram(hexstr) {
    const sigs = [];
    const sr = new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](hexstr);
    while (!sr.isEmpty()) {
        sigs.push(readBytes(sr));
    }
    return sigs;
}
class ProgramInfo {}
function getProgramInfo(hexstr) {
    const info = new ProgramInfo();
    const end = parseInt(hexstr.substr(-2, 2), 16);
    if (end === _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].CHECKSIG) {
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](hexstr);
        const pk = readPubKey(sr);
        info.M = 1;
        info.pubKeys = [pk];
        return info;
    } else if (end === _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].CHECKMULTISIG) {
        const sr = new _utils__WEBPACK_IMPORTED_MODULE_6__["StringReader"](hexstr);
        const m = parseInt(sr.read(1), 16) - _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSH1 + 1;
        const n = parseInt(hexstr.substr(-4, 2), 16) - _opcode__WEBPACK_IMPORTED_MODULE_7__["default"].PUSH1 + 1;
        info.M = m;
        info.pubKeys = [];
        for (let i = 0; i < n; i++) {
            const key = readPubKey(sr);
            info.pubKeys.push(key);
        }
        // const n = readNum(sr);
        return info;
    } else {
        throw new Error('Unsupported program.');
    }
}

/***/ }),

/***/ "./src/transaction/scriptBuilder.ts":
/*!******************************************!*\
  !*** ./src/transaction/scriptBuilder.ts ***!
  \******************************************/
/*! exports provided: pushBool, pushInt, pushBigNum, pushHexString, getStructBytes, getMapBytes, pushMap, pushParam, serializeAbiFunction, convertArray, convertMap, deserializeItem, createCodeParamsScript, buildSmartContractParam, buildWasmContractParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushBool", function() { return pushBool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushInt", function() { return pushInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushBigNum", function() { return pushBigNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushHexString", function() { return pushHexString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStructBytes", function() { return getStructBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMapBytes", function() { return getMapBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushMap", function() { return pushMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushParam", function() { return pushParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeAbiFunction", function() { return serializeAbiFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertArray", function() { return convertArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertMap", function() { return convertMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeItem", function() { return deserializeItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCodeParamsScript", function() { return createCodeParamsScript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildSmartContractParam", function() { return buildSmartContractParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildWasmContractParam", function() { return buildWasmContractParam; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_bigInt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/bigInt */ "./src/common/bigInt.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../error */ "./src/error.ts");
/* harmony import */ var _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../smartcontract/abi/parameter */ "./src/smartcontract/abi/parameter.ts");
/* harmony import */ var _smartcontract_abi_struct__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../smartcontract/abi/struct */ "./src/smartcontract/abi/struct.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _opcode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./opcode */ "./src/transaction/opcode.ts");
/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/







const pushBool = param => {
    let result = '';
    if (param) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSHT);
    } else {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSHF);
    }
    return result;
};
const pushInt = param => {
    let result = '';
    if (param === -1) {
        result = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSHM1);
    } else if (param === 0) {
        result = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSH0);
    } else if (param > 0 && param < 16) {
        const num = _opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSH1 - 1 + param;
        result = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(num);
    } else {
        const biHex = new _common_bigInt__WEBPACK_IMPORTED_MODULE_1__["default"](param.toString()).toHexstr();
        result = pushHexString(biHex);
    }
    return result;
};
const pushBigNum = param => {
    let result = '';
    if (param.isEqualTo(-1)) {
        result = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSHM1);
    } else if (param.isEqualTo(0)) {
        result = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSH0);
    } else if (param.isGreaterThan(0) && param.isLessThan(16)) {
        const num = _opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSH1 - 1 + param.toNumber();
        result = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(num);
    } else {
        const biHex = new _common_bigInt__WEBPACK_IMPORTED_MODULE_1__["default"](param.toString()).toHexstr();
        result = pushHexString(biHex);
    }
    return result;
};
const pushHexString = param => {
    let result = '';
    const len = param.length / 2;
    if (len <= _opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSHBYTES75) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(len);
    } else if (len < 0x100) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSHDATA1);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(len);
    } else if (len < 0x10000) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSHDATA2);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(len, 2, true);
    } else {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSHDATA4);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(len, 4, true);
    }
    result += param;
    return result;
};
const getStructBytes = val => {
    let result = '';
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].Struct);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(val.list.length); // val is array-like
    for (const v of val.list) {
        if (typeof v === 'string') {
            // consider as hex string
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].ByteArray);
            result += pushHexString(v);
        } else if (typeof v === 'number') {
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].ByteArray);
            result += pushHexString(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2VarInt"])(v));
        } else {
            throw _error__WEBPACK_IMPORTED_MODULE_2__["ERROR_CODE"].INVALID_PARAMS;
        }
    }
    return result;
};
const getMapBytes = val => {
    let result = '';
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].Map);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(val.size);
    for (const k of val.keys()) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].ByteArray);
        result += pushHexString(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(k));
        const p = val.get(k);
        if (p && p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray) {
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].ByteArray);
            result += pushHexString(p.getValue());
        } else if (p && p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].String) {
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].ByteArray);
            result += pushHexString(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(p.getValue()));
        } else if (p && p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Integer) {
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].Integer);
            result += pushHexString(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2VarInt"])(p.getValue()));
        } else if (p && p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Long) {
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].Integer);
            result += pushHexString(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2VarInt"])(p.getValue()));
        } else {
            throw _error__WEBPACK_IMPORTED_MODULE_2__["ERROR_CODE"].INVALID_PARAMS;
        }
    }
    return result;
};
const pushMap = val => {
    let result = '';
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].NEWMAP);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].TOALTSTACK);
    for (const k of val.keys()) {
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].DUPFROMALTSTACK);
        result += pushHexString(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(k));
        result += pushParam(val.get(k));
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].SETITEM);
    }
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].FROMALTSTACK);
    return result;
};
const pushParam = p => {
    if (!p) {
        throw Error('Parameter can not be undefined');
    }
    let result = '';
    if (p.type === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray) {
        result += pushHexString(p.value);
    } else if (p.type === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].String) {
        result += pushHexString(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(p.value));
    } else if (p.type === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Boolean) {
        result += pushBool(Boolean(p.value));
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSH0);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].BOOLOR);
    } else if (p instanceof Map) {
        result += pushMap(p);
    } else if (p.type === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Array) {
        for (let i = p.value.length - 1; i > -1; i--) {
            result += pushParam(p.value[i]);
        }
        result += pushInt(p.value.length);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PACK);
    } else if (p.type === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Integer) {
        result += pushInt(p.value);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSH0);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].ADD);
    } else if (p.type === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Long) {
        result += pushBigNum(new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](p.value));
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PUSH0);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].ADD);
    } else {
        throw Error('Invalid parameter type: ' + p.type);
    }
    return result;
};
const serializeAbiFunction = abiFunction => {
    const list = [];
    list.push(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(abiFunction.name));
    const tmp = [];
    for (const p of abiFunction.parameters) {
        if (p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].String) {
            tmp.push(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(p.getValue()));
        } else if (p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Long) {
            tmp.push(new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](p.getValue()));
        } else if (p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Map) {
            tmp.push(convertMap(p));
        } else {
            tmp.push(p.getValue());
        }
    }
    if (list.length > 0) {
        list.push(tmp);
    }
    const result = createCodeParamsScript(list);
    return result;
};
function convertArray(list) {
    const tmp = [];
    for (const p of list) {
        if (p.getType && p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].String) {
            tmp.push(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(p.getValue()));
        } else if (p.getType && p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Long) {
            tmp.push(new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](p.getValue()));
        } else if (p.getType && p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Array) {
            tmp.push(convertArray(p.value));
        } else if (p.getType && p.getType() === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Map) {
            tmp.push(convertMap(p));
        } else {
            tmp.push(p.getValue ? p.getValue() : p);
        }
    }
    return tmp;
}
function convertMap(p) {
    const map = new Map();
    for (const k of Object.keys(p.value)) {
        const pVal = p.value[k];
        // map.set(k, pVal);
        if (pVal.type && pVal.type === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Map) {
            map.set(k, convertMap(pVal));
        } else {
            map.set(k, pVal);
        }
    }
    return map;
}
/**
 * To deserialize the value return from smart contract invoke.
 * @param hexstr
 */
function deserializeItem(sr) {
    const t = parseInt(sr.read(1), 16);
    if (t === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].ByteArray) {
        return sr.readNextBytes();
    } else if (t === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].Boolean) {
        return sr.readBoolean();
    } else if (t === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].Integer) {
        const v = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["bigIntFromBytes"])(sr.readNextBytes()).toNumber();
        return v;
    } else if (t === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].Array || t === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].Struct) {
        const length = sr.readNextLen();
        const list = [];
        for (let i = length; i > 0; i--) {
            const ele = deserializeItem(sr);
            list.push(ele);
        }
        return list;
    } else if (t === _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterTypeVal"].Map) {
        const length = sr.readNextLen();
        const map = new Map();
        for (let i = length; i > 0; i--) {
            const key = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["hexstr2str"])(deserializeItem(sr));
            const value = deserializeItem(sr);
            map.set(key, value);
        }
        return map;
    } else {
        throw Error('Invalid parameter type: ' + t);
    }
}
const createCodeParamsScript = list => {
    let result = '';
    for (let i = list.length - 1; i >= 0; i--) {
        const val = list[i];
        if (typeof val === 'string') {
            result += pushHexString(val);
        } else if (typeof val === 'number') {
            result += pushInt(val);
        } else if (typeof val === 'boolean') {
            result += pushBool(val);
        } else if (val instanceof bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"]) {
            result += pushBigNum(val);
        } else if (val instanceof Map) {
            result += pushMap(val);
            // const mapBytes = getMapBytes(val);
            // result += pushHexString(mapBytes);
        } else if (val instanceof _smartcontract_abi_struct__WEBPACK_IMPORTED_MODULE_4__["default"]) {
            const structBytes = getStructBytes(val);
            result += pushHexString(structBytes);
        } else if (val instanceof Array) {
            result += createCodeParamsScript(convertArray(val));
            result += pushInt(val.length);
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PACK);
        }
    }
    return result;
};
// deprecated
const buildSmartContractParam = (functionName, params) => {
    let result = '';
    for (let i = params.length - 1; i > -1; i--) {
        const type = params[i].getType();
        switch (type) {
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Boolean:
                result += pushBool(params[i].getValue());
                break;
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Integer:
                result += pushInt(params[i].getValue());
                break;
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].String:
                const value = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(params[i].getValue());
                result += pushHexString(value);
                break;
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].ByteArray:
                result += pushHexString(params[i].getValue());
                break;
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Map:
                const mapBytes = getMapBytes(params[i].getValue());
                result += pushHexString(mapBytes);
                break;
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Struct:
                const structBytes = getStructBytes(params[i].getValue());
                result += pushHexString(structBytes);
                break;
            // case ParameterType.Array:
            //     result += buildSmartContractParam(params[i].getValue());
            //     result += pushInt(params[i].getValue().length);
            //     result += num2hexstring(opcode.PACK);
            //     break;
            default:
                throw new Error('Unsupported param type: ' + JSON.stringify(params[i]));
        }
    }
    result += pushInt(params.length);
    result += Object(_utils__WEBPACK_IMPORTED_MODULE_5__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_6__["default"].PACK);
    result += pushHexString(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(functionName));
    return result;
};
const buildWasmContractParam = params => {
    const pList = [];
    for (const p of params) {
        const type = p.getType();
        let o;
        switch (type) {
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].String:
                o = {
                    type: 'string',
                    value: p.getValue()
                };
                break;
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Int:
                o = {
                    type: 'int',
                    value: p.getValue().toString()
                };
                break;
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].Long:
                o = {
                    type: 'int64',
                    value: p.getValue()
                };
                break;
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].IntArray:
                o = {
                    type: 'int_array',
                    value: p.getValue()
                };
                break;
            case _smartcontract_abi_parameter__WEBPACK_IMPORTED_MODULE_3__["ParameterType"].LongArray:
                o = {
                    type: 'int_array',
                    value: p.getValue()
                };
                break;
            default:
                break;
        }
        pList.push(o);
    }
    const result = {
        Params: pList
    };
    return Object(_utils__WEBPACK_IMPORTED_MODULE_5__["str2hexstr"])(JSON.stringify(result));
};

/***/ }),

/***/ "./src/transaction/transaction.ts":
/*!****************************************!*\
  !*** ./src/transaction/transaction.ts ***!
  \****************************************/
/*! exports provided: TxType, TxName, Fee, Transaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TxType", function() { return TxType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TxName", function() { return TxName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fee", function() { return Fee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transaction", function() { return Transaction; });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto-js */ "crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_fixed64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/fixed64 */ "./src/common/fixed64.ts");
/* harmony import */ var _crypto_address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../crypto/address */ "./src/crypto/address.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _payload_deployCode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./payload/deployCode */ "./src/transaction/payload/deployCode.ts");
/* harmony import */ var _payload_invokeCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./payload/invokeCode */ "./src/transaction/payload/invokeCode.ts");
/* harmony import */ var _txAttribute__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./txAttribute */ "./src/transaction/txAttribute.ts");
/* harmony import */ var _txSignature__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./txSignature */ "./src/transaction/txSignature.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */








var TxType;
(function (TxType) {
    TxType[TxType["BookKeeper"] = 2] = "BookKeeper";
    TxType[TxType["Claim"] = 3] = "Claim";
    TxType[TxType["Deploy"] = 208] = "Deploy";
    TxType[TxType["Invoke"] = 209] = "Invoke";
    TxType[TxType["Enrollment"] = 4] = "Enrollment";
    TxType[TxType["Vote"] = 5] = "Vote";
})(TxType || (TxType = {}));
const TxName = {
    BookKeeper: 'BookKeeper',
    Claim: 'Claim',
    Deploy: 'Deploy',
    Invoke: 'Invoke',
    Enrollment: 'Enrollment',
    Vote: 'Vote'
};
/**
 * @deprecated. Transaction fee.
 */
class Fee {
    static deserialize(sr) {
        const fee = new Fee();
        const amount = _common_fixed64__WEBPACK_IMPORTED_MODULE_1__["default"].deserialize(sr);
        const payer = sr.read(20);
        fee.amount = amount;
        fee.payer = new _crypto_address__WEBPACK_IMPORTED_MODULE_2__["Address"](payer);
        return fee;
    }
    serialize() {
        let result = '';
        result += this.amount.serialize();
        result += this.payer.serialize();
        return result;
    }
}
class Transaction {
    constructor() {
        /**
         * Transaction type
         */
        this.type = 0xd1;
        /**
         * Version of transaction
         */
        this.version = 0x00;
        /**
         * @deprecated
         */
        this.txAttributes = [];
        /**
         * Array of signatures
         */
        this.sigs = [];
        this.nonce = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["ab2hexstring"])(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["generateRandomArray"])(4));
        this.gasPrice = new _common_fixed64__WEBPACK_IMPORTED_MODULE_1__["default"]();
        // const limit = num2hexstring(DEFAULT_GAS_LIMIT, 8, true);
        this.gasLimit = new _common_fixed64__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.payer = new _crypto_address__WEBPACK_IMPORTED_MODULE_2__["Address"]('0000000000000000000000000000000000000000');
    }
    static deserialize(hexstring) {
        const tx = new Transaction();
        // console.log(' hexstring' + hexstring)
        const ss = new _utils__WEBPACK_IMPORTED_MODULE_3__["StringReader"](hexstring);
        tx.version = parseInt(ss.read(1), 16);
        tx.type = parseInt(ss.read(1), 16);
        tx.nonce = ss.read(4);
        tx.gasPrice = _common_fixed64__WEBPACK_IMPORTED_MODULE_1__["default"].deserialize(ss);
        tx.gasLimit = _common_fixed64__WEBPACK_IMPORTED_MODULE_1__["default"].deserialize(ss);
        tx.payer = new _crypto_address__WEBPACK_IMPORTED_MODULE_2__["Address"](ss.read(20));
        let payload;
        switch (tx.type) {
            case TxType.Invoke:
                payload = new _payload_invokeCode__WEBPACK_IMPORTED_MODULE_5__["default"]();
                break;
            case TxType.Deploy:
                payload = new _payload_deployCode__WEBPACK_IMPORTED_MODULE_4__["default"]();
                break;
            default:
                payload = new _payload_invokeCode__WEBPACK_IMPORTED_MODULE_5__["default"]();
        }
        payload.deserialize(ss);
        tx.payload = payload;
        tx.txAttributes = [];
        tx.sigs = [];
        const attributeLength = ss.readNextLen();
        for (let i = 0; i < attributeLength; i++) {
            const txAttribute = new _txAttribute__WEBPACK_IMPORTED_MODULE_6__["TransactionAttribute"]();
            txAttribute.deserialize(ss);
            tx.txAttributes.push(txAttribute);
        }
        const sigLength = ss.readNextLen();
        for (let i = 0; i < sigLength; i++) {
            tx.sigs.push(_txSignature__WEBPACK_IMPORTED_MODULE_7__["TxSignature"].deserialize(ss));
        }
        return tx;
    }
    /**
     * Serialize transaction to hex string
     * The result is used to send to blockchain.
     */
    serialize() {
        const unsigned = this.serializeUnsignedData();
        const signed = this.serializeSignedData();
        return unsigned + signed;
    }
    /**
     * Serialize transaction data exclueds signatures
     */
    serializeUnsignedData() {
        let result = '';
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(this.version);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(this.type);
        // nonce 4bytes
        result += this.nonce;
        result += this.gasPrice.serialize();
        result += this.gasLimit.serialize();
        result += this.payer.serialize();
        result += this.payload.serialize();
        // serialize transaction attributes
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(this.txAttributes.length);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.txAttributes.length; i++) {
            result += this.txAttributes[i].serialize();
        }
        // result += num2hexstring(this.fee.length)
        // for (let i=0 ; i< this.fee.length; i++) {
        //     result += this.fee[i].amount.serialize()
        //     result += this.fee[i].payer.serialize()
        // }
        // if(this.networkFee) {
        //     result += this.networkFee.serialize()
        // }
        return result;
    }
    /**
     * Serialize signatures
     */
    serializeSignedData() {
        let result = '';
        // programs
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_3__["num2hexstring"])(this.sigs.length);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.sigs.length; i++) {
            result += this.sigs[i].serialize();
        }
        return result;
    }
    /**
     * Get the signable content
     */
    getSignContent() {
        const data = this.serializeUnsignedData();
        const ProgramHexString = crypto_js__WEBPACK_IMPORTED_MODULE_0__["enc"].Hex.parse(data);
        const ProgramSha256 = crypto_js__WEBPACK_IMPORTED_MODULE_0__["SHA256"](ProgramHexString).toString();
        const ProgramSha2562 = crypto_js__WEBPACK_IMPORTED_MODULE_0__["SHA256"](crypto_js__WEBPACK_IMPORTED_MODULE_0__["enc"].Hex.parse(ProgramSha256)).toString();
        return ProgramSha2562;
    }
    /**
     * Get the hash of transaction
     * @deprecated Use getSignContent instead
     */
    getHash() {
        return this.getSignContent();
    }
}

/***/ }),

/***/ "./src/transaction/transactionBuilder.ts":
/*!***********************************************!*\
  !*** ./src/transaction/transactionBuilder.ts ***!
  \***********************************************/
/*! exports provided: Default_params, signTransaction, signTransactionAsync, addSign, signTx, makeNativeContractTx, makeInvokeTransaction, makeDeployCodeTransaction, buildTxParam, buildRpcParam, buildRestfulParam, sendRawTxRestfulUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Default_params", function() { return Default_params; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signTransaction", function() { return signTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signTransactionAsync", function() { return signTransactionAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSign", function() { return addSign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signTx", function() { return signTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeNativeContractTx", function() { return makeNativeContractTx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeInvokeTransaction", function() { return makeInvokeTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeDeployCodeTransaction", function() { return makeDeployCodeTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildTxParam", function() { return buildTxParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRpcParam", function() { return buildRpcParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRestfulParam", function() { return buildRestfulParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendRawTxRestfulUrl", function() { return sendRawTxRestfulUrl; });
/* harmony import */ var _common_fixed64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/fixed64 */ "./src/common/fixed64.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consts */ "./src/consts.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../error */ "./src/error.ts");
/* harmony import */ var _smartcontract_abi_abiFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../smartcontract/abi/abiFunction */ "./src/smartcontract/abi/abiFunction.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _opcode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./opcode */ "./src/transaction/opcode.ts");
/* harmony import */ var _payload_deployCode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./payload/deployCode */ "./src/transaction/payload/deployCode.ts");
/* harmony import */ var _payload_invokeCode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./payload/invokeCode */ "./src/transaction/payload/invokeCode.ts");
/* harmony import */ var _program__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./program */ "./src/transaction/program.ts");
/* harmony import */ var _scriptBuilder__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scriptBuilder */ "./src/transaction/scriptBuilder.ts");
/* harmony import */ var _transaction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./transaction */ "./src/transaction/transaction.ts");
/* harmony import */ var _transfer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./transfer */ "./src/transaction/transfer.ts");
/* harmony import */ var _txSignature__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./txSignature */ "./src/transaction/txSignature.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */













// const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
// tslint:disable-next-line:variable-name
const Default_params = {
    Action: 'sendrawtransaction',
    Version: '1.0.0',
    Type: '',
    Op: 'test'
};
/**
 * Signs the transaction object.
 *
 * If there is already a signature, the new one will replace existing.
 * If the signature schema is not provided, default schema for Private key type is used.
 *
 * @param tx Transaction to sign
 * @param privateKey Private key to sign with
 * @param schema Signature Schema to use
 */
const signTransaction = (tx, privateKey, schema) => {
    const signature = _txSignature__WEBPACK_IMPORTED_MODULE_12__["TxSignature"].create(tx, privateKey, schema);
    tx.sigs = [signature];
};
/**
 * Signs the transaction object asynchroniously.
 *
 * If there is already a signature, the new one will replace existing.
 * If the signature schema is not provided, default schema for Private key type is used.
 *
 * @param tx Transaction to sign
 * @param privateKey Private key to sign with
 * @param schema Signature Schema to use
 */
const signTransactionAsync = async (tx, privateKey, schema) => {
    const signature = await _txSignature__WEBPACK_IMPORTED_MODULE_12__["TxSignature"].createAsync(tx, privateKey, schema);
    tx.sigs = [signature];
};
/**
 * Signs the transaction object.
 *
 * If there is already a signature, the new one will be added to the end.
 * If the signature schema is not provided, default schema for Private key type is used.
 *
 * @param tx Transaction to sign
 * @param privateKey Private key to sign with
 * @param schema Signature Schema to use
 */
const addSign = (tx, privateKey, schema) => {
    const signature = _txSignature__WEBPACK_IMPORTED_MODULE_12__["TxSignature"].create(tx, privateKey, schema);
    tx.sigs.push(signature);
};
const equalPks = (pks1, pks2) => {
    if (pks1 === pks2) {
        return true;
    }
    pks1.sort(_program__WEBPACK_IMPORTED_MODULE_8__["comparePublicKeys"]);
    pks2.sort(_program__WEBPACK_IMPORTED_MODULE_8__["comparePublicKeys"]);
    if (pks1.length !== pks2.length) {
        return false;
    }
    for (let i = 0; i < pks1.length; i++) {
        if (pks1[i].key !== pks2[i].key) {
            return false;
        }
    }
    return true;
};
/**
 * Signs the transaction with multiple signatures with multi-sign keys.
 *
 * If there is already a signature, the new ones will be added to the end.
 * If the signature schema is not provided, default schema for Private key type is used.
 *
 * @param tx Transaction to sign
 * @param M m of the (m ,n) multi sign address threshold
 * @param pubKeys Array of Public keys of (m,n) multi sign address, the number is n
 * @param privateKey Private key to sign the tx.
 * @param scheme Signature scheme to use
 */
const signTx = (tx, M, pubKeys, privateKey, scheme) => {
    if (tx.sigs.length === 0) {
        tx.sigs = [];
    } else {
        if (tx.sigs.length > _consts__WEBPACK_IMPORTED_MODULE_1__["TX_MAX_SIG_SIZE"] || M > pubKeys.length || M <= 0 || pubKeys.length === 0) {
            throw _error__WEBPACK_IMPORTED_MODULE_2__["ERROR_CODE"].INVALID_PARAMS;
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tx.sigs.length; i++) {
            if (equalPks(tx.sigs[i].pubKeys, pubKeys)) {
                if (tx.sigs[i].sigData.length + 1 > pubKeys.length) {
                    throw new Error('Too many sigData');
                }
                const signData = privateKey.sign(tx, scheme).serializeHex();
                tx.sigs[i].sigData.push(signData);
                return;
            }
        }
    }
    const sig = new _txSignature__WEBPACK_IMPORTED_MODULE_12__["TxSignature"]();
    sig.M = M;
    sig.pubKeys = pubKeys;
    sig.sigData = [privateKey.sign(tx, scheme).serializeHex()];
    tx.sigs.push(sig);
};
/**
 * Creates transaction to invoke native contract
 * @param funcName Function name of contract to call
 * @param params Parameters serialized in hex string
 * @param contractAddr Adderss of contract
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Address to pay for transaction gas
 */
function makeNativeContractTx(funcName, params, contractAddr, gasPrice, gasLimit, payer) {
    let code = '';
    code += params;
    code += Object(_scriptBuilder__WEBPACK_IMPORTED_MODULE_9__["pushHexString"])(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["str2hexstr"])(funcName));
    code += Object(_scriptBuilder__WEBPACK_IMPORTED_MODULE_9__["pushHexString"])(contractAddr.serialize());
    code += Object(_scriptBuilder__WEBPACK_IMPORTED_MODULE_9__["pushInt"])(0);
    code += Object(_utils__WEBPACK_IMPORTED_MODULE_4__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_5__["default"].SYSCALL);
    code += Object(_scriptBuilder__WEBPACK_IMPORTED_MODULE_9__["pushHexString"])(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["str2hexstr"])(_consts__WEBPACK_IMPORTED_MODULE_1__["NATIVE_INVOKE_NAME"]));
    const payload = new _payload_invokeCode__WEBPACK_IMPORTED_MODULE_7__["default"]();
    payload.code = code;
    let tx;
    if (funcName === 'transfer' || funcName === 'transferFrom') {
        tx = new _transfer__WEBPACK_IMPORTED_MODULE_11__["Transfer"]();
    } else {
        tx = new _transaction__WEBPACK_IMPORTED_MODULE_10__["Transaction"]();
    }
    tx.type = _transaction__WEBPACK_IMPORTED_MODULE_10__["TxType"].Invoke;
    tx.payload = payload;
    if (gasLimit) {
        tx.gasLimit = new _common_fixed64__WEBPACK_IMPORTED_MODULE_0__["default"](gasLimit);
    }
    if (gasPrice) {
        tx.gasPrice = new _common_fixed64__WEBPACK_IMPORTED_MODULE_0__["default"](gasPrice);
    }
    if (payer) {
        tx.payer = payer;
    }
    return tx;
}
/**
 * Creates transaction to inovke smart contract
 * @param funcName Function name of smart contract
 * @param params Array of Parameters or serialized parameters
 * @param contractAddr Address of contract
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Address to pay for gas
 */
const makeInvokeTransaction = (funcName, params, contractAddr, gasPrice, gasLimit, payer) => {
    const tx = new _transaction__WEBPACK_IMPORTED_MODULE_10__["Transaction"]();
    tx.type = _transaction__WEBPACK_IMPORTED_MODULE_10__["TxType"].Invoke;
    let args = '';
    if (typeof params === 'string') {
        args = params;
    } else {
        const abiFunc = new _smartcontract_abi_abiFunction__WEBPACK_IMPORTED_MODULE_3__["default"](funcName, '', params);
        args = Object(_scriptBuilder__WEBPACK_IMPORTED_MODULE_9__["serializeAbiFunction"])(abiFunc);
    }
    let code = args + Object(_utils__WEBPACK_IMPORTED_MODULE_4__["num2hexstring"])(_opcode__WEBPACK_IMPORTED_MODULE_5__["default"].APPCALL);
    code += contractAddr.serialize();
    const payload = new _payload_invokeCode__WEBPACK_IMPORTED_MODULE_7__["default"]();
    payload.code = code;
    tx.payload = payload;
    if (gasLimit) {
        tx.gasLimit = new _common_fixed64__WEBPACK_IMPORTED_MODULE_0__["default"](gasLimit);
    }
    if (gasPrice) {
        tx.gasPrice = new _common_fixed64__WEBPACK_IMPORTED_MODULE_0__["default"](gasPrice);
    }
    if (payer) {
        tx.payer = payer;
    }
    return tx;
};
/**
 * Creates transaction to deploy smart contract
 * @param code Avm code of contract to deploy
 * @param name Name of contract
 * @param codeVersion version of contract
 * @param author Author of contract
 * @param email Email of author
 * @param desp Description of contract
 * @param needStorage Decides if the contract needs storage
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Address to pay for gas
 */
function makeDeployCodeTransaction(code, name = '', codeVersion = '1.0', author = '', email = '', desp = '', needStorage = true, gasPrice, gasLimit, payer) {
    const dc = new _payload_deployCode__WEBPACK_IMPORTED_MODULE_6__["default"]();
    dc.author = author;
    // const vmCode = new VmCode();
    // vmCode.code = code;
    // vmCode.vmType = vmType;
    // dc.code = vmCode;
    dc.code = code;
    dc.version = codeVersion;
    dc.description = desp;
    dc.email = email;
    dc.name = name;
    dc.needStorage = needStorage;
    const tx = new _transaction__WEBPACK_IMPORTED_MODULE_10__["Transaction"]();
    tx.version = 0x00;
    tx.payload = dc;
    tx.type = _transaction__WEBPACK_IMPORTED_MODULE_10__["TxType"].Deploy;
    // gas
    // if (DEFAULT_GAS_LIMIT === Number(0)) {
    //     tx.gasPrice = new Fixed64();
    // } else {
    //     const price = new BigNumber(gas).multipliedBy(1e9).dividedBy(new BigNumber(DEFAULT_GAS_LIMIT)).toString();
    //     tx.gasPrice = new Fixed64(price);
    // }
    tx.gasLimit = new _common_fixed64__WEBPACK_IMPORTED_MODULE_0__["default"](gasLimit);
    tx.gasPrice = new _common_fixed64__WEBPACK_IMPORTED_MODULE_0__["default"](gasPrice);
    if (payer) {
        tx.payer = payer;
    }
    return tx;
}
/**
 * @deprecated
 * Creates params from transaction to send with websocket
 * @param tx Transactio to send
 * @param isPreExec Decides if it is pre-execute transaction
 */
function buildTxParam(tx, isPreExec = false) {
    const op = isPreExec ? { PreExec: '1' } : {};
    const serialized = tx.serialize();
    return JSON.stringify(Object.assign({}, Default_params, { Data: serialized }, op));
}
/**
 * @deprecated
 * Creates params from transaction to send with rpc
 * @param tx Transaction
 * @param method Method name
 */
function buildRpcParam(tx, method) {
    const param = tx.serialize();
    const result = {
        jsonrpc: '2.0',
        method: method || 'sendrawtransaction',
        params: [param],
        id: 10
    };
    return result;
}
/**
 * @deprecated
 * Creates params from transaction to send with restful
 * @param tx Transaction
 */
function buildRestfulParam(tx) {
    const param = tx.serialize();
    return {
        Action: 'sendrawtransaction',
        Version: '1.0.0',
        Data: param
    };
}
/**
 * @deprecated
 * @param url Url of blochchain node
 * @param preExec Decides if is a pre-execute request
 */
function sendRawTxRestfulUrl(url, preExec = false) {
    if (url.charAt(url.length - 1) === '/') {
        url = url.substring(0, url.length - 1);
    }
    let restUrl = url + _consts__WEBPACK_IMPORTED_MODULE_1__["REST_API"].sendRawTx;
    if (preExec) {
        restUrl += '?preExec=1';
    }
    return restUrl;
}

/***/ }),

/***/ "./src/transaction/transfer.ts":
/*!*************************************!*\
  !*** ./src/transaction/transfer.ts ***!
  \*************************************/
/*! exports provided: Transfer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transfer", function() { return Transfer; });
/* harmony import */ var _transaction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transaction */ "./src/transaction/transaction.ts");

class Transfer extends _transaction__WEBPACK_IMPORTED_MODULE_0__["Transaction"] {}

/***/ }),

/***/ "./src/transaction/txAttribute.ts":
/*!****************************************!*\
  !*** ./src/transaction/txAttribute.ts ***!
  \****************************************/
/*! exports provided: TransactionAttributeUsage, TransactionAttribute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionAttributeUsage", function() { return TransactionAttributeUsage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionAttribute", function() { return TransactionAttribute; });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error */ "./src/error.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */


var TransactionAttributeUsage;
(function (TransactionAttributeUsage) {
    TransactionAttributeUsage[TransactionAttributeUsage["Nonce"] = 0] = "Nonce";
    TransactionAttributeUsage[TransactionAttributeUsage["Script"] = 32] = "Script";
    TransactionAttributeUsage[TransactionAttributeUsage["DescriptionUrl"] = 129] = "DescriptionUrl";
    TransactionAttributeUsage[TransactionAttributeUsage["Description"] = 144] = "Description";
})(TransactionAttributeUsage || (TransactionAttributeUsage = {}));
/**
 * @deprecated
 * TransactionAttribute
 * @property {number} usage - Identifying byte
 * @property {string} data - Data
 */
class TransactionAttribute {
    serialize() {
        let result = '';
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["num2hexstring"])(this.usage);
        if (this.usage === TransactionAttributeUsage.Script) {
            result += this.data;
        } else if (this.usage === TransactionAttributeUsage.DescriptionUrl || this.usage === TransactionAttributeUsage.Description || this.usage === TransactionAttributeUsage.Nonce) {
            result += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["hex2VarBytes"])(this.data);
        } else {
            throw _error__WEBPACK_IMPORTED_MODULE_0__["ERROR_CODE"].INVALID_PARAMS;
        }
        return result;
    }
    deserialize(ss) {
        // usage
        const usage = parseInt(ss.read(1), 16);
        // nonce
        // const nonce = ss.read(8);
        // get hash with publicKey;
        const dataLen = ss.readNextLen();
        const data = ss.read(dataLen);
        this.usage = usage;
        // this.nonce = nonce;
        this.data = data;
    }
}

/***/ }),

/***/ "./src/transaction/txSignature.ts":
/*!****************************************!*\
  !*** ./src/transaction/txSignature.ts ***!
  \****************************************/
/*! exports provided: TxSignature */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TxSignature", function() { return TxSignature; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _program__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./program */ "./src/transaction/program.ts");


/**
 * Signature generated by signing transaction hash with Private Keys.
 */
class TxSignature {
    /**
     * Deserializes hex representation to Transaction Signature
     *
     * @param sr Hex string reader
     */
    static deserialize(sr) {
        const sig = new TxSignature();
        // sig.pubKeys = [];
        // const pubKeyLength = sr.readNextLen();
        // for (let i = 0; i < pubKeyLength; i++) {
        //     const serializedLength = sr.readNextLen();
        //     const pk = PublicKey.deserializeHex(sr, serializedLength);
        //     sig.pubKeys.push(pk);
        // }
        // sig.M = sr.readNextLen();
        // sig.sigData = [];
        // const dataLength = sr.readNextLen();
        // for (let i = 0; i < dataLength; i++) {
        //     const data = sr.readNextBytes();
        //     sig.sigData.push(data);
        // }
        const invocationScript = sr.readNextBytes();
        const verificationScript = sr.readNextBytes();
        const sigData = Object(_program__WEBPACK_IMPORTED_MODULE_1__["getParamsFromProgram"])(invocationScript);
        const info = Object(_program__WEBPACK_IMPORTED_MODULE_1__["getProgramInfo"])(verificationScript);
        sig.M = info.M;
        sig.pubKeys = info.pubKeys;
        sig.sigData = sigData;
        return sig;
    }
    /**
     * Creates Transaction signature of hash with supplied private key and scheme.
     *
     * If the signature schemas is not provided, the default schemes for the key types are used.
     *
     * @param hash hash of the transaction or signable transaction
     * @param privateKey Private key to use
     * @param scheme Signature scheme to use
     */
    static create(hash, privateKey, scheme) {
        const signature = new TxSignature();
        signature.M = 1;
        signature.pubKeys = [privateKey.getPublicKey()];
        signature.sigData = [privateKey.sign(hash, scheme).serializeHex()];
        return signature;
    }
    /**
     * Creates Transaction signature of hash with supplied private key and scheme asynchroniously.
     *
     * If the signature schemas is not provided, the default schemes for the key types are used.
     *
     * @param hash hash of the transaction or signable transaction
     * @param privateKey Private key to use
     * @param scheme Signature scheme to use
     */
    static async createAsync(hash, privateKey, scheme) {
        const signature = new TxSignature();
        signature.M = 1;
        signature.pubKeys = [privateKey.getPublicKey()];
        signature.sigData = [(await privateKey.signAsync(hash, scheme)).serializeHex()];
        return signature;
    }
    /**
     * Serializes signature to Hex representation.
     *
     */
    serialize() {
        let result = '';
        // result += num2hexstring(this.pubKeys.length);
        // // tslint:disable-next-line:prefer-for-of
        // for (let i = 0; i < this.pubKeys.length; i++) {
        //     const serialized = this.pubKeys[i].serializeHex();
        //     result += num2hexstring(serialized.length / 2);
        //     result += serialized;
        // }
        // result += num2hexstring(this.M);
        // result += num2hexstring(this.sigData.length);
        // // tslint:disable-next-line:prefer-for-of
        // for (let i = 0; i < this.sigData.length; i++) {
        //     result += hex2VarBytes(this.sigData[i]);
        // }
        const invocationScript = Object(_program__WEBPACK_IMPORTED_MODULE_1__["programFromParams"])(this.sigData);
        let verificationScript = '';
        if (this.pubKeys.length === 0) {
            throw new Error('No pubkeys in sig');
        } else if (this.pubKeys.length === 1) {
            verificationScript = Object(_program__WEBPACK_IMPORTED_MODULE_1__["programFromPubKey"])(this.pubKeys[0]);
        } else {
            verificationScript = Object(_program__WEBPACK_IMPORTED_MODULE_1__["programFromMultiPubKey"])(this.pubKeys, this.M);
        }
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hex2VarBytes"])(invocationScript);
        result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hex2VarBytes"])(verificationScript);
        return result;
    }
}

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: hexstring2ab, ab2hexstring, ab2str, str2ab, str2hexstr, hexstr2str, hex2VarBytes, str2VarBytes, bool2VarByte, hexXor, num2hexstring, num2VarInt, reverseHex, bigIntFromBytes, bigIntToBytes, StringReader, EventEmitter, sendBackResult2Native, axiosPost, now, sha256, ripemd160, hash160, generateRandomArray, randomBytes, generateMnemonic, parseMnemonic, varifyPositiveInt, isBase64, isHexString, unboundDeadline, calcUnboundOng */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexstring2ab", function() { return hexstring2ab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ab2hexstring", function() { return ab2hexstring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ab2str", function() { return ab2str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str2ab", function() { return str2ab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str2hexstr", function() { return str2hexstr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexstr2str", function() { return hexstr2str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex2VarBytes", function() { return hex2VarBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str2VarBytes", function() { return str2VarBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bool2VarByte", function() { return bool2VarByte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexXor", function() { return hexXor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "num2hexstring", function() { return num2hexstring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "num2VarInt", function() { return num2VarInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseHex", function() { return reverseHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bigIntFromBytes", function() { return bigIntFromBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bigIntToBytes", function() { return bigIntToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringReader", function() { return StringReader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return EventEmitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendBackResult2Native", function() { return sendBackResult2Native; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axiosPost", function() { return axiosPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return sha256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ripemd160", function() { return ripemd160; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash160", function() { return hash160; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRandomArray", function() { return generateRandomArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomBytes", function() { return randomBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateMnemonic", function() { return generateMnemonic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseMnemonic", function() { return parseMnemonic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "varifyPositiveInt", function() { return varifyPositiveInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBase64", function() { return isBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHexString", function() { return isHexString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unboundDeadline", function() { return unboundDeadline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcUnboundOng", function() { return calcUnboundOng; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bip39 */ "bip39");
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bip39__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto-js */ "crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var long__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! long */ "long");
/* harmony import */ var long__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(long__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var secure_random__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! secure-random */ "secure-random");
/* harmony import */ var secure_random__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(secure_random__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./error */ "./src/error.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */







/**
 * Turn hex string into array buffer
 * @param str hex string
 */
function hexstring2ab(str) {
    const result = [];
    while (str.length >= 2) {
        result.push(parseInt(str.substring(0, 2), 16));
        str = str.substring(2, str.length);
    }
    return result;
}
/**
 * Turn array buffer into hex string
 * @param arr Array like value
 */
function ab2hexstring(arr) {
    let result = '';
    const uint8Arr = new Uint8Array(arr);
    for (let i = 0; i < uint8Arr.byteLength; i++) {
        let str = uint8Arr[i].toString(16);
        str = str.length === 0 ? '00' : str.length === 1 ? '0' + str : str;
        result += str;
    }
    return result;
}
/**
 * Turn ArrayBuffer or array-like oject into normal string
 * @param buf
 */
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}
/**
 * Turn normal string into ArrayBuffer
 * @param str Normal string
 */
function str2ab(str) {
    const buf = new ArrayBuffer(str.length); // 每个字符占用1个字节
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
/**
 * Turn normal string into hex string
 * @param str Normal string
 */
function str2hexstr(str) {
    return ab2hexstring(str2ab(str));
}
/**
 * Turn hex string into normal string
 * @param str Hex string
 */
function hexstr2str(str) {
    return ab2str(hexstring2ab(str));
}
/**
 * return the (length of bytes) + bytes
 * @param hex Hex string
 */
function hex2VarBytes(hex) {
    let result = '';
    result += num2VarInt(hex.length / 2);
    result += hex;
    return result;
}
/**
 * return the length of string(bytes) + string(bytes)
 * @param str Normal string
 */
function str2VarBytes(str) {
    let result = '';
    const hex = str2hexstr(str);
    const hexLen = num2VarInt(hex.length / 2);
    result += hexLen;
    result += hex;
    return result;
}
/**
 * return the byte of boolean value
 * @param v
 */
function bool2VarByte(v) {
    return v ? '01' : '00';
}
/**
 * Do xor operation with two strings
 * @param str1 Hex string
 * @param str2 Hex string
 */
function hexXor(str1, str2) {
    if (str1.length !== str2.length) {
        throw new Error('strings are disparate lengths');
    }
    if (str1.length % 2 !== 0) {
        throw new Error('strings must be hex');
    }
    const result = new ArrayBuffer(str1.length / 2);
    const result8 = new Uint8Array(result);
    for (let i = 0; i < str1.length; i += 2) {
        // tslint:disable-next-line:no-bitwise
        result8[i / 2] = parseInt(str1.substr(i, 2), 16) ^ parseInt(str2.substr(i, 2), 16);
    }
    return ab2hexstring(result);
}
/**
 * Converts a number to a big endian hexstring of a suitable size, optionally little endian
 * @param {number} num
 * @param {number} size - The required size in bytes, eg 1 for Uint8, 2 for Uint16. Defaults to 1.
 * @param {boolean} littleEndian - Encode the hex in little endian form
 * @return {string}
 */
const num2hexstring = (num, size = 1, littleEndian = false) => {
    if (num < 0) {
        throw new RangeError('num must be >=0');
    }
    if (size % 1 !== 0) {
        throw new Error('size must be a whole integer');
    }
    if (!Number.isSafeInteger(num)) {
        throw new RangeError(`num (${num}) must be a safe integer`);
    }
    size = size * 2;
    let hexstring = num.toString(16);
    hexstring = hexstring.length % size === 0 ? hexstring : ('0'.repeat(size) + hexstring).substring(hexstring.length);
    if (littleEndian) {
        hexstring = reverseHex(hexstring);
    }
    return hexstring;
};
/**
 * Converts a number to a hex
 * @param {number} num - The number
 * @returns {string} hexstring of the variable Int.
 */
const num2VarInt = num => {
    if (num < 0xfd) {
        return num2hexstring(num);
    } else if (num <= 0xffff) {
        // uint16
        return 'fd' + num2hexstring(num, 2, true);
    } else if (num <= 0xffffffff) {
        // uint32
        return 'fe' + num2hexstring(num, 4, true);
    } else {
        // uint64
        return 'ff' + num2hexstring(num, 8, true);
    }
};
/**
 * Reverses a hex string, 2 chars as 1 byte
 * @example
 * reverseHex('abcdef') = 'efcdab'
 * @param {string} hex - HEX string
 * @return {string} reversed hex string.
 */
const reverseHex = hex => {
    if (hex.length % 2 !== 0) {
        throw new Error(`Incorrect Length: ${hex}`);
    }
    let out = '';
    for (let i = hex.length - 2; i >= 0; i -= 2) {
        out += hex.substr(i, 2);
    }
    return out;
};
function bigIntFromBytes(bytes) {
    const buff = Buffer.from(bytes, 'hex');
    let data = Array.from(buff.subarray(0));
    const b = data[data.length - 1];
    if (b >> 7 === 1) {
        data = data.concat(Array(8 - data.length).fill(255));
    }
    return long__WEBPACK_IMPORTED_MODULE_3__["fromBytesLE"](data);
}
function bigIntToBytes(value) {
    let data = value.toBytesLE();
    const negData = value.neg().toBytesLE();
    let stop;
    if (value.isNegative()) {
        stop = 255;
    } else {
        stop = 0;
    }
    let b = stop;
    let pos = 0;
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i] !== stop) {
            b = value.isNegative() ? negData[i] : data[i];
            pos = i + 1;
            break;
        }
    }
    data = data.slice(0, pos);
    if (b >> 7 === 1) {
        data.push(value.isNegative() ? 255 : 0);
    }
    return new Buffer(data).toString('hex');
}
/**
 * @class StringReader
 * @classdesc A string helper used to read given string as bytes.2 chars as one byte.
 * @param {string} str - The string to read.
 */
class StringReader {
    constructor(str = '') {
        if (str.length % 2 !== 0) {
            throw new Error('Param\'s length is not even.');
        }
        this.str = str;
        this.pos = 0;
        this.size = this.str.length / 2;
    }
    /**
     * Checks if reached the end of the string.
     */
    isEmpty() {
        return this.pos >= this.str.length;
    }
    /**
     * Reads some bytes.
     * @param {number} bytes - Number of bytes to read
     */
    read(bytes) {
        if (this.isEmpty()) {
            throw new Error('StringReader reached the end.');
        }
        const out = this.str.substr(this.pos, bytes * 2);
        this.pos += bytes * 2;
        return out;
    }
    unreadBytes(bytes) {
        if (this.pos - bytes * 2 < 0) {
            throw new Error('Can not unread too many bytes.');
        }
        this.pos -= bytes * 2;
        return;
    }
    /**
     * Reads string terminated by NULL.
     */
    readNullTerminated() {
        const index = this.str.indexOf('00', this.pos);
        if (index === -1) {
            throw new Error('No ending NULL found');
        }
        const out = this.str.substring(this.pos, index);
        this.pos = index + 2;
        return out;
    }
    /**
     * First, read one byte as the length of bytes to read. Then read the following bytes.
     */
    readNextBytes() {
        const bytesToRead = this.readNextLen();
        if (bytesToRead === 0) {
            return '';
        }
        return this.read(bytesToRead);
    }
    /**
     * Reads one byte as int, which may indicates the length of following bytes to read.
     * @returns {number}
     */
    readNextLen() {
        let len = parseInt(this.read(1), 16);
        if (len === 0xfd) {
            len = parseInt(reverseHex(this.read(2)), 16);
        } else if (len === 0xfe) {
            len = parseInt(reverseHex(this.read(4)), 16);
        } else if (len === 0xff) {
            len = parseInt(reverseHex(this.read(8)), 16);
        }
        return len;
    }
    /**
     * Read Uint8
     */
    readUint8() {
        return parseInt(reverseHex(this.read(1)), 16);
    }
    /**
     * read 2 bytes as uint16 in littleEndian
     */
    readUint16() {
        return parseInt(reverseHex(this.read(2)), 16);
    }
    /**
     * Read 4 bytes as uint32 in littleEndian
     */
    readUint32() {
        return parseInt(reverseHex(this.read(4)), 16);
    }
    /**
     * Read 4 bytes as int in littleEndian
     */
    readInt() {
        return parseInt(reverseHex(this.read(4)), 16);
    }
    /**
     * Read 8 bytes as long in littleEndian
     */
    readLong() {
        return parseInt(reverseHex(this.read(8)), 16);
    }
    readBoolean() {
        return parseInt(this.read(1), 16) !== 0;
    }
}
class EventEmitter {
    constructor() {
        this.handlers = {};
    }
    // register event type and handler
    on(type, handler) {
        if (typeof this.handlers[type] === 'undefined') {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    }
    /**
     * trigger event
     * @param { string } type
     * @param { any } event , is the parameter
     */
    trigger(type, event) {
        if (this.handlers[type] instanceof Array) {
            const handlers = this.handlers[type];
            for (let i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event);
            }
        }
    }
    // remove event listener
    off(type) {
        delete this.handlers[type];
    }
}
const sendBackResult2Native = (result, callback) => {
    if (window && window.prompt) {
        window.prompt(`${_consts__WEBPACK_IMPORTED_MODULE_5__["WEBVIEW_SCHEME"]}://${callback}?params=${result}`);
    }
};
const axiosPost = (url, params) => {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, params).then(res => {
        // tslint:disable-next-line:no-console
        console.log('axios res:' + res);
        return res;
    }).catch(err => {
        // tslint:disable-next-line:no-console
        console.log('axios res:' + JSON.stringify(err));
        return err;
    });
};
/**
 * Gets current time in unix timestamp format.
 */
function now() {
    return Math.floor(Date.now() / 1000);
}
/**
 * Computes sha-256 hash from hex encoded data.
 *
 * @param data Hex encoded data
 */
function sha256(data) {
    const hex = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(data);
    const sha = crypto_js__WEBPACK_IMPORTED_MODULE_2__["SHA256"](hex).toString();
    return sha;
}
/**
 * Computes ripemd-160 hash from hex encoded data.
 *
 * @param data Hex encoded data
 */
function ripemd160(data) {
    const hex = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(data);
    const ripemd = crypto_js__WEBPACK_IMPORTED_MODULE_2__["RIPEMD160"](hex).toString();
    return ripemd;
}
/**
 * Computes ripemd-160 hash of sha-256 hash from hex encoded data.
 *
 * @param data Hex encoded data
 */
function hash160(SignatureScript) {
    return ripemd160(sha256(SignatureScript));
}
/**
 * Generates random ArrayBuffer of specified length.
 *
 * @param len Length of the array to generate
 */
function generateRandomArray(len) {
    return secure_random__WEBPACK_IMPORTED_MODULE_4__(len);
}
/**
 * Generates random ArrayBuffer of specified length encoded as hex string
 *
 * @param len Length of the array to generate
 */
function randomBytes(len) {
    return ab2hexstring(generateRandomArray(len));
}
function generateMnemonic(size = 16) {
    const random = ab2hexstring(generateRandomArray(size));
    return bip39__WEBPACK_IMPORTED_MODULE_1__["entropyToMnemonic"](random);
}
function parseMnemonic(str) {
    return bip39__WEBPACK_IMPORTED_MODULE_1__["mnemonicToEntropy"](str);
}
function varifyPositiveInt(v) {
    if (!/^[1-9]\d*$/.test(v.toString())) {
        throw _error__WEBPACK_IMPORTED_MODULE_6__["ERROR_CODE"].INVALID_PARAMS;
    }
    return;
}
function isBase64(str) {
    return Buffer.from(str, 'base64').toString('base64') === str;
}
function isHexString(str) {
    const regexp = /^[0-9a-fA-F]+$/;
    return regexp.test(str) && str.length % 2 === 0;
}
function unboundDeadline() {
    let count = 0;
    for (const m of _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_GENERATION_AMOUNT"]) {
        count += m;
    }
    count *= _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_TIME_INTERVAL"];
    const numInterval = _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_GENERATION_AMOUNT"].length;
    if (_consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_GENERATION_AMOUNT"][numInterval - 1] !== 1 || !(count - _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_TIME_INTERVAL"] < _consts__WEBPACK_IMPORTED_MODULE_5__["ONT_TOTAL_SUPPLY"] && _consts__WEBPACK_IMPORTED_MODULE_5__["ONT_TOTAL_SUPPLY"] <= count)) {
        throw new Error('incompatible constants setting');
    }
    return _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_TIME_INTERVAL"] * numInterval - (count - _consts__WEBPACK_IMPORTED_MODULE_5__["ONT_TOTAL_SUPPLY"]);
}
function calcUnboundOng(balance, startOffset, endOffset) {
    let amount = 0;
    if (startOffset >= endOffset) {
        return 0;
    }
    const UNBOUND_DEADLINE = unboundDeadline();
    if (startOffset < UNBOUND_DEADLINE) {
        let ustart = Math.floor(startOffset / _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_TIME_INTERVAL"]);
        let istart = startOffset % _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_TIME_INTERVAL"];
        if (endOffset >= UNBOUND_DEADLINE) {
            endOffset = UNBOUND_DEADLINE;
        }
        const uend = Math.floor(endOffset / _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_TIME_INTERVAL"]);
        const iend = endOffset % _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_TIME_INTERVAL"];
        while (ustart < uend) {
            amount += (_consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_TIME_INTERVAL"] - istart) * _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_GENERATION_AMOUNT"][ustart];
            ustart++;
            istart = 0;
        }
        amount += (iend - istart) * _consts__WEBPACK_IMPORTED_MODULE_5__["UNBOUND_GENERATION_AMOUNT"][ustart];
    }
    return amount * balance;
}

/***/ }),

/***/ "./src/wallet.ts":
/*!***********************!*\
  !*** ./src/wallet.ts ***!
  \***********************/
/*! exports provided: Wallet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wallet", function() { return Wallet; });
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account */ "./src/account.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./identity */ "./src/identity.ts");
/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */



/**
 * Class to manage Accounts and Identity
 */
class Wallet {
    constructor() {
        this.defaultOntid = '';
        this.defaultAccountAddress = '';
        this.identities = [];
        this.accounts = [];
    }
    static parseJson(json) {
        return Wallet.parseJsonObj(JSON.parse(json));
    }
    /**
     * Deserializes JSON object.
     *
     * Object should be real object, not stringified.
     *
     * @param obj JSON object
     */
    static parseJsonObj(obj) {
        const wallet = new Wallet();
        wallet.name = obj.name;
        wallet.defaultOntid = obj.defaultOntid;
        wallet.defaultAccountAddress = obj.defaultAccountAddress;
        wallet.createTime = obj.createTime;
        wallet.version = obj.version;
        wallet.scrypt = obj.scrypt;
        wallet.identities = obj.identities && obj.identities.map(i => _identity__WEBPACK_IMPORTED_MODULE_2__["Identity"].parseJsonObj(i));
        wallet.accounts = obj.accounts && obj.accounts.map(a => _account__WEBPACK_IMPORTED_MODULE_0__["Account"].parseJsonObj(a));
        wallet.extra = obj.extra;
        return wallet;
    }
    static fromWalletFile(obj) {
        const wallet = Wallet.parseJsonObj(obj);
        return wallet;
    }
    /**
     * @example
     * ```typescript
     *
     * import { Wallet } from 'ontology-ts-sdk';
     * const wallet = Wallet.create('test');
     * ```
     *
     * @param name Wallet's name
     */
    static create(name) {
        const wallet = new Wallet();
        wallet.name = name;
        // createtime
        wallet.createTime = new Date().toISOString();
        wallet.version = '1.0';
        wallet.scrypt = {
            n: _consts__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_SCRYPT"].cost,
            r: _consts__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_SCRYPT"].blockSize,
            p: _consts__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_SCRYPT"].parallel,
            dkLen: _consts__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_SCRYPT"].size
        };
        return wallet;
    }
    addAccount(account) {
        for (const ac of this.accounts) {
            if (ac.address.toBase58() === account.address.toBase58()) {
                return;
            }
        }
        this.accounts.push(account);
    }
    addIdentity(identity) {
        for (const item of this.identities) {
            if (item.ontid === identity.ontid) {
                return;
            }
        }
        this.identities.push(identity);
    }
    setDefaultAccount(address) {
        this.defaultAccountAddress = address;
    }
    setDefaultIdentity(ontid) {
        this.defaultOntid = ontid;
    }
    toJson() {
        return JSON.stringify(this.toJsonObj());
    }
    /**
     * Serializes to JSON object.
     *
     * Returned object will not be stringified.
     *
     */
    toJsonObj() {
        const obj = {
            name: this.name,
            defaultOntid: this.defaultOntid,
            defaultAccountAddress: this.defaultAccountAddress,
            createTime: this.createTime,
            version: this.version,
            scrypt: this.scrypt,
            identities: this.identities.map(i => i.toJsonObj()),
            accounts: this.accounts.map(a => a.toJsonObj()),
            extra: null
        };
        return obj;
    }
    signatureData() {
        return '';
    }
    /*
    *generate a wallet file that is compatible with cli wallet.
    */
    toWalletFile() {
        const obj = this.toJsonObj();
        return obj;
    }
}

/***/ }),

/***/ "@ont-community/hdkey-secp256r1":
/*!*************************************************!*\
  !*** external "@ont-community/hdkey-secp256r1" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ont-community/hdkey-secp256r1");

/***/ }),

/***/ "@ont-community/html5-websocket":
/*!*************************************************!*\
  !*** external "@ont-community/html5-websocket" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ont-community/html5-websocket");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "base64-url":
/*!*****************************!*\
  !*** external "base64-url" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("base64-url");

/***/ }),

/***/ "bignumber.js":
/*!*******************************!*\
  !*** external "bignumber.js" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),

/***/ "bip39":
/*!************************!*\
  !*** external "bip39" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bip39");

/***/ }),

/***/ "bs58":
/*!***********************!*\
  !*** external "bs58" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bs58");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "crypto-js":
/*!****************************!*\
  !*** external "crypto-js" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto-js");

/***/ }),

/***/ "elliptic":
/*!***************************!*\
  !*** external "elliptic" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("elliptic");

/***/ }),

/***/ "js-sha3":
/*!**************************!*\
  !*** external "js-sha3" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-sha3");

/***/ }),

/***/ "long":
/*!***********************!*\
  !*** external "long" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("long");

/***/ }),

/***/ "milagro-crypto-js":
/*!************************************!*\
  !*** external "milagro-crypto-js" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("milagro-crypto-js");

/***/ }),

/***/ "scrypt-async":
/*!*******************************!*\
  !*** external "scrypt-async" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("scrypt-async");

/***/ }),

/***/ "secure-random":
/*!********************************!*\
  !*** external "secure-random" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("secure-random");

/***/ }),

/***/ "sm.js":
/*!************************!*\
  !*** external "sm.js" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sm.js");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),

/***/ "websocket-as-promised":
/*!****************************************!*\
  !*** external "websocket-as-promised" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("websocket-as-promised");

/***/ }),

/***/ "wif":
/*!**********************!*\
  !*** external "wif" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("wif");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map