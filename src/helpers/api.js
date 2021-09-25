import ky from 'ky';

// need to be refreshed every 10 hours
const AWA_ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOa001UFNMeVlUblBPZkJwV3Y0aHV2bV9EcXh1d29QMzk3eE9BY2p1c2tNIn0.eyJleHAiOjE2MzI2MTMzNzQsImlhdCI6MTYzMjU3NzM3NSwiYXV0aF90aW1lIjoxNjMyNTc3Mzc0LCJqdGkiOiI5MzU5NGIwNS0wY2EwLTRkZGItOWJiNS1iNjJkMmQ4NWJlZjIiLCJpc3MiOiJodHRwczovL2F3YS5uZXR3b3JrL2F1dGgvcmVhbG1zL3Byb2QiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNTQ1ZTUxNTktMjJlMC00NjU2LWIzNWMtODY2MmE1OGExNmM0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmVybGludGVhbTMiLCJzZXNzaW9uX3N0YXRlIjoiNzU5YzlmM2UtNGI0NS00ODA0LWJmZTAtMzYwYWE3YmMxOTA0IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtcHJvZCIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6Ijc1OWM5ZjNlLTRiNDUtNDgwNC1iZmUwLTM2MGFhN2JjMTkwNCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYmVybGludGVhbTMifQ.AjDP-4NkTnFUmOVBAbKK7gma-PkDF1UNPsfLDhkQCdM-Ms2fFPjF20IOfaVulrYM6-ynzYApBPrRcirw5jhFLy3gh5cfAWZIt8-f6khhFBQx2OcEH4LjcVb7DBYM_gbLEnPSqD6oQk9bgvgxQk9ku2btP8SFKBJgRk_byQ2TrxzKGTUD55PDqvaG_EinOBaJAP1GlFIyjREBc1aGDpJ6wkFTxrfDKDlzKQI2nHP8ewQpecZSSjd7PShMxuELyqzasjJ4-CZztQZdbIfVbnKlkrcPAs6UtTRJtq-bxbllxtqOFxp7ESU6y_7Y2Rl5LfqSN5NbbapkWhYQl8wOl7uQMg';

export const simulateNumbers = async (numbers = []) => {
  const response = await ky.post('/api/proxy', {
    searchParams: {
      withoutIncurringCost: 'true',
      currency: 'USD',
    },
    headers: {
      authorization: `Bearer ${AWA_ACCESS_TOKEN}`
    },
    json: numbers,
    retry: {
      limit: 3,
      methods: ['post'],
      statusCodes: [500],
    }
  });

  try {
    return response.json();
  } catch (err) {
    console.error(err);
    return {};
  }
};