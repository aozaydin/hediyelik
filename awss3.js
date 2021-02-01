  var bucketName = 'nilhediye';
  var bucketRegion = 'eu-central-1';
  var IdentityPoolId = 'eu-central-1:350fb4b8-a162-4e28-9a9c-e361f3703a8c';
  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId
    })
  });
