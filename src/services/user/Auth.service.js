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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const Auth_persistance_1 = require("../../persistance/Auth.persistance");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const authentication_error_1 = require("../errors/authentication.error");
(0, dotenv_1.config)();
class AuthService {
    constructor(authPersistance) {
        this.authPersistance = authPersistance;
    }
    // public login(email: string, password: string): boolean {
    //   return this.authPersistance.login(email, password);
    // }
    signup(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = bcrypt_1.default.hashSync(userDTO.password, 10);
            const newUser = Object.assign(Object.assign({}, userDTO), { password: hashedPassword });
            const user = yield this.authPersistance.addUser(newUser);
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT);
            return { user, token: token };
        });
    }
    login(userCredential) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authPersistance.getUserByEmail(userCredential.email);
            if (!user) {
                throw new authentication_error_1.AuthenticationError(authentication_error_1.Reason.WRONG_CRENDENTIALS);
            }
            const isPasswordCorrect = bcrypt_1.default.compareSync(userCredential.password, user.password);
            if (!isPasswordCorrect) {
                throw new authentication_error_1.AuthenticationError(authentication_error_1.Reason.WRONG_CRENDENTIALS);
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT);
            return { user, token: token };
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authPersistance.getUserById(id);
        });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService(Auth_persistance_1.authPersistance);
