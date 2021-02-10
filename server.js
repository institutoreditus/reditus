const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// const port = process.env.PORT
const port = 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    if (!dev && req.headers['x-forwarded-proto'] != 'https') {
      const hostname = req.hostname === 'www.app.reditus.org.br' ? 'app.reditus.org.br' : req.hostname;

      res.writeHead(301, {
        Location: `https://${hostname}${req.url}`
      })
      res.end()
      
    // }if (dev && req.headers['x-forwarded-proto'] != 'https'){
    // res.writeHead(301, {

    //   Location: `https://localhost:${port}`
    // })  
    //   res.end()
    
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})