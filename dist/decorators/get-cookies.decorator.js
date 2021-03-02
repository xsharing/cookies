"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedCookies = exports.Cookies = void 0;
const common_1 = require("@nestjs/common");
exports.Cookies = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies && request.cookies[data] : request.cookies;
});
exports.SignedCookies = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return data
        ? request.signedCookies && request.signedCookies[data]
        : request.signedCookies;
});
