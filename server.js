const http = require('http');
const fs = require('fs');
/*function rqListener(req, res) {
    
}

http.createServer(rqListener);  */

// sau cu functie anonima:
/*
http.createServer(function(req, res) {

});*/

//sau arrow function:

const mainServer = http.createServer((req, res) => {
   // console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My First Page </title></head>');
        res.write('<body><form action="/message" method= "POST"> <input type="text" name="message"> <button type= "submit"> Send </button> </form></body>');
        res.write('</html>');
        return res.end();
    }
    //process.exit();
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {// -> acesta e un event listener
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            /*
            fs.writeFileSync('message.txt', message);//Sync blockeaza executia urmatoarei linii de cod pana cand se termina executia curenta
                                                    //Daca fisierul avea 1GB, toata activitatea se bloca pana cand termina de incarcat fisierul
                                                    */
            // mai bine se foloseste:
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
        
        //res.writeHead(302, {});
        //sau 
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page </title></head>');
    res.write('<body><h1>Hello from my NS server! </h1></body>');
    res.write('<body><form action="/" method= "POST"> <input type="text" name="back"> <button type= "submit"> Back </button> </form></body>');
    res.write('</html>');
    res.end();
});

mainServer.listen(3000);