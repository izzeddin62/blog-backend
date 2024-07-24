import { User } from '../../../src/services/user/User';
import { userDtos } from '../../fixtures/users';

describe('User', () => {
  it('should create a user', () => {
    const user = userDtos[0];
    const newUser = new User(user);
    expect(newUser).toBeInstanceOf(User);
  });

});