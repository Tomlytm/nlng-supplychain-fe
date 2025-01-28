import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { registerLicense } from "@syncfusion/ej2-base";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import { OnboardingProvider } from "@/context/OnboardingContext";

const key = process.env.NEXT_PUBLIC_SYNC_KEY;
registerLicense(key as string);

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutNeeded = router.pathname === "/";

  return (
    <ChakraProvider>
      <OnboardingProvider>
        <main className={inter.className}>
          {noLayoutNeeded ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </main>
      </OnboardingProvider>
    </ChakraProvider>
  );
}
