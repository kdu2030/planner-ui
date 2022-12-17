
import { extendTheme } from "@chakra-ui/react";

export const green = {
    50: '#e6f9eb',
    100: '#c8e7ce',
    200: '#a8d5b2',
    300: '#87c493',
    400: '#66b375',
    500: '#4d995c',
    600: '#3b7746',
    700: '#295532',
    800: '#16341d',
    900: '#001302',
  }

  export const theme = extendTheme({
    colors: {
        brand: {...green}
    }
  })