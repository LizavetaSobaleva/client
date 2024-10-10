import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import User from "./User";
import { changeUserStatus } from "../../../../actions/user";

jest.mock("../../../../actions/user", () => ({
  changeUserStatus: jest.fn().mockReturnValue({ type: "CHANGE_USER_STATUS" }),
}));

const mockStore = configureStore([]);

const user = {
  _id: "1",
  name: "Test User",
  email: "test@example.com",
  usedSpace: 52428800,
  diskSpace: 104857600,
  status: "standard",
};

let store;

beforeEach(() => {
  store = mockStore({
    user: { users: [user] }
  });
  store.dispatch = jest.fn();
});

const renderComponent = (user) =>
  render(
    <Provider store={store}>
      <User user={user} fetchUsers={() => {}} />
    </Provider>
  );

describe("User Component", () => {
  test("renders user name and email", () => {
    renderComponent(user);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  test("renders user status", () => {
    renderComponent(user);
    expect(screen.getByText("standard")).toBeInTheDocument();
  });

  test("renders used space and disk space", () => {
    renderComponent(user);
    expect(screen.getByText("50.0 Mb from 100.0 Mb")).toBeInTheDocument();
  });

  test("displays selector when editing status", () => {
    renderComponent(user);
    fireEvent.click(screen.getByTestId("editButton"));
    expect(screen.getByTestId("statusSelector")).toBeInTheDocument();
  });

  test("calls changeUserStatus on save", async () => {
    renderComponent(user);
    fireEvent.click(screen.getByTestId("editButton"));
    fireEvent.click(screen.getByTestId("selector-trigger"));
    fireEvent.click(screen.getByTestId("selector-option-premium"));
    fireEvent.click(screen.getByTestId("saveButton"));
    expect(changeUserStatus).toHaveBeenCalledWith("1", "premium");
  });
});