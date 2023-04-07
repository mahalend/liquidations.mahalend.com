export default async function callApi(endpoint, method = 'get', body) {
  const url = `https://api.arthcoin.com/${endpoint}`;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
    'content-type': 'application/json',
  }

  return await fetch(url, {crossDomain: true, headers, method, body: JSON.stringify(body)})
    .then(async (response) => {
      if (!response.ok) {
        return response.json()
          .then((json) => {
            return Promise.reject(json)
          });
      }
      return response.json();
    });
}
