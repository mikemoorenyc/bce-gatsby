import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import LandingHeader from "./index"

describe("Header renders with copy", () => {
    it("renders with plain bottom copy", () => {
      const container = render(<LandingHeader pageTitle="Test title"  copy={"test copy"}/>)
      const h1 = screen.getByText("Test title");
      const copy = screen.getByText("test copy");
      expect(h1).toBeTruthy();
      expect(copy).toBeTruthy();
    })
    it("renders with rich text copy", () => {
        const container = render(<LandingHeader pageTitle="Test title"  copy={`<b data-testid="bold-text">This is bold copy</b>`}/>)
        const h1 = screen.getByText("Test title");
        const boldCopy = screen.getByTestId("bold-text");
        expect(h1).toBeTruthy();
        expect(boldCopy).toBeTruthy();
    })
})