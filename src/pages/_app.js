import "@/styles/globals.css";
import { DataProvider } from "./context";

export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}
