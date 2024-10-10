import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UsersList from "./UsersList";

jest.mock("./user/User", () => ({ user }) => <div>{user.name}</div>);

const mockStore = configureStore([]);

const users = [
  {
    _id: "1",
    name: "Test User 1",
    email: "test1@example.com",
    usedSpace: 52428800,
    diskSpace: 104857600,
    status: "standard",
  },
  {
    _id: "2",
    name: "Test User 2",
    email: "test2@example.com",
    usedSpace: 209715200,
    diskSpace: 524288000,
    status: "premium",
  },
];

let store;

beforeEach(() => {
  store = mockStore({
    users: users,
  });
  store.dispatch = jest.fn();
});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <UsersList users={users} fetchUsers={jest.fn()} />
    </Provider>
  );

describe("UsersList Component", () => {
  test("renders UsersList without crashing", () => {
    const { asFragment } = renderComponent();
    expect(screen.getByText("Test User 1")).toBeInTheDocument();
    expect(screen.getByText("Test User 2")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays headers correctly", () => {
    renderComponent();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/used space/i)).toBeInTheDocument();
  });

  test('displays message when no users are present', () => {
    render(
      <Provider store={store}>
        <UsersList users={[]} fetchUsers={jest.fn()} />
      </Provider>
    );
    
    expect(screen.getByTestId("noUsersMessage")).toBeInTheDocument();
  });
});