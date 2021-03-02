"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCookiesInterceptor = void 0;
require("reflect-metadata");
const unionBy = require("lodash/unionBy");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let SetCookiesInterceptor = class SetCookiesInterceptor {
    intercept(context, next) {
        const type = context.getType();
        let res;
        let req;
        if (type === 'graphql') {
            throw new Error('graphql not supported');
        }
        else if (type === 'http') {
            req = context.switchToHttp().getRequest();
            res = context.switchToHttp().getResponse();
        }
        else {
            throw new Error('unsupported context');
        }
        const handler = context.getHandler();
        const options = Reflect.getMetadata('cookieOptions', handler);
        const cookies = Reflect.getMetadata('cookieSettings', handler);
        req._cookies = [];
        return next.handle().pipe(operators_1.tap(() => {
            const allCookies = unionBy(req._cookies, cookies, item => item.name);
            for (const cookie of allCookies) {
                const cookieOptions = cookie.options
                    ? cookie.options
                    : options
                        ? options
                        : {};
                if (cookie.value) {
                    res.cookie(cookie.name, cookie.value, cookieOptions);
                }
                else {
                    res.clearCookie(cookie.name);
                }
            }
        }));
    }
};
SetCookiesInterceptor = __decorate([
    common_1.Injectable()
], SetCookiesInterceptor);
exports.SetCookiesInterceptor = SetCookiesInterceptor;
