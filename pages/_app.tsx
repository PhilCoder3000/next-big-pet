import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Layout } from '../src/widgets/Layout';
import '../styles/globals.css';
import '../styles/variables.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
