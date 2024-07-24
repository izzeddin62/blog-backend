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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPersistance = exports.AuthPersistance = void 0;
const User_1 = require("../services/user/User");
const db_1 = require("../database/db");
const schema_1 = require("../database/schema");
const postgres_1 = require("postgres");
const duplicate_value_error_1 = require("../services/errors/duplicate-value.error");
const drizzle_orm_1 = require("drizzle-orm");
function rowToDomain(row) {
    return new User_1.User(row);
}
class AuthPersistance {
    addUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = userDTO;
                const newUser = yield db_1.db
                    .insert(schema_1.UserTable)
                    .values({
                    email,
                    password,
                })
                    .returning({
                    id: schema_1.UserTable.id,
                    email: schema_1.UserTable.email,
                    password: schema_1.UserTable.password,
                });
                newUser;
                return rowToDomain(newUser[0]);
            }
            catch (error) {
                if (error instanceof postgres_1.PostgresError && error.code === '23505') {
                    throw new duplicate_value_error_1.DuplicateValueError('User', 'email', userDTO.email);
                }
                throw error;
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield db_1.db
                .select()
                .from(schema_1.UserTable)
                .where((0, drizzle_orm_1.eq)(schema_1.UserTable.email, email));
            if (user) {
                return rowToDomain({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                });
            }
            return null;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield db_1.db
                .select()
                .from(schema_1.UserTable)
                .where((0, drizzle_orm_1.eq)(schema_1.UserTable.id, id));
            if (user) {
                return rowToDomain({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                });
            }
            return null;
        });
    }
}
exports.AuthPersistance = AuthPersistance;
exports.authPersistance = new AuthPersistance();
