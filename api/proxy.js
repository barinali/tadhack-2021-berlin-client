const got = require('got');
const AWA_API_URL = 'https://awa.network/api';
const API_URL = `${AWA_API_URL}/routing/simulation`;

export default async (req, res) => {
  console.log('req', req)

  const options = {
    json: req.body,
    searchParams: {
      withoutIncurringCost: 'true',
      currency: 'USD',
      ...req.query
    },
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,PATCH,DELETE',
      Authorization: req.headers.authorization,
    }
  };

  try {
    const body = await got.post(API_URL, options).json();

    res.status(200).send(body);
  } catch (err) {
    console.error(err.response);

    res.status(500).send(err.response.body);
  }
};