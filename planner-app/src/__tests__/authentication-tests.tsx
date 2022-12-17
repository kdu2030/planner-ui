import { Authentication } from "../components/authentication";
import { Signup } from "../components/signup";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

it("Signup Empty", async () => {
    const { queryByText } = render(
        <MemoryRouter>
            <Authentication>
                <Signup />
            </Authentication>
        </MemoryRouter>
    );
    const submit = queryByText("Create Account");
    if (!submit) {
        return;
    }
    await act(() => {
        fireEvent.click(submit);
    })
    const fieldNames = ["Username", "Email", "Password"];
    fieldNames.forEach((fieldName) => {
        const errorNode = queryByText(`${fieldName} is required.`);
        expect(errorNode).toBeTruthy();
    });
    const confirmPassword = queryByText("Please type your password again.");
    expect(confirmPassword).toBeTruthy();
})

it("Signup Misformatted Email", async () => {
    const { queryByPlaceholderText, queryByText } = render(
        <MemoryRouter>
            <Authentication>
                <Signup />
            </Authentication>
        </MemoryRouter>
    );
    const submit = queryByText("Create Account");
    const emailInput = queryByPlaceholderText("Email");
    const usernameInput = queryByPlaceholderText("Username");
    const passwordInput = queryByPlaceholderText("Password");
    const confirmPasswordInput = queryByPlaceholderText("Confirm Password")
    if (!submit || !emailInput || !usernameInput || !passwordInput || !confirmPasswordInput) {
        fail("Inputs or submit button not found");
    }
    await act(() => {
        fireEvent.change(usernameInput, {target: {value: "testUser"}});
        fireEvent.change(emailInput, {target: {value: "email"}});
        fireEvent.change(passwordInput, {target: {value: "testPass"}});
        fireEvent.change(confirmPasswordInput, {target: {value: "testPass"}});
        fireEvent.click(submit);
    })
    const confirmPassword = queryByText("Email must be formatted correctly.");
    expect(confirmPassword).toBeTruthy();
});

it("Signup Mismatched Passwords", async () => {
    const { queryByPlaceholderText, queryByText } = render(
        <MemoryRouter>
            <Authentication>
                <Signup />
            </Authentication>
        </MemoryRouter>
    );
    const submit = queryByText("Create Account");
    const emailInput = queryByPlaceholderText("Email");
    const usernameInput = queryByPlaceholderText("Username");
    const passwordInput = queryByPlaceholderText("Password");
    const confirmPasswordInput = queryByPlaceholderText("Confirm Password")
    if (!submit || !emailInput || !usernameInput || !passwordInput || !confirmPasswordInput) {
        fail("Inputs or submit button not found");
    }
    await act(() => {
        fireEvent.change(usernameInput, {target: {value: "testUser"}});
        fireEvent.change(emailInput, {target: {value: "testEmail@test.com"}});
        fireEvent.change(passwordInput, {target: {value: "testPass"}});
        fireEvent.change(confirmPasswordInput, {target: {value: "testPass1"}});
        fireEvent.click(submit);
    });
    const confirmPassword = queryByText("Passwords must match.");
    expect(confirmPassword).toBeTruthy();
});

it("Signup Normal", async () => {
    const { queryByPlaceholderText, queryByText } = render(
        <MemoryRouter>
            <Authentication>
                <Signup />
            </Authentication>
        </MemoryRouter>
    );
    const submit = queryByText("Create Account");
    const emailInput = queryByPlaceholderText("Email");
    const usernameInput = queryByPlaceholderText("Username");
    const passwordInput = queryByPlaceholderText("Password");
    const confirmPasswordInput = queryByPlaceholderText("Confirm Password")
    if (!submit || !emailInput || !usernameInput || !passwordInput || !confirmPasswordInput) {
        fail("Inputs or submit button not found");
    }
    await act(() => {
        fireEvent.change(usernameInput, {target: {value: "testUser"}});
        fireEvent.change(emailInput, {target: {value: "testEmail@test.com"}});
        fireEvent.change(passwordInput, {target: {value: "testPass"}});
        fireEvent.change(confirmPasswordInput, {target: {value: "testPass"}});
        fireEvent.click(submit);
    });
    const fieldNames = ["Username", "Email", "Password"];
    fieldNames.forEach((fieldName) => {
        const errorNode = queryByText(`${fieldName} is required.`);
        expect(errorNode).toBeFalsy();
        if(fieldName === "Email"){
            const emailErrorNode = queryByText(`Email must be formatted correctly`);
            expect(emailErrorNode).toBeFalsy();
        }
    });
    const confirmPassword = queryByText("Please type your password again.");
    expect(confirmPassword).toBeFalsy();
});
