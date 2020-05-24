import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders min/km label", () => {
  const { getByText } = render(<App />);
  const paceLabel = getByText(/min\/km/);
  expect(paceLabel).toBeInTheDocument();
});
