import { Authentication } from "../components/authentication";
import { Signup } from "../components/signup";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { Signin } from "../components/signin";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>

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
        fireEvent.change(usernameInput, { target: { value: "testUser" } });
        fireEvent.change(emailInput, { target: { value: "email" } });
        fireEvent.change(passwordInput, { target: { value: "testPass" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "testPass" } });
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
        fireEvent.change(usernameInput, { target: { value: "testUser" } });
        fireEvent.change(emailInput, { target: { value: "testEmail@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "testPass" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "testPass1" } });
        fireEvent.click(submit);
    });
    const confirmPassword = queryByText("Passwords must match.");
    expect(confirmPassword).toBeTruthy();
});

test("Signup Username Already Exists", async () => {
    mockedAxios.post.mockResolvedValue({
        data: {
            "result": "User with username exists"
        }
    });

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
        fireEvent.change(usernameInput, { target: { value: "testUser" } });
        fireEvent.change(emailInput, { target: { value: "testEmail@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "testPass" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "testPass" } });
        fireEvent.click(submit);
    });
    const userExistsError = queryByText("A user with this username already exists.");
    expect(userExistsError).toBeTruthy();
})

test("Signup Email Already Exists", async () => {
    mockedAxios.post.mockResolvedValue({
        data: {
            "result": "User with email exists"
        }
    });

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
        fireEvent.change(usernameInput, { target: { value: "testUser" } });
        fireEvent.change(emailInput, { target: { value: "testEmail@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "testPass" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "testPass" } });
        fireEvent.click(submit);
    });
    const userExistsError = queryByText("A user with this email already exists.");
    expect(userExistsError).toBeTruthy();
})



it("Signup Normal", async () => {
    mockedAxios.post.mockResolvedValue({
        data: {
            "result": "User created successfully",
            "username": "testUser",
            "email": "test@test.com",
            "profileImage": "profile.png",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6InN0cmluZyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN0cmluZyIsImV4cCI6MTY3Mjc4MTgzNSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA3NCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.ir2jpZlOAYudDoaXgGTeUP3UWRH84_TUZ-_OEYIm70Q"
        }
    });

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
        fireEvent.change(usernameInput, { target: { value: "testUser" } });
        fireEvent.change(emailInput, { target: { value: "testEmail@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "testPass" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "testPass" } });
        fireEvent.click(submit);
    });
    const fieldNames = ["Username", "Email", "Password"];
    fieldNames.forEach((fieldName) => {
        const errorNode = queryByText(`${fieldName} is required.`);
        expect(errorNode).toBeFalsy();
        if (fieldName === "Email") {
            const emailErrorNode = queryByText(`Email must be formatted correctly`);
            expect(emailErrorNode).toBeFalsy();
        }
    });
    const confirmPassword = queryByText("Please type your password again.");
    expect(confirmPassword).toBeFalsy();
});

test("Signin Empty", async () => {
    const { queryByText } = render(
        <MemoryRouter>
            <Authentication>
                <Signin />
            </Authentication>
        </MemoryRouter>
    );

    const submitButton = queryByText("Sign In");
    if (!submitButton) {
        fail("Submit Button not found");
    }
    await act(() => {
        fireEvent.click(submitButton);
    })
    const emailMissing = queryByText("Email is required.");
    const passwordMissing = queryByText("Password is required.");
    expect(emailMissing).toBeTruthy();
    expect(passwordMissing).toBeTruthy();
});

test("Signin Misformatted Email", async () => {
    const { queryByText, queryByPlaceholderText } = render(
        <MemoryRouter>
            <Authentication>
                <Signin />
            </Authentication>
        </MemoryRouter>
    );

    const submitButton = queryByText("Sign In");
    const emailInput = queryByPlaceholderText("Email");
    const passwordInput = queryByPlaceholderText("Password");
    
    if(!submitButton || !emailInput || !passwordInput){
        fail("Components are missing");
    }

    await act(() => {
        fireEvent.change(emailInput, {target: {value: "test"}});
        fireEvent.change(passwordInput, {target: {value: "test"}});
        fireEvent.click(submitButton);
    })
    const emailError = queryByText("Email must be formatted correctly.");
    expect(emailError).toBeTruthy();
})


test("Signin User Does Not Exist", async () => {
    mockedAxios.post.mockResolvedValue({
        data: {
            "result": "User Not Found"
        }
    });
 
    const { queryByText, queryByPlaceholderText} = render(
        <MemoryRouter>
            <Authentication>
                <Signin />
            </Authentication>
        </MemoryRouter>
    );

    const submitButton = queryByText("Sign In");
    const emailInput = queryByPlaceholderText("Email");
    const passwordInput = queryByPlaceholderText("Password");
    
    if(!submitButton || !emailInput || !passwordInput){
        fail("Components are missing");
    }

    await act(() => {
        fireEvent.change(emailInput, {target: {value: "test@test.com"}});
        fireEvent.change(passwordInput, {target: {value: "test"}});
        fireEvent.click(submitButton);
    })
    const emailError = queryByText("A user with this email does not exist.");
    expect(emailError).toBeTruthy();
})

test("Signin Incorrect Password", async () => {
    mockedAxios.post.mockResolvedValue({
        data: {
            "result": "Incorrect password"
        }
    });
 
    const { queryByText, queryByPlaceholderText} = render(
        <MemoryRouter>
            <Authentication>
                <Signin />
            </Authentication>
        </MemoryRouter>
    );

    const submitButton = queryByText("Sign In");
    const emailInput = queryByPlaceholderText("Email");
    const passwordInput = queryByPlaceholderText("Password");
    
    if(!submitButton || !emailInput || !passwordInput){
        fail("Components are missing");
    }

    await act(() => {
        fireEvent.change(emailInput, {target: {value: "test@test.com"}});
        fireEvent.change(passwordInput, {target: {value: "test"}});
        fireEvent.click(submitButton);
    })
    const passwordError = queryByText("Your password is incorrect.");
    expect(passwordError).toBeTruthy();
})

test("Signin Normal", async () => {
    mockedAxios.post.mockResolvedValue({
        data: {
            "result": "User created successfully",
            "username": "testUser",
            "email": "test@test.com",
            "profileImage": "profile.png",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6InN0cmluZyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN0cmluZyIsImV4cCI6MTY3Mjc4MTgzNSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA3NCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.ir2jpZlOAYudDoaXgGTeUP3UWRH84_TUZ-_OEYIm70Q"
        }
    });


    const { queryByText, queryByPlaceholderText} = render(
        <MemoryRouter>
            <Authentication>
                <Signin />
            </Authentication>
        </MemoryRouter>
    );

    const submitButton = queryByText("Sign In");
    const emailInput = queryByPlaceholderText("Email");
    const passwordInput = queryByPlaceholderText("Password");
    
    if(!submitButton || !emailInput || !passwordInput){
        fail("Components are missing");
    }

    await act(() => {
        fireEvent.change(emailInput, {target: {value: "test@test.com"}});
        fireEvent.change(passwordInput, {target: {value: "test"}});
        fireEvent.click(submitButton);
    })
    const emailError = queryByText("A user with this email does not exist.");
    const passwordError = queryByText("Your password is incorrect.");
    expect(emailError).toBeFalsy();
    expect(passwordError).toBeFalsy();
})




