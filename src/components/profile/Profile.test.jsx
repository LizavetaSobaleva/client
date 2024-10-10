import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import configureStore from "redux-mock-store";
import Profile from "./Profile";
import { uploadAvatar, deleteAvatar, getAllUsers } from "../../actions/user";
import { logout } from "../../reducers/userReducer";

jest.mock("../../actions/user", () => ({
  uploadAvatar: jest.fn(() => ({ type: "SET_USER" })),
  deleteAvatar: jest.fn(() => ({ type: "SET_USER" })),
  getAllUsers: jest.fn(() => Promise.resolve([{ id: 1, name: "Test User" }])),
}));

jest.mock("../../reducers/userReducer", () => ({
  logout: jest.fn(() => ({ type: "LOGOUT" })),
}));

const mockStore = configureStore([]);

let store;

beforeEach(() => {
  store = mockStore({
    user: {
      currentUser: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        avatar: null,
        usedSpace: 52428800,
        diskSpace: 104857600,
        status: "standard",
      },
    },
  });
  store.dispatch = jest.fn();
});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    </Provider>
  );
describe("UsersList Component", () => {
  test("renders profile component without crashing", () => {
    const { asFragment } = renderComponent();
    expect(screen.getByTestId("profile")).toBeInTheDocument();
    expect(screen.getByTestId("profile-avatar")).toBeInTheDocument();
    expect(screen.getByTestId("profile-name")).toHaveTextContent("Test User");
    expect(screen.getByTestId("profile-status")).toHaveTextContent("standard");
    expect(screen.getByTestId("profile-email")).toHaveTextContent(
      "test@example.com"
    );
    expect(screen.getByTestId("profile-used-space")).toHaveTextContent("50.0 Mb from 100.0 Mb");
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders upload avatar button when no avatar is present", () => {
    renderComponent();

    const uploadButton = screen.getByTestId("upload-avatar-btn");
    expect(uploadButton).toBeInTheDocument();
    fireEvent.click(uploadButton);

    const fileInput = screen.getByTestId("avatar-input");
    expect(fileInput).toBeInTheDocument();
    fireEvent.change(fileInput, {
      target: {
        files: [new File(["avatar"], "avatar.png", { type: "image/png" })],
      },
    });

    expect(store.dispatch).toHaveBeenCalledWith(uploadAvatar(expect.any(File)));
  });

  test("renders delete avatar button when avatar is present", () => {
    store = mockStore({
      user: {
        currentUser: {
          id: "1",
          name: "Test User",
          email: "test@example.com",
          avatar: "avatar.png",
          usedSpace: 52428800,
          diskSpace: 104857600,
          status: "standard",
        },
      },
    });

    renderComponent();

    const deleteButton = screen.getByTestId("delete-avatar-btn");
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    expect(deleteAvatar).toHaveBeenCalledWith();
  });

  test("renders users list if current user is admin", async () => {
    store = mockStore({
      user: {
        currentUser: {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          avatar: null,
          usedSpace: 209715200,
          diskSpace: 524288000,
          status: "admin",
        },
      },
    });

    renderComponent();

    const usersList = await screen.findByTestId("usersList");
    expect(usersList).toBeInTheDocument();
    expect(getAllUsers).toHaveBeenCalled();
  });

  test("logs out when logout button is clicked", () => {
    renderComponent();

    const logoutButton = screen.getByTestId("logout-btn");
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);

    expect(logout).toHaveBeenCalledWith();
  });
});
