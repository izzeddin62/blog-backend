import { AuthPersistance } from '../../src/persistance/Auth.persistance';


export type AuthPersistanceMock = jest.Mocked<AuthPersistance>

export function mockAuthPersistance(): AuthPersistanceMock {
  return {
    addUser: jest.fn(),
    getUserByEmail: jest.fn(),
    getUserById: jest.fn(),
  };
}