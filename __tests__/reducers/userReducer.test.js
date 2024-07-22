import userReducer, { setUser, logout } from '../../src/reducers/userReducer';

describe('userReducer', () => {
  const initialState = {
    currentUser: {},
    isAuth: false,
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_USER', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    const action = setUser(user);
    const expectedState = {
      currentUser: user,
      isAuth: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT', () => {
    const loggedInState = {
      currentUser: { name: 'John Doe', email: 'john@example.com' },
      isAuth: true,
    };
    const action = logout();
    const expectedState = {
      currentUser: {},
      isAuth: false,
    };

    expect(userReducer(loggedInState, action)).toEqual(expectedState);
  });
});
