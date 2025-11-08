import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/store";
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => router.push(to)}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ClerkProvider>
  );
}

export default MyApp;
