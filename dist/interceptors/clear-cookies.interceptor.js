"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearCookiesInterceptor = void 0;
require("reflect-metadata");
const common_1 = require("@nestjs/common");
let ClearCookiesInterceptor = class ClearCookiesInterceptor {
    intercept(context, next) {
        const type = context.getType();
        let res;
        if (type === 'graphql') {
            throw new Error('graphql not supported');
        }
        else if (type === 'http') {
            res = context.switchToHttp().getResponse();
        }
        else {
            throw new Error('unsupported context');
        }
        const handler = context.getHandler();
        const cookieNames = [].concat(Reflect.getMetadata('cookieNames', handler));
        if (cookieNames) {
            for (const name of cookieNames) {
                res.clearCookie(name);
            }
        }
        return next.handle();
    }
};
ClearCookiesInterceptor = __decorate([
    common_1.Injectable()
], ClearCookiesInterceptor);
exports.ClearCookiesInterceptor = ClearCookiesInterceptor;
