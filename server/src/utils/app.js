"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = exports.getDevice = exports.Device = void 0;
var Device;
(function (Device) {
    Device[Device["COMPUTER"] = 0] = "COMPUTER";
    Device[Device["MOBILE"] = 1] = "MOBILE";
    Device[Device["TABLET"] = 2] = "TABLET";
})(Device = exports.Device || (exports.Device = {}));
const getDevice = () => {
    const deviceOS = process.env.OS;
    return Device.COMPUTER;
};
exports.getDevice = getDevice;
const getFileExtension = (file) => {
    if (!file) {
        throw new Error('No file name received!');
    }
    const fileExtension = file.match(/(?<=\.)[a-z]{3}$/);
    if (!fileExtension) {
        throw new Error('File could not be parsed!');
    }
    return fileExtension[0];
};
exports.getFileExtension = getFileExtension;
