import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import '../styles/global.scss';

interface AuthProps {
  session: Session;
}

function MyApp({ Component, pageProps }: AppProps<AuthProps>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
