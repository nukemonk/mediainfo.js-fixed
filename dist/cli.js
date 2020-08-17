#!/usr/bin/env node
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = require("fs");
var yargs = require("yargs");
var mediainfo_1 = __importDefault(require("../dist/mediainfo"));
var formatChoices = ['JSON', 'XML', 'HTML', 'text'];
var analyze = function (_a) {
    var file = _a.file, format = _a.format, coverData = _a.coverData;
    return __awaiter(void 0, void 0, void 0, function () {
        var fileHandle, fileSize, mediainfo, readChunk, result, err_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (coverData && !['JSON', 'XML'].includes(format)) {
                        throw TypeError('For cover data you need to choose JSON or XML as output format!');
                    }
                    readChunk = function (size, offset) { return __awaiter(void 0, void 0, void 0, function () {
                        var buffer;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    buffer = new Uint8Array(size);
                                    return [4 /*yield*/, fileHandle.read(buffer, 0, size, offset)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, buffer];
                            }
                        });
                    }); };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 10]);
                    return [4 /*yield*/, fs_1.promises.open(file, 'r')];
                case 2:
                    fileHandle = _c.sent();
                    return [4 /*yield*/, fileHandle.stat()];
                case 3:
                    fileSize = (_c.sent()).size;
                    return [4 /*yield*/, mediainfo_1["default"]({ format: format, coverData: coverData })];
                case 4:
                    mediainfo = (_c.sent());
                    return [4 /*yield*/, mediainfo.analyzeData(function () { return fileSize; }, readChunk)];
                case 5:
                    result = _c.sent();
                    console.log(result);
                    return [3 /*break*/, 10];
                case 6:
                    err_1 = _c.sent();
                    throw err_1;
                case 7:
                    _b = fileHandle;
                    if (!_b) return [3 /*break*/, 9];
                    return [4 /*yield*/, fileHandle.close()];
                case 8:
                    _b = (_c.sent());
                    _c.label = 9;
                case 9:
                    _b;
                    mediainfo && mediainfo.close();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
};
yargs
    .option('format', {
    alias: 'f',
    "default": 'text',
    describe: 'Choose format',
    choices: formatChoices,
    type: 'string'
})
    .option('cover-data', {
    "default": false,
    describe: 'Output cover data as base64',
    type: 'boolean'
})
    .command('$0 <file>', 'Show information about media files', function (yargs) {
    yargs.positional('file', {
        describe: 'File to analyze',
        type: 'string'
    });
}, analyze)
    .fail(function (msg, err, yargs) {
    if (msg) {
        console.error(yargs.help());
        console.error(msg);
    }
    if (err) {
        console.error(err.message);
    }
    process.exit(1);
})
    .help()
    .parse();
