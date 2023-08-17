// app/providers.tsx
"use client";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }) {
  return (
    <ReduxProvider store={store}>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </ReduxProvider>
  );
}
