import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

export async function createSubscription(
  subscriptionId: string,
  customerId: string
) {
  const userRef = await getUserFromFaunadb(customerId);
  const subscriptionData = await createSubscriptionData(
    subscriptionId,
    userRef
  );

  await fauna.query(
    q.Create(q.Collection('subscriptions'), { data: subscriptionData })
  );
}

export async function replaceSubscription(
  subscriptionId: string,
  customerId: string
) {
  const userRef = await getUserFromFaunadb(customerId);
  const subscriptionData = await createSubscriptionData(
    subscriptionId,
    userRef
  );

  await fauna.query(
    q.Replace(
      q.Select(
        'ref',
        q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))
      ),
      { data: subscriptionData }
    )
  );
}

async function createSubscriptionData(subscriptionId: string, userRef: object) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id
  };
  return subscriptionData;
}

async function getUserFromFaunadb(customerId: string) {
  return await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId))
    )
  );
}
