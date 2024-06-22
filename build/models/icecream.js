"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcecreamModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const icecreamSchema = new mongoose_1.default.Schema({
    name: {
        required: true,
        type: String,
    },
});
exports.IcecreamModel = mongoose_1.default.model("Icecream", icecreamSchema);
