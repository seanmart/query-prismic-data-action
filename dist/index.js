/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 991:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(547);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 78:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(991);
const file_command_1 = __nccwpck_require__(390);
const utils_1 = __nccwpck_require__(547);
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const oidc_utils_1 = __nccwpck_require__(510);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 390:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(147));
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(547);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 510:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(562);
const auth_1 = __nccwpck_require__(912);
const core_1 = __nccwpck_require__(78);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 547:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 912:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 562:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(685);
const https = __nccwpck_require__(687);
const pm = __nccwpck_require__(888);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(480);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 888:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 533:
/***/ ((module) => {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ }),

/***/ 480:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(7);


/***/ }),

/***/ 7:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(808);
var tls = __nccwpck_require__(404);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var events = __nccwpck_require__(361);
var assert = __nccwpck_require__(491);
var util = __nccwpck_require__(837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./node_modules/@prismicio/types/dist/index.js
const dist_RichTextNodeType = {
  heading1: "heading1",
  heading2: "heading2",
  heading3: "heading3",
  heading4: "heading4",
  heading5: "heading5",
  heading6: "heading6",
  paragraph: "paragraph",
  preformatted: "preformatted",
  strong: "strong",
  em: "em",
  listItem: "list-item",
  oListItem: "o-list-item",
  list: "group-list-item",
  oList: "group-o-list-item",
  image: "image",
  embed: "embed",
  hyperlink: "hyperlink",
  label: "label",
  span: "span"
};
const dist_LinkType = {
  Any: "Any",
  Document: "Document",
  Media: "Media",
  Web: "Web"
};
const EmbedType = {
  Link: "link",
  Rich: "rich"
};

const CustomTypeModelFieldType = {
  Boolean: "Boolean",
  Color: "Color",
  Date: "Date",
  Embed: "Embed",
  GeoPoint: "GeoPoint",
  Group: "Group",
  Image: "Image",
  IntegrationFields: "IntegrationFields",
  Link: "Link",
  Number: "Number",
  Select: "Select",
  Slices: "Slices",
  StructuredText: "StructuredText",
  Text: "Text",
  Timestamp: "Timestamp",
  UID: "UID"
};
const CustomTypeModelLinkSelectType = {
  Document: "document",
  Media: "media"
};
const CustomTypeModelSliceDisplay = {
  List: "list",
  Grid: "grid"
};
const CustomTypeModelSliceType = {
  Slice: "Slice",
  SharedSlice: "SharedSlice"
};

const WebhookType = {
  APIUpdate: "api-update",
  TestTrigger: "test-trigger"
};


//# sourceMappingURL=index.js.map

// EXTERNAL MODULE: ./node_modules/escape-html/index.js
var escape_html = __nccwpck_require__(533);
;// CONCATENATED MODULE: ./node_modules/@prismicio/helpers/dist/index.js





const asDate = (dateOrTimestampField) => {
  if (!dateOrTimestampField) {
    return null;
  }
  if (dateOrTimestampField.length === 24) {
    return new Date(dateOrTimestampField.replace(/(\+|-)(\d{2})(\d{2})$/, ".000$1$2:$3"));
  } else {
    return new Date(dateOrTimestampField);
  }
};

const documentToLinkField = (prismicDocument) => {
  var _a, _b, _c;
  return {
    link_type: dist_LinkType.Document,
    id: prismicDocument.id,
    uid: (_a = prismicDocument.uid) != null ? _a : void 0,
    type: prismicDocument.type,
    tags: prismicDocument.tags,
    lang: prismicDocument.lang,
    url: (_b = prismicDocument.url) != null ? _b : void 0,
    slug: (_c = prismicDocument.slugs) == null ? void 0 : _c[0],
    ...Object.keys(prismicDocument.data).length > 0 ? { data: prismicDocument.data } : {}
  };
};

const asLink = (linkFieldOrDocument, linkResolver) => {
  if (!linkFieldOrDocument) {
    return null;
  }
  const linkField = "link_type" in linkFieldOrDocument ? linkFieldOrDocument : documentToLinkField(linkFieldOrDocument);
  switch (linkField.link_type) {
    case dist_LinkType.Media:
    case dist_LinkType.Web:
      return "url" in linkField ? linkField.url : null;
    case dist_LinkType.Document: {
      if ("id" in linkField && linkResolver) {
        const resolvedURL = linkResolver(linkField);
        if (resolvedURL != null) {
          return resolvedURL;
        }
      }
      if ("url" in linkField && linkField.url) {
        return linkField.url;
      }
      return null;
    }
    case dist_LinkType.Any:
    default:
      return null;
  }
};

const asText = (richTextField, separator) => {
  if (richTextField) {
    return asText$1(richTextField, separator);
  } else {
    return null;
  }
};

const getLabel = (node) => {
  return "data" in node && "label" in node.data ? ` class="${node.data.label}"` : "";
};
const serializeStandardTag = (tag, node, children) => {
  return `<${tag}${getLabel(node)}>${children.join("")}</${tag}>`;
};
const serializePreFormatted = (node) => {
  return `<pre${getLabel(node)}>${escapeHtml(node.text)}</pre>`;
};
const serializeImage = (linkResolver, node) => {
  let imageTag = `<img src="${node.url}" alt="${escapeHtml(node.alt)}"${node.copyright ? ` copyright="${escapeHtml(node.copyright)}"` : ""} />`;
  if (node.linkTo) {
    imageTag = serializeHyperlink(linkResolver, {
      type: RichTextNodeType.hyperlink,
      data: node.linkTo,
      start: 0,
      end: 0
    }, [imageTag]);
  }
  return `<p class="block-img">${imageTag}</p>`;
};
const serializeEmbed = (node) => {
  return `<div data-oembed="${node.oembed.embed_url}" data-oembed-type="${node.oembed.type}" data-oembed-provider="${node.oembed.provider_name}"${getLabel(node)}>${node.oembed.html}</div>`;
};
const serializeHyperlink = (linkResolver, node, children) => {
  switch (node.data.link_type) {
    case LinkType.Web: {
      return `<a href="${escapeHtml(node.data.url)}" target="${node.data.target}" rel="noopener noreferrer"${getLabel(node)}>${children.join("")}</a>`;
    }
    case LinkType.Document: {
      return `<a href="${asLink(node.data, linkResolver)}"${getLabel(node)}>${children.join("")}</a>`;
    }
    case LinkType.Media: {
      return `<a href="${node.data.url}"${getLabel(node)}>${children.join("")}</a>`;
    }
  }
};
const serializeSpan = (content) => {
  return content ? escapeHtml(content).replace(/\n/g, "<br />") : "";
};

const createDefaultHTMLSerializer = (linkResolver) => {
  return (_type, node, text, children, _key) => {
    switch (node.type) {
      case Element.heading1:
        return serializeStandardTag("h1", node, children);
      case Element.heading2:
        return serializeStandardTag("h2", node, children);
      case Element.heading3:
        return serializeStandardTag("h3", node, children);
      case Element.heading4:
        return serializeStandardTag("h4", node, children);
      case Element.heading5:
        return serializeStandardTag("h5", node, children);
      case Element.heading6:
        return serializeStandardTag("h6", node, children);
      case Element.paragraph:
        return serializeStandardTag("p", node, children);
      case Element.preformatted:
        return serializePreFormatted(node);
      case Element.strong:
        return serializeStandardTag("strong", node, children);
      case Element.em:
        return serializeStandardTag("em", node, children);
      case Element.listItem:
        return serializeStandardTag("li", node, children);
      case Element.oListItem:
        return serializeStandardTag("li", node, children);
      case Element.list:
        return serializeStandardTag("ul", node, children);
      case Element.oList:
        return serializeStandardTag("ol", node, children);
      case Element.image:
        return serializeImage(linkResolver, node);
      case Element.embed:
        return serializeEmbed(node);
      case Element.hyperlink:
        return serializeHyperlink(linkResolver, node, children);
      case Element.label:
        return serializeStandardTag("span", node, children);
      case Element.span:
      default:
        return serializeSpan(text);
    }
  };
};
const wrapMapSerializerWithStringChildren = (mapSerializer) => {
  const modifiedMapSerializer = {};
  for (const tag in mapSerializer) {
    const tagSerializer = mapSerializer[tag];
    if (tagSerializer) {
      modifiedMapSerializer[tag] = (payload) => {
        return tagSerializer({
          ...payload,
          children: payload.children.join("")
        });
      };
    }
  }
  return wrapMapSerializer(modifiedMapSerializer);
};
const asHTML = (richTextField, linkResolver, htmlSerializer) => {
  if (richTextField) {
    let serializer;
    if (htmlSerializer) {
      serializer = composeSerializers(typeof htmlSerializer === "object" ? wrapMapSerializerWithStringChildren(htmlSerializer) : (type, node, text, children, key) => htmlSerializer(type, node, text, children.join(""), key), createDefaultHTMLSerializer(linkResolver));
    } else {
      serializer = createDefaultHTMLSerializer(linkResolver);
    }
    return serialize(richTextField, serializer).join("");
  } else {
    return null;
  }
};

const isNonNullish = (input) => {
  return input != null;
};
const isNonEmptyArray = (input) => {
  return !!input.length;
};
const richText = (field) => {
  if (field.length === 1 && "text" in field[0]) {
    return !!field[0].text;
  } else {
    return !!field.length;
  }
};
const title = richText;
const imageThumbnail = (thumbnail) => {
  return !!thumbnail.url;
};
const dist_image = (field) => {
  return imageThumbnail(field);
};
const dist_link = (field) => {
  return "id" in field || "url" in field;
};
const linkToMedia = dist_link;
const contentRelationship = dist_link;
const date = isNonNullish;
const timestamp = isNonNullish;
const color = isNonNullish;
const number = isNonNullish;
const keyText = isNonNullish;
const dist_select = isNonNullish;
const dist_embed = (field) => {
  return !!field.embed_url;
};
const geoPoint = (field) => {
  return "longitude" in field;
};
const integrationFields = isNonNullish;
const group = isNonEmptyArray;
const sliceZone = isNonEmptyArray;

var isFilled = /*#__PURE__*/Object.freeze({
	__proto__: null,
	richText: richText,
	title: title,
	imageThumbnail: imageThumbnail,
	image: dist_image,
	link: dist_link,
	linkToMedia: linkToMedia,
	contentRelationship: contentRelationship,
	date: date,
	timestamp: timestamp,
	color: color,
	number: number,
	keyText: keyText,
	select: dist_select,
	embed: dist_embed,
	geoPoint: geoPoint,
	integrationFields: integrationFields,
	group: group,
	sliceZone: sliceZone
});

const Elements = (/* unused pure expression or super */ null && (Element));


//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@prismicio/client/dist/index.js


const getEndpoint = (repositoryName) => `https://${repositoryName}.cdn.prismic.io/api/v2`;

const castArray = (a) => Array.isArray(a) ? a : [a];

const RENAMED_PARAMS = {
  accessToken: "access_token"
};
const castOrderingToString = (ordering) => typeof ordering === "string" ? ordering : [
  ordering.field,
  ordering.direction === "desc" ? ordering.direction : void 0
].filter(Boolean).join(" ");
const buildQueryURL = (endpoint, args) => {
  var _a;
  const { predicates, ...params } = args;
  const url = new URL(`documents/search`, `${endpoint}/`);
  if (predicates) {
    for (const predicate of castArray(predicates)) {
      url.searchParams.append("q", `[${predicate}]`);
    }
  }
  for (const k in params) {
    const name = (_a = RENAMED_PARAMS[k]) != null ? _a : k;
    let value = params[k];
    if (name === "orderings") {
      const scopedValue = params[name];
      if (scopedValue != null) {
        const v = castArray(scopedValue).map((ordering) => castOrderingToString(ordering)).join(",");
        value = `[${v}]`;
      }
    } else if (name === "routes") {
      if (typeof params[name] === "object") {
        value = JSON.stringify(castArray(params[name]));
      }
    }
    if (value != null) {
      url.searchParams.set(name, castArray(value).join(","));
    }
  }
  return url.toString();
};

const appendPredicates = (objWithPredicates = {}, predicates) => {
  return {
    ...objWithPredicates,
    predicates: [
      ...objWithPredicates.predicates || [],
      ...castArray(predicates)
    ]
  };
};

const castThunk = (a) => typeof a === "function" ? a : () => a;

class PrismicError extends Error {
  constructor(message = "An invalid API response was returned", url, response) {
    super(message);
    this.url = url;
    this.response = response;
  }
}

const findRef = (refs, predicate) => {
  const ref = refs.find((ref2) => predicate(ref2));
  if (!ref) {
    throw new PrismicError("Ref could not be found.", void 0, void 0);
  }
  return ref;
};

const findMasterRef = (refs) => {
  return findRef(refs, (ref) => ref.isMasterRef);
};

const findRefByID = (refs, id) => {
  return findRef(refs, (ref) => ref.id === id);
};

const findRefByLabel = (refs, label) => {
  return findRef(refs, (ref) => ref.label === label);
};

const readValue = (value) => {
  return value.replace(/%3B/g, ";");
};
const parse = (cookieString) => {
  const result = {};
  const cookies = cookieString.split("; ");
  for (const cookie of cookies) {
    const parts = cookie.split("=");
    const value = parts.slice(1).join("=");
    const name = readValue(parts[0]).replace(/%3D/g, "=");
    result[name] = readValue(value);
  }
  return result;
};
const getAll = (cookieStore) => parse(cookieStore);
const getCookie = (name, cookieStore) => getAll(cookieStore)[name];

class ForbiddenError extends PrismicError {
}

class ParsingError extends PrismicError {
}

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(", ")}]`;
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (value instanceof Date) {
    return `${value.getTime()}`;
  }
  return `${value}`;
};
const pathWithArgsPredicate = (name) => {
  const fn = (path, ...args) => {
    const formattedArgs = args.map(formatValue).join(", ");
    const joiner = path && args.length ? ", " : "";
    return `[${name}(${path}${joiner}${formattedArgs})]`;
  };
  return fn;
};
const pathPredicate = (name) => {
  const predicateFn = pathWithArgsPredicate(name);
  const fn = (path) => {
    return predicateFn(path);
  };
  return fn;
};
const argsPredicate = (name) => {
  const predicateFn = pathWithArgsPredicate(name);
  const fn = (...args) => {
    return predicateFn("", ...args);
  };
  return fn;
};
const predicate = {
  at: pathWithArgsPredicate("at"),
  not: pathWithArgsPredicate("not"),
  any: pathWithArgsPredicate("any"),
  in: pathWithArgsPredicate("in"),
  fulltext: pathWithArgsPredicate("fulltext"),
  has: pathPredicate("has"),
  missing: pathPredicate("missing"),
  similar: argsPredicate("similar"),
  geopointNear: pathWithArgsPredicate("geopoint.near"),
  numberLessThan: pathWithArgsPredicate("number.lt"),
  numberGreaterThan: pathWithArgsPredicate("number.gt"),
  numberInRange: pathWithArgsPredicate("number.inRange"),
  dateAfter: pathWithArgsPredicate("date.after"),
  dateBefore: pathWithArgsPredicate("date.before"),
  dateBetween: pathWithArgsPredicate("date.between"),
  dateDayOfMonth: pathWithArgsPredicate("date.day-of-month"),
  dateDayOfMonthAfter: pathWithArgsPredicate("date.day-of-month-after"),
  dateDayOfMonthBefore: pathWithArgsPredicate("date.day-of-month-before"),
  dateDayOfWeek: pathWithArgsPredicate("date.day-of-week"),
  dateDayOfWeekAfter: pathWithArgsPredicate("date.day-of-week-after"),
  dateDayOfWeekBefore: pathWithArgsPredicate("date.day-of-week-before"),
  dateMonth: pathWithArgsPredicate("date.month"),
  dateMonthAfter: pathWithArgsPredicate("date.month-after"),
  dateMonthBefore: pathWithArgsPredicate("date.month-before"),
  dateYear: pathWithArgsPredicate("date.year"),
  dateHour: pathWithArgsPredicate("date.hour"),
  dateHourAfter: pathWithArgsPredicate("date.hour-after"),
  dateHourBefore: pathWithArgsPredicate("date.hour-before")
};

const preview = "io.prismic.preview";

var cookie = /*#__PURE__*/Object.freeze({
	__proto__: null,
	preview: preview
});

class NotFoundError extends PrismicError {
}

const MAX_PAGE_SIZE = 100;
const REPOSITORY_CACHE_TTL = 5e3;
const GET_ALL_QUERY_DELAY = 500;
var RefStateMode;
(function(RefStateMode2) {
  RefStateMode2["Master"] = "Master";
  RefStateMode2["ReleaseID"] = "ReleaseID";
  RefStateMode2["ReleaseLabel"] = "ReleaseLabel";
  RefStateMode2["Manual"] = "Manual";
})(RefStateMode || (RefStateMode = {}));
const typePredicate = (documentType) => predicate.at("document.type", documentType);
const everyTagPredicate = (tags) => predicate.at("document.tags", tags);
const someTagsPredicate = (tags) => predicate.any("document.tags", tags);
const createClient = (...args) => new Client(...args);
class Client {
  constructor(endpoint, options = {}) {
    this.refState = {
      mode: RefStateMode.Master,
      autoPreviewsEnabled: true
    };
    this.cachedRepositoryExpiration = 0;
    if (process.env.NODE_ENV === "development" && /\.prismic\.io\/(?!api\/v2\/?)/.test(endpoint)) {
      throw new PrismicError("@prismicio/client only supports Prismic Rest API V2. Please use the getEndpoint helper to generate a valid Rest API V2 endpoint URL.", void 0, void 0);
    }
    this.endpoint = endpoint;
    this.accessToken = options.accessToken;
    this.routes = options.routes;
    this.defaultParams = options.defaultParams;
    if (options.ref) {
      this.queryContentFromRef(options.ref);
    }
    if (typeof options.fetch === "function") {
      this.fetchFn = options.fetch;
    } else if (typeof globalThis.fetch === "function") {
      this.fetchFn = globalThis.fetch;
    } else {
      throw new PrismicError("A valid fetch implementation was not provided. In environments where fetch is not available (including Node.js), a fetch implementation must be provided via a polyfill or the `fetch` option.", void 0, void 0);
    }
    if (this.fetchFn === globalThis.fetch) {
      this.fetchFn = this.fetchFn.bind(globalThis);
    }
  }
  enableAutoPreviews() {
    this.refState.autoPreviewsEnabled = true;
  }
  enableAutoPreviewsFromReq(req) {
    this.refState.httpRequest = req;
    this.refState.autoPreviewsEnabled = true;
  }
  disableAutoPreviews() {
    this.refState.autoPreviewsEnabled = false;
  }
  async query(predicates, params) {
    const url = await this.buildQueryURL({ ...params, predicates });
    return await this.fetch(url, params);
  }
  async get(params) {
    const url = await this.buildQueryURL(params);
    return await this.fetch(url, params);
  }
  async getFirst(params) {
    const url = await this.buildQueryURL(params);
    const result = await this.fetch(url, params);
    const firstResult = result.results[0];
    if (firstResult) {
      return firstResult;
    }
    throw new PrismicError("No documents were returned", url, void 0);
  }
  async dangerouslyGetAll(params = {}) {
    const { limit = Infinity, ...actualParams } = params;
    const resolvedParams = {
      ...actualParams,
      pageSize: actualParams.pageSize || MAX_PAGE_SIZE
    };
    const documents = [];
    let latestResult;
    while ((!latestResult || latestResult.next_page) && documents.length < limit) {
      const page = latestResult ? latestResult.page + 1 : void 0;
      latestResult = await this.get({ ...resolvedParams, page });
      documents.push(...latestResult.results);
      if (latestResult.next_page) {
        await new Promise((res) => setTimeout(res, GET_ALL_QUERY_DELAY));
      }
    }
    return documents.slice(0, limit);
  }
  async getByID(id, params) {
    return await this.getFirst(appendPredicates(params, predicate.at("document.id", id)));
  }
  async getByIDs(ids, params) {
    return await this.get(appendPredicates(params, predicate.in("document.id", ids)));
  }
  async getAllByIDs(ids, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, predicate.in("document.id", ids)));
  }
  async getByUID(documentType, uid, params) {
    return await this.getFirst(appendPredicates(params, [
      typePredicate(documentType),
      predicate.at(`my.${documentType}.uid`, uid)
    ]));
  }
  async getByUIDs(documentType, uids, params) {
    return await this.get(appendPredicates(params, [
      typePredicate(documentType),
      predicate.in(`my.${documentType}.uid`, uids)
    ]));
  }
  async getAllByUIDs(documentType, uids, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, [
      typePredicate(documentType),
      predicate.in(`my.${documentType}.uid`, uids)
    ]));
  }
  async getSingle(documentType, params) {
    return await this.getFirst(appendPredicates(params, typePredicate(documentType)));
  }
  async getByType(documentType, params) {
    return await this.get(appendPredicates(params, typePredicate(documentType)));
  }
  async getAllByType(documentType, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, typePredicate(documentType)));
  }
  async getByTag(tag, params) {
    return await this.get(appendPredicates(params, everyTagPredicate(tag)));
  }
  async getAllByTag(tag, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, everyTagPredicate(tag)));
  }
  async getByEveryTag(tags, params) {
    return await this.get(appendPredicates(params, everyTagPredicate(tags)));
  }
  async getAllByEveryTag(tags, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, everyTagPredicate(tags)));
  }
  async getBySomeTags(tags, params) {
    return await this.get(appendPredicates(params, someTagsPredicate(tags)));
  }
  async getAllBySomeTags(tags, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, someTagsPredicate(tags)));
  }
  async getRepository() {
    const url = new URL(this.endpoint);
    if (this.accessToken) {
      url.searchParams.set("access_token", this.accessToken);
    }
    return await this.fetch(url.toString());
  }
  async getRefs() {
    const repository = await this.getRepository();
    return repository.refs;
  }
  async getRefByID(id) {
    const refs = await this.getRefs();
    return findRefByID(refs, id);
  }
  async getRefByLabel(label) {
    const refs = await this.getRefs();
    return findRefByLabel(refs, label);
  }
  async getMasterRef() {
    const refs = await this.getRefs();
    return findMasterRef(refs);
  }
  async getReleases() {
    const refs = await this.getRefs();
    return refs.filter((ref) => !ref.isMasterRef);
  }
  async getReleaseByID(id) {
    const releases = await this.getReleases();
    return findRefByID(releases, id);
  }
  async getReleaseByLabel(label) {
    const releases = await this.getReleases();
    return findRefByLabel(releases, label);
  }
  async getTags() {
    try {
      const tagsForm = await this.getCachedRepositoryForm("tags");
      return await this.fetch(tagsForm.action);
    } catch (e) {
      const repository = await this.getRepository();
      return repository.tags;
    }
  }
  async buildQueryURL(params = {}) {
    const ref = params.ref || await this.getResolvedRefString();
    const integrationFieldsRef = params.integrationFieldsRef || (await this.getCachedRepository()).integrationFieldsRef || void 0;
    return buildQueryURL(this.endpoint, {
      ...this.defaultParams,
      ...params,
      ref,
      integrationFieldsRef,
      routes: params.routes || this.routes,
      accessToken: params.accessToken || this.accessToken
    });
  }
  async resolvePreviewURL(args) {
    var _a;
    let documentID = args.documentID;
    let previewToken = args.previewToken;
    if (typeof globalThis.location !== "undefined") {
      const searchParams = new URLSearchParams(globalThis.location.search);
      documentID = documentID || searchParams.get("documentId") || void 0;
      previewToken = previewToken || searchParams.get("token") || void 0;
    } else if ((_a = this.refState.httpRequest) == null ? void 0 : _a.query) {
      documentID = documentID || this.refState.httpRequest.query.documentId;
      previewToken = previewToken || this.refState.httpRequest.query.token;
    }
    if (documentID != null) {
      const document = await this.getByID(documentID, {
        ref: previewToken
      });
      return asLink(document, args.linkResolver);
    } else {
      return args.defaultURL;
    }
  }
  queryLatestContent() {
    this.refState.mode = RefStateMode.Master;
  }
  queryContentFromReleaseByID(releaseID) {
    this.refState = {
      ...this.refState,
      mode: RefStateMode.ReleaseID,
      releaseID
    };
  }
  queryContentFromReleaseByLabel(releaseLabel) {
    this.refState = {
      ...this.refState,
      mode: RefStateMode.ReleaseLabel,
      releaseLabel
    };
  }
  queryContentFromRef(ref) {
    this.refState = {
      ...this.refState,
      mode: RefStateMode.Manual,
      ref
    };
  }
  async getCachedRepository() {
    if (!this.cachedRepository || Date.now() >= this.cachedRepositoryExpiration) {
      this.cachedRepositoryExpiration = Date.now() + REPOSITORY_CACHE_TTL;
      this.cachedRepository = await this.getRepository();
    }
    return this.cachedRepository;
  }
  async getCachedRepositoryForm(name) {
    const cachedRepository = await this.getCachedRepository();
    const form = cachedRepository.forms[name];
    if (!form) {
      throw new PrismicError(`Form with name "${name}" could not be found`, void 0, void 0);
    }
    return form;
  }
  async getResolvedRefString() {
    var _a, _b, _c;
    if (this.refState.autoPreviewsEnabled) {
      let previewRef = void 0;
      if ((_a = globalThis.document) == null ? void 0 : _a.cookie) {
        previewRef = getCookie(preview, globalThis.document.cookie);
      } else if ((_c = (_b = this.refState.httpRequest) == null ? void 0 : _b.headers) == null ? void 0 : _c.cookie) {
        previewRef = getCookie(preview, this.refState.httpRequest.headers.cookie);
      }
      if (previewRef) {
        return previewRef;
      }
    }
    const cachedRepository = await this.getCachedRepository();
    const refModeType = this.refState.mode;
    if (refModeType === RefStateMode.ReleaseID) {
      return findRefByID(cachedRepository.refs, this.refState.releaseID).ref;
    } else if (refModeType === RefStateMode.ReleaseLabel) {
      return findRefByLabel(cachedRepository.refs, this.refState.releaseLabel).ref;
    } else if (refModeType === RefStateMode.Manual) {
      const res = await castThunk(this.refState.ref)();
      if (typeof res === "string") {
        return res;
      }
    }
    return findMasterRef(cachedRepository.refs).ref;
  }
  async fetch(url, _params) {
    const res = await this.fetchFn(url);
    let json;
    try {
      json = await res.json();
    } catch (e) {
      if (res.status === 404) {
        throw new NotFoundError(`Prismic repository not found. Check that "${this.endpoint}" is pointing to the correct repository.`, url, void 0);
      } else {
        throw new PrismicError(void 0, url, void 0);
      }
    }
    switch (res.status) {
      case 200: {
        return json;
      }
      case 400: {
        throw new ParsingError(json.message, url, json);
      }
      case 401:
      case 403: {
        throw new ForbiddenError("error" in json ? json.error : json.message, url, json);
      }
    }
    throw new PrismicError(void 0, url, json);
  }
}

const predicates = (/* unused pure expression or super */ null && (predicate));
const Predicates = (/* unused pure expression or super */ null && (predicate));


//# sourceMappingURL=index.js.map

// EXTERNAL MODULE: ./node_modules/@actions/core/lib/core.js
var core = __nccwpck_require__(78);
;// CONCATENATED MODULE: ./index.js



async function queryPrismicAPI(){

  let accessToken = (0,core.getInput)('ACCESS_TOKEN')
  let endPoint = (0,core.getInput)('END_POINT')
  let type = (0,core.getInput)('TYPE')
  let client = getClient(endPoint,accessToken)
  let fields = getFields((0,core.getInput)('FIELDS'))
  let res = null
  let arr = []
  let data = []

  if(type) res = await client.getAllByType(type)

  if (res){
    arr = Array.isArray(res) ? res : [res]
    arr.forEach(a => data.push(fields ? getDataFields(a,fields) : a))
  }

  let output = data.length == 1 ? data[0] : data
  ;(0,core.setOutput)('DATA', output);

}

function has(s,c){
  return s.indexOf(c) >= 0
}

function getDataFields(data,fields){
  // fields will be an array of {key,value}
  let getNestedValue = (v) => v.split('.').reduce((o,i)=> o[i],data)

  let obj = {}
  fields.forEach(f => {
    obj[f.key] = has(f.value,".") ? getNestedValue(f.value) : d[f.value]
  })

  return obj
}

function getFields(d){
  if(!d) return null
  // example "id:uid,name:data.name"

  let getFieldAndKey = (s)=>{
    let a = s.split(':')
    return {key:a[0],field:a[1]}
  }

  let fields = has(d,",") ? d.split(",") : [d]

  return fields.map(f => {
    let key = null
    let value = f

    if(has(f,":")){
      let a = f.split(':')
      key = a[0]
      value = a[1]
    } else if(has(f,".")) {
      let a = f.split(".")
      key = a[a.length - 1]
    } else {
      key = f
    }

    return {key,value}

  })

}

function getClient(endPoint,accessToken){
  return createClient(endPoint,{
    accessToken,
    fetch: async (url,options)=>{
      const res = await fetch(url,options)
      if (res.ok) return res
    }
  })
}

queryPrismicAPI()

})();

module.exports = __webpack_exports__;
/******/ })()
;