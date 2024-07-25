import { AuthService } from '../../../services/user/Auth.service';
import { User } from '../../../services/user/User';
import { userDtos, users } from '../../fixtures/users';
import {
  mockAuthPersistance,
  AuthPersistanceMock,
} from '../../mocks/auth.persistance.mock';
import bcrypt from 'bcrypt';

describe('Auth service', () => {
  let authService: AuthService;
  let mockedAuthPersistance: AuthPersistanceMock;

  beforeEach(() => {
    mockedAuthPersistance = mockAuthPersistance();
    authService = new AuthService(mockedAuthPersistance);
  });

  describe('GET USER', () => {
    it('should return getUser is called with an id', async () => {
      const user = users[0];
      mockedAuthPersistance.getUserById.mockResolvedValueOnce(user);
      const returnedUser = await authService.getUser(user.id);
      expect(returnedUser).toEqual(user);
      expect(mockedAuthPersistance.getUserById).toHaveBeenCalledWith(user.id);
    });
  });

  describe('ADD USER', () => {
    it('should add the user the user doesn\'t exists', async () => {
      const user = users[0];
      const userDTO = userDtos[0];
      mockedAuthPersistance.addUser.mockResolvedValueOnce(user);
      const returnedUser = await authService.signup(userDTO);
      expect(returnedUser.user.id).toEqual(user.id);
      expect(returnedUser.user.email).toEqual(user.email);
      expect(returnedUser.user.password).toBeDefined();
      expect(returnedUser.token).toBeDefined();
      expect(mockedAuthPersistance.addUser).toHaveBeenCalled();
    });
  });

  describe('LOGIN', () => {
    it('should return the user and token if the user\'s credentials are correct', async () => {
      const userDTO = {...userDtos[0] };
      const user = new User({ ...userDTO, password: bcrypt.hashSync(userDTO.password, 10) });
      const userCredential = { email: user.email, password: userDTO.password };
      mockedAuthPersistance.getUserByEmail.mockResolvedValueOnce(user);
      const returnedUser = await authService.login(userCredential);
      expect(returnedUser.user.id).toEqual(user.id);
      expect(returnedUser.user.email).toEqual(user.email);
      expect(returnedUser.token).toBeDefined();
      expect(mockedAuthPersistance.getUserByEmail).toHaveBeenCalledWith(user.email);
    });

    it('should throw an error if the user\'s credentials are incorrect', async () => {
      const userDTO = userDtos[0];
      const user = new User({ ...userDTO, password: bcrypt.hashSync(userDTO.password, 10) });
      const userCredential = { email: user.email, password: 'wrongpassword' };
      mockedAuthPersistance.getUserByEmail.mockResolvedValueOnce(user);
      await expect(authService.login(userCredential)).rejects.toThrow();
    });

    it('should throw an error if the user doesn\'t exist', async () => {
      mockedAuthPersistance.getUserByEmail.mockResolvedValueOnce(null);
      await expect(authService.login(userDtos[0])).rejects.toThrow();
    });
  });
});
