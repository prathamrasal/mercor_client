import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import React from "react";
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </QueryClientProvider>
  );
}
