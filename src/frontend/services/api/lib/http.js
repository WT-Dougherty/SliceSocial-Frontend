"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = request;
var config_1 = require("../../config");
var keychain_1 = require("../../auth/keychain");
var sleep_1 = require("../../../util/sleep");
// this function is used to generate a request given passed request options
//    it returns a promise of a response
function request(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var url, headers, token, controller, timeout, request, attempts;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = buildUrl(opts.path, opts.query);
                    headers = __assign(__assign({ "Accept": "application/json" }, (opts.body ? { "Content-Type": "application/json" } : {})), ((_a = opts.headers) !== null && _a !== void 0 ? _a : {}));
                    if (!opts.auth) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, keychain_1.getAccessToken)()];
                case 1:
                    token = _c.sent();
                    if (token)
                        headers["Authorization"] = "Bearer ".concat(token);
                    _c.label = 2;
                case 2:
                    ;
                    controller = new AbortController();
                    timeout = setTimeout(function () {
                        controller.abort();
                    }, config_1.REQUEST_TIMEOUT_MS);
                    request = new Request(url, {
                        headers: headers,
                        method: opts.method,
                        body: opts.body ? JSON.stringify(opts.body) : undefined,
                        signal: (_b = opts.signal) !== null && _b !== void 0 ? _b : controller.signal,
                    });
                    attempts = opts.method === "GET" ? 3 : 1;
                    return [4 /*yield*/, fetchWithRetry(request, attempts, timeout)];
                case 3: // retry reads only
                return [2 /*return*/, (_c.sent())];
            }
        });
    });
}
// fetch to input (url) with init (request options) attempts times
function fetchWithRetry(request, attempts, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var lastErr, i, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < attempts)) return [3 /*break*/, 10];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 9]);
                    return [4 /*yield*/, fetch(request)];
                case 3:
                    res = _a.sent();
                    if (!(res.status >= 500 && i < attempts - 1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, sleep_1.sleep)(200 * Math.pow(2, i))];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 5:
                    clearTimeout(timeout);
                    return [2 /*return*/, res];
                case 6:
                    err_1 = _a.sent();
                    lastErr = err_1;
                    if (!(i < attempts - 1)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, sleep_1.sleep)(200 * Math.pow(2, i))];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8: throw lastErr;
                case 9:
                    i++;
                    return [3 /*break*/, 1];
                case 10: throw lastErr;
            }
        });
    });
}
// helper functions...
// build the url that will direct your http request
function buildUrl(path, query) {
    var url = new URL(path, config_1.API_BASE_URL);
    if (query) {
        Object.entries(query).forEach(function (_a) {
            var k = _a[0], v = _a[1];
            if (v !== undefined && v !== null)
                url.searchParams.set(k, String(v));
        });
    }
    return url.toString();
}
