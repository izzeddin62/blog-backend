import { User, UserProperties } from "../services/user/User";
import { db } from "../database/db";
import { UserTable } from "../database/schema";
import { PostgresError } from "postgres";
import { DuplicateValueError } from "../services/errors/duplicate-value.error";
import { eq } from "drizzle-orm";

type Row = {
  id: number;
  email: string;
  password: string;
};

function rowToDomain(row: Row): User {
  return new User(row);
}

export class AuthPersistance {
  public async addUser(userDTO: Omit<UserProperties, "id">) {
    try {
      const { email, password } = userDTO;
      const newUser = await db
        .insert(UserTable)
        .values({
          email,
          password,
        })
        .returning({
          id: UserTable.id,
          email: UserTable.email,
          password: UserTable.password,
        });
      newUser;

      return rowToDomain(newUser[0]);
    } catch (error) {
        if (error instanceof PostgresError &&  error.code === '23505') {
          throw new DuplicateValueError('User', 'email', userDTO.email);
        }
        throw error;
    }
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email))
    if (user) {
      return rowToDomain({
        id: user.id,
        email: user.email,
        password: user.password,
      
      });
    }
    return null;
  }

  public async getUserById(id: number): Promise<User | null> {
    const [user] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, id));
    if (user) {
      return rowToDomain({
        id: user.id,
        email: user.email,
        password: user.password,
      });
    }
    return null;
  }
}

export const authPersistance = new AuthPersistance();
