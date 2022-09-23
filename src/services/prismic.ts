import * as prismic from '@prismicio/client';

const endpoint = prismic.getRepositoryEndpoint(
  process.env.PRISMIC_REPOSITORY_NAME
);

export function getPrismicClient() {
  return prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  });
}
