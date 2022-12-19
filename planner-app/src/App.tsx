import React from 'react';
import { Authentication } from "./components/authentication";
import { Signin } from "./components/signin";
import { Signup } from "./components/signup";
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from "./helpers/constants";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Authentication><Signin/></Authentication>
    },
    {
      path: "/signin",
      element: <Authentication><Signin/></Authentication>
    },
    {
      path: "/signup",
      element: <Authentication><Signup/></Authentication>
    }
  ])

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <RouterProvider router={route} />
      </ChakraProvider>
    </div>
  );
}

export default App;
