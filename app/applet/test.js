import https from 'https';
const req = https.get('https://drive.google.com/uc?export=view&id=1ACR-qYGmTfpdZiHgKGAhqbsaq-GhNHS3', (res) => {
    console.log("Status:", res.statusCode);
    console.log("Headers:", res.headers);
});
req.on('error', console.error);
