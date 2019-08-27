export default async function customFetch(url, method, body) {
  const options = {
    method,
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': localStorage.getItem('token')
    }
  };

  if (body) options.headers.body = body;

  const response = await fetch(url, options);
  const data = await response.json();
  if (response.status >= 200 && response.status <= 304) {
    return { status: 'success', data: data.data };
  } else if (response.status === 400) {
    return { status: 'fail', data: await data.data };
  } else if (response.status > 400) {
    return {
      status: 'error',
      statusCode: response.status,
      data: await data.data
    };
  }
}
