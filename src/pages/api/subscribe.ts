import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { fauna } from '../../services/fauna';
import { stripe } from '../../services/stripe';

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const session = await getSession({ req: request });
    const user = await getUserFromFaunadb(session);

    const customerId =
      user.data.stripe_customer_id ||
      (await createCustomerInStripe(session, user));

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      customer: customerId,
      line_items: [
        {
          price: process.env.STRIPE_PRODUCT_ID,
          quantity: 1
        }
      ]
    });

    return response.status(200).json({ sessionId: checkoutSession.id });
  } else {
    response.setHeader('Allow', 'POST');
    return response.status(405).end('Method not allowed');
  }
};

async function getUserFromFaunadb(session) {
  return await fauna.query<User>(
    q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
  );
}

async function createCustomerInStripe(session, user: User) {
  const customer = await stripe.customers.create({
    email: session.user.email
    // metadata:
  });

  await fauna.query(
    q.Update(q.Ref(q.Collection('users'), user.ref.id), {
      data: {
        stripe_customer_id: customer.id
      }
    })
  );

  return customer.id;
}
