import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Header from "../../../src/layout/Header";

describe("Header Component", () => {
  const renderHeader = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

  test("renders the header with logo and title", () => {
    renderHeader();
    const logo = screen.getByAltText("Formula 1 Logo");
    expect(logo).toBeInTheDocument();

    const title = screen.getByText("Formula One Pit Wall");
    expect(title).toBeInTheDocument();
  });

  test("toggles the navigation pane when the hamburger icon is clicked", async () => {
    renderHeader();

    const navPane = screen.getByRole("navigation");
    expect(navPane).not.toHaveClass("App-side-pane open");

    const toggleButton = screen.getByRole("button", {
      name: "Toggle navigation pane",
    });
    await userEvent.click(toggleButton);
    expect(navPane).toHaveClass("App-side-pane open");

    const closeButton = screen.getByRole("button", {
      name: "Close navigation pane",
    });
    await userEvent.click(closeButton);
    expect(navPane).not.toHaveClass("App-side-pane open");
  });

  test("closes the pane when a link is clicked", async () => {
    renderHeader();
    const toggleButton = screen.getByRole("button", {
      name: "Toggle navigation pane",
    });
    await userEvent.click(toggleButton);

    const homeLink = screen.getByText("Home");
    await userEvent.click(homeLink);

    const navPane = screen.getByRole("navigation");
    expect(navPane).not.toHaveClass("App-side-pane open");
  });

  test("closes the pane when clicking outside of it", async () => {
    renderHeader();

    const toggleButton = screen.getByRole("button", {
      name: "Toggle navigation pane",
    });
    await userEvent.click(toggleButton);

    const navPane = screen.getByRole("navigation");
    expect(navPane).toHaveClass("App-side-pane open");

    await userEvent.click(document.body);

    expect(navPane).not.toHaveClass("App-side-pane open");
  });

  test("opens and closes the pane on repeated clicks", async () => {
    renderHeader();

    const navPane = screen.getByRole("navigation");
    const toggleButton = screen.getByRole("button", {
      name: "Toggle navigation pane",
    });

    await userEvent.click(toggleButton);
    expect(navPane).toHaveClass("App-side-pane open");

    await userEvent.click(toggleButton);
    expect(navPane).toHaveClass("App-side-pane");
  });
});
