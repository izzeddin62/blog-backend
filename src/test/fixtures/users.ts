import { User, UserProperties } from '../../services/user/User';

export const userDtos: UserProperties[] = [
  {
    email: 'test@test.com',
    password: 'password',
    id: 1,
  },
  {
    email: 'another@test.com',
    password: 'anotherpassword',
    id: 2,
  },
  {
    email: 'example@test.com',
    password: 'examplepassword',
    id: 3,
  },
  {
    email: 'user1@test.com',
    password: 'user1password',
    id: 4,
  },
  {
    email: 'user2@test.com',
    password: 'user2password',
    id: 5,
  },
  {
    email: 'user3@test.com',
    password: 'user3password',
    id: 6,
  },
  {
    email: 'user4@test.com',
    password: 'user4password',
    id: 7,
  },
  {
    email: 'user5@test.com',
    password: 'user5password',
    id: 8,
  },
];

export const users = userDtos.map((user) => new User(user));
