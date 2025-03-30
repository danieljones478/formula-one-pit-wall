import React from "react";
import { render, screen } from "@testing-library/react";
import SkeletonLoader from "../../../src/components/SkeletonLoader";

describe("SkeletonLoader Component", () => {
  test("renders the correct number of skeleton lines", () => {
    render(<SkeletonLoader lines={3} />);

    const skeletonLines = screen
      .getAllByRole("status", { hidden: true })[0]
      .querySelectorAll(".skeleton-line");
    expect(skeletonLines).toHaveLength(3);
  });
});
