const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const allowed={'/':'index.html','/index.html':'index.html','/styles.css':'styles.css','/model.js':'model.js','/app.js':'app.js'};
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const server=http.createServer((req,res)=>{const target=allowed[new URL(req.url,'http://localhost').pathname];if(!target){res.writeHead(404);return res.end('Not found');}fs.readFile(path.join(__dirname,'dist',target),(err,body)=>{if(err){res.writeHead(500);return res.end('Read error');}res.writeHead(200,{'Content-Type':types[path.extname(target)],'Cache-Control':'no-store'});res.end(body);});});
server.listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+server.address().port));
