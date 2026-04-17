const https = require('https');
https.get('https://drive.google.com/uc?export=download&id=1ACR-qYGmTfpdZiHgKGAhqbsaq-GhNHS3', (res) => {
    console.log(res.statusCode);
    console.log(res.headers.location);
});
