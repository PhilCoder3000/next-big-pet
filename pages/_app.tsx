import type { AppProps } from 'next/app';
import { Layout } from '../src/widgets/Layout';
import '../styles/globals.css';
import '../styles/variables.css';
import '../src/models/init';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
