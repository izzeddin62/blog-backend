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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const Auth_service_1 = require("../services/user/Auth.service");
const duplicate_value_error_1 = require("../services/errors/duplicate-value.error");
const authentication_error_1 = require("../services/errors/authentication.error");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = yield this.authService.signup({
                    email: req.body.email,
                    password: req.body.password,
                });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _a = userInfo.user, { password } = _a, userInfoWithoutPassword = __rest(_a, ["password"]);
                res
                    .status(201)
                    .json({ user: userInfoWithoutPassword, token: userInfo.token });
            }
            catch (error) {
                if (error instanceof duplicate_value_error_1.DuplicateValueError) {
                    return res.status(409).json({ error: error.message });
                }
                return res
                    .status(500)
                    .json({ message: 'Server error. Please try again later' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = yield this.authService.login({
                    email: req.body.email,
                    password: req.body.password,
                });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _a = userInfo.user, { password } = _a, userInfoWithoutPassword = __rest(_a, ["password"]);
                res.json({ user: userInfoWithoutPassword, token: userInfo.token });
            }
            catch (error) {
                if (error instanceof authentication_error_1.AuthenticationError) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
                return res.status(500).json({ error: 'Server error' });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const user = yield this.authService.getUser(userId);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password } = user, userInfoWithoutPassword = __rest(user, ["password"]);
                return res.json({ user: userInfoWithoutPassword });
            }
            catch (error) {
                return res.status(500).json({ error: 'Server error' });
            }
        });
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController(Auth_service_1.authService);
