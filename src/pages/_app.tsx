import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { useApollo } from "../../lib/apolloClient";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
