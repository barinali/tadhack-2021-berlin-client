import ky from 'ky';

// need to be refreshed every 10 hours
const AWA_ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOa001UFNMeVlUblBPZkJwV3Y0aHV2bV9EcXh1d29QMzk3eE9BY2p1c2tNIn0.eyJleHAiOjE2MzI4NzIwNzAsImlhdCI6MTYzMjgzNjA3MCwiYXV0aF90aW1lIjoxNjMyODM2MDcwLCJqdGkiOiIzY2FiOWM3NC0xODIxLTRhZTMtOGQ2Yy1iMjkyYTliMGNkY2QiLCJpc3MiOiJodHRwczovL2F3YS5uZXR3b3JrL2F1dGgvcmVhbG1zL3Byb2QiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNTQ1ZTUxNTktMjJlMC00NjU2LWIzNWMtODY2MmE1OGExNmM0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmVybGludGVhbTMiLCJzZXNzaW9uX3N0YXRlIjoiYTExYjYwMWItNGNlYy00MzQwLWI4YjctZTNhMDU2OTlkZTBhIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtcHJvZCIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImExMWI2MDFiLTRjZWMtNDM0MC1iOGI3LWUzYTA1Njk5ZGUwYSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYmVybGludGVhbTMifQ.ZDyLuy9_-qNkuJztYFv-bY5Wh329rP13zXeRiHIECrjGJ5i0MnXco3_ScguDSaRSgPIGaJ-bJFOAaztlu3doZk-dE6iLFU2v_AH2g0ZXq84obpCI1O2EQ9WNodyjeD0W6O9KM9c8iuCJtry5SfR6HrwdqNA430BnMSpl71NZWwOj2zyrwccdPCGe1BAOsxW0y4OFUJdAcZk_Mvif7tHqXcv15FrlF9aoEobeRXopk27Wt8SQO2CdabK9C8d0ajy8GkzU-uLyp3BPzoI377C1KHlUiLrdaqFWzogR3sB7-tkZXRvxFs1Cqck76AAIBM2VNn21FIE501f6QR6tb2Z6xg';

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