import { AuthService } from '../../../src/services/user/Auth.service';
import { users } from '../../fixtures/users';
import {
  mockAuthPersistance,
  AuthPersistanceMock,
} from '../../mocks/auth.persistance.mock';

describe('Auth service', () => {
  let authService: AuthService;
  let mockedAuthPersistance: AuthPersistanceMock;

  beforeEach(() => {
    mockedAuthPersistance = mockAuthPersistance();
    authService = new AuthService(mockedAuthPersistance);
  });

  describe('auth service test', () => {
    it('should return getUser is called with an id', async () => {
      const user = users[0];
      mockedAuthPersistance.getUserById.mockResolvedValueOnce(user);
      const returnedUser = await authService.getUser(user.id);
      expect(returnedUser).toEqual(user);
      expect(mockedAuthPersistance.getUserById).toHaveBeenCalledWith(user.id);
    });
  });
});
