import request from 'request';

export default (options, token) => new Promise((resolve, reject) => {
  const requestOptions = options;

  if (token) {
    requestOptions.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  if (requestOptions.query) {
    requestOptions.url += `?${Object.keys(requestOptions.query).map((param) => {
      const value = encodeURIComponent(requestOptions.query[param]);
      return `${param}=${value}`;
    }).join('&')}`;
    delete requestOptions.query;
  }

  request(requestOptions, (err, res) => {
    if (err) {
      reject(err);
      return;
    }

    if (!/2\d\d/.test(res.statusCode)) {
      reject(JSON.parse(res.body));
      return;
    }

    resolve(JSON.parse(res.body));
  });
});
