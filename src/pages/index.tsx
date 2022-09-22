import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { formatCurrency } from '../formatter';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const subscriptionKey = 'price_1LkpIoG7033UDVtVSYTEHbZ7';
  const price = await stripe.prices.retrieve(subscriptionKey);
  const product = {
    priceId: price.id,
    amount: formatCurrency(price.unit_amount / 100)
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
};
