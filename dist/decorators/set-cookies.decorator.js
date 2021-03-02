"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCookies = void 0;
const common_1 = require("@nestjs/common");
const set_cookies_interceptor_1 = require("../interceptors/set-cookies.interceptor");
function SetCookies(options, cookies) {
    return (target, propertyKey, descriptor) => {
        if (options) {
            if (!Array.isArray(options) && !options.hasOwnProperty('name')) {
                common_1.SetMetadata('cookieOptions', options)(target, propertyKey, descriptor);
            }
            else {
                cookies = [].concat(options);
            }
        }
        if (cookies) {
            common_1.SetMetadata('cookieSettings', [].concat(cookies))(target, propertyKey, descriptor);
        }
        common_1.UseInterceptors(set_cookies_interceptor_1.SetCookiesInterceptor)(target, propertyKey, descriptor);
    };
}
exports.SetCookies = SetCookies;
