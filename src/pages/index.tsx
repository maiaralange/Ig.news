import Head from 'next/head';
import { Header } from '../components/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <Header />
    </>
  );
}
