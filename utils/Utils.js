// const request = require('requestretry');

class Utils {
  static invokeEndpoint(url, reqBody, methodType, maxAttempts, retryDelay) {
    const maxAttemptsParsed = maxAttempts ? maxAttempts : 0;
    const retryDelayParsed = retryDelay ? retryDelay : 0;
    return new Promise((resolve, reject) => {
      console.log('Invoking Endpoint...');
      request(
        {
          rejectUnauthorized: false,
          uri: url,
          method: methodType,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody),
          maxAttemptsParsed, // (default) try 5 times
          retryDelayParsed, // (default) wait for 5s before trying again
          retryStrategy: function myRetryStrategy(err, response) {
            return err || (response && response.statusCode > 500);
          },
        },
        (error, response, body) => {
          if (error || response.statusCode >= 500) {
            console.log(`Error hitting API URL: ${url}, Body--> ${body}`);
            reject(`Error hitting API URL: ${url}...`);
          } else {
            resolve(body);
          }
        }
      );
    });
  }
}

module.exports = Utils;
