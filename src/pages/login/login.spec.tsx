import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPages from "./login";

describe("login page", () => {
  it("should render with required fields", () => {
    render(<LoginPages />);
    // getby -> throws an error
    // findBy-> async /api check the data aa rha hai ya nhi
    // queryby -> null isko ham jab use krte hai jab hamara koi element thode time ke baad screen se hat jaye jaise loading element
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button",{name:"Log in"})).toBeInTheDocument()
    expect(screen.getByRole("checkbox",{name:"Remember me"})).toBeInTheDocument();
    expect(screen.getByText('Forget password')).toBeInTheDocument()
  });
});
