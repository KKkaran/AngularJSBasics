// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({ noCors: true })

server.use(middlewares)

//server.use('/api/searchresults', router)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5100/CustomFilters/index.html')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
server.listen(5001, () => {
  console.log('Mock api server listening at localhost:3000')
})
