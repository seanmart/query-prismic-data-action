const https = require('https');

export default function(url){
  return new Promise((next)=>{
    https.get(url,(res)=>{
      let data = [];
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        next(JSON.parse(Buffer.concat(data).toString()))
      });
    })
  })
}
