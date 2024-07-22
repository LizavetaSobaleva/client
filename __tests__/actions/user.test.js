import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { instanceAxios, registration, login, auth, uploadAvatar, deleteAvatar } from '../../src/actions/user';
import { setUser } from '../../src/reducers/userReducer';

describe('User Actions', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(instanceAxios);
    Storage.prototype.setItem = jest.fn(); // Mock localStorage.setItem
  });

  afterEach(() => {
    if (mock) {
      mock.restore();
    }
    Storage.prototype.setItem.mockClear(); // Clear mock
  });

  test('registration action', async () => {
    const mockData = { user: { email: 'test@example.com' }, token: 'token123' };
    mock.onPost('auth/registration').reply(200, mockData);

    const dispatch = jest.fn();
    await registration('test', 'test@example.com', 'password', dispatch);

    expect(dispatch).toHaveBeenCalledWith(expect.any(Function)); // Login is called after registration
  });

  test('login action', async () => {
    const mockData = { user: { email: 'test@example.com' }, token: 'token123' };
    mock.onPost('auth/login').reply(200, mockData);

    const dispatch = jest.fn();
    await login('test@example.com', 'password')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setUser(mockData.user));
    expect(localStorage.setItem).toHaveBeenCalledWith('token', mockData.token);
  });

  test('auth action', async () => {
    const mockData = { user: { email: 'test@example.com' }, token: 'token123' };
    mock.onGet('auth/auth').reply(200, mockData);

    const dispatch = jest.fn();
    await auth()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setUser(mockData.user));
    expect(localStorage.setItem).toHaveBeenCalledWith('token', mockData.token);
  });

  test('uploadAvatar action', async () => {
    const mockData = { email: 'test@example.com', avatar: 'avatar.jpg' };
    mock.onPost('files/avatar').reply(200, mockData);

    const dispatch = jest.fn();
    const file = new Blob(['file content'], { type: 'image/jpeg' });
    await uploadAvatar(file)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setUser(mockData));
  });

  test('deleteAvatar action', async () => {
    const mockData = { email: 'test@example.com', avatar: null };
    mock.onDelete('files/avatar').reply(200, mockData);

    const dispatch = jest.fn();
    await deleteAvatar()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setUser(mockData));
  });
});
