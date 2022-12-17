import React from 'react';
import { FormikSignup } from "./components/formik-signup";
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from "./helpers/theme";

function App() {

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <FormikSignup />
      </ChakraProvider>
    </div>
  );
}

export default App;
