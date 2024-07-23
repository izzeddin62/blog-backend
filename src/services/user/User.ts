export type UserProperties = { 
    id: number;
    email: string;
    password: string;
}

export class User {
  id: number;
  email: string;
  password: string;
  constructor({ id, email, password }: UserProperties) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}