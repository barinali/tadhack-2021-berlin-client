const got = require('got');
const AWA_API_URL = 'https://awa.network/api';
const API_URL = `${AWA_API_URL}/routing/simulation?withoutIncurringCost=false&currency=USD`;

module.exports = async (req, res) => {
  console.log('req', req)

  try {
    const body = await got.post(API_URL, {
      body: req.body,
      searchParams: req.query,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,PATCH,DELETE',
        'Access-Control-Allow-Credentials': 'true',
        Authorization: req.headers.Authorization,
      }
    }).json();

    res.status(200).send(body);
  } catch (err) {
    console.error(err);

    res.status(500).send(String(err));
  }
};
