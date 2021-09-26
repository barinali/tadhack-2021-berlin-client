import ky from 'ky';

// need to be refreshed every 10 hours
const AWA_ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOa001UFNMeVlUblBPZkJwV3Y0aHV2bV9EcXh1d29QMzk3eE9BY2p1c2tNIn0.eyJleHAiOjE2MzI2Nzk5NDQsImlhdCI6MTYzMjY0Mzk4NywiYXV0aF90aW1lIjoxNjMyNjQzOTQ0LCJqdGkiOiI1YTVjZmFhMy04NzY2LTRiZmUtYTFhNi1lMTkxYTRiMDhjZTUiLCJpc3MiOiJodHRwczovL2F3YS5uZXR3b3JrL2F1dGgvcmVhbG1zL3Byb2QiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNTQ1ZTUxNTktMjJlMC00NjU2LWIzNWMtODY2MmE1OGExNmM0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmVybGludGVhbTMiLCJzZXNzaW9uX3N0YXRlIjoiNWNjYTdiNTAtZTNkYy00M2Y0LWI5Y2YtYzJlY2NjMjg4ZGRmIiwiYWNyIjoiMCIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtcHJvZCIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjVjY2E3YjUwLWUzZGMtNDNmNC1iOWNmLWMyZWNjYzI4OGRkZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYmVybGludGVhbTMifQ.FGSYYD2U6r7CnEM1So32hCeue6FGxDJmknHOJSf2vDcn6HcCAfBvxT59Z7hXq5UI0CrL0Yv4-lRGEXbaWzPl4lG8HAIuRg_IKJx1OJF7z8SB4u2gRvGp10Bs0X0vmop2L7o6ZGSTrRcsgZkkIiZyCcAMZKBwzbtfUA0RM1h7iJSG3jLPaZU7Jp23hOS8HegAS16vy2VWzdXFqKpvt7agLqlyQTDloAK8qFV52YJTHWjxiR174gJq0m_oQ71TUdaIcXPO4QYL-iUfOSmUo0OcfQtW4WzxpAwtqw7tZZxPXwhh48tvu1A9tsLYfDz2ZAEKEzvhfNseyvaPR6LNCspfHw';

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
    timeout: false,
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