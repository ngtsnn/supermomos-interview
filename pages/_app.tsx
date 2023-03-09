import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Container } from "src/container";
import { Header } from "@components/header";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider
          toastOptions={{ defaultOptions: { duration: 4000, isClosable: true, position: "top" } }}
        >
          <Container>
            <Header />
            <Component {...pageProps} />
          </Container>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
