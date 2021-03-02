"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearCookies = void 0;
const common_1 = require("@nestjs/common");
const clear_cookies_interceptor_1 = require("../interceptors/clear-cookies.interceptor");
function ClearCookies(...cookies) {
    return (target, propertyKey, descriptor) => {
        common_1.SetMetadata('cookieNames', cookies)(target, propertyKey, descriptor);
        common_1.UseInterceptors(clear_cookies_interceptor_1.ClearCookiesInterceptor)(target, propertyKey, descriptor);
    };
}
exports.ClearCookies = ClearCookies;
