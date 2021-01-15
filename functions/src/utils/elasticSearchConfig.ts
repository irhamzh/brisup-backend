import { Client } from '@elastic/elasticsearch';

import { ES_NODE } from '@constants/config';

const client = new Client({ node: ES_NODE });

function indices() {
  return client.cat
    .indices({ v: true, format: 'string' })
    .then(console.log)
    .catch((err) => console.error(`Error connecting to the es client: ${err}`));
}

export function verify() {
  indices();
}
export default client;
