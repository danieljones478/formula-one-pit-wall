import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../../../src/components/Modal";

describe("Modal Component", () => {
  test("renders when isVisible is true", () => {
    render(
      <Modal isVisible={true} onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>,
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("does not render when isVisible is false", () => {
    render(
      <Modal isVisible={false} onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>,
    );

    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });

  test("calls onClose when the close button is clicked", async () => {
    const onCloseMock = jest.fn();

    render(
      <Modal isVisible={true} onClose={onCloseMock}>
        <p>Modal Content</p>
      </Modal>,
    );

    const closeButton = screen.getByRole("button", { name: "Enter" });
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
