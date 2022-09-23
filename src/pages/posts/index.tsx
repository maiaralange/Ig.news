import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>23 de setembro de 2022</time>
            <strong>Aqui vai o título</strong>
            <p>Aqui vai o parágrafo</p>
          </a>
          <a href="#">
            <time>23 de setembro de 2022</time>
            <strong>Aqui vai o título</strong>
            <p>Aqui vai o parágrafo</p>
          </a>
          <a href="#">
            <time>23 de setembro de 2022</time>
            <strong>Aqui vai o título</strong>
            <p>Aqui vai o parágrafo</p>
          </a>
          <a href="#">
            <time>23 de setembro de 2022</time>
            <strong>Aqui vai o título</strong>
            <p>Aqui vai o parágrafo</p>
          </a>
        </div>
      </main>
    </>
  );
}
