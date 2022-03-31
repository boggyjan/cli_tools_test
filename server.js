const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const execSync = require('child_process').execSync

const port = 5438
const routes = require('./routes')
const clDisplay = require('./clDisplay')

const getMimeFromPath = filePath => {  
  const mimeType = execSync('file --mime-type -b "' + filePath + '"').toString()
  return mimeType.trim()
}

const onRequest = (req, res) => {
  // main/tel
  const reqUrl = req.url.replace(/\?.+/g, '')
  const route = reqUrl.replace(/^\//g, '').split(/\//)
  if (!route[0] && route.length === 1) {
    route[0] = 'index'
  }

  const query = querystring.parse(req.url.replace(/.+\?/g, ''))

  let routeChildren = routes
  let views = []
  let layout = 'default'
  let notInRoute = false

  const path = 'public/' + reqUrl

  route.forEach((item, index) => {
    const curRoute = routeChildren.find(rt => rt.name === item)

    if (curRoute) {
      routeChildren = curRoute && curRoute.children ? curRoute.children : []

      if (curRoute.layout) {
        layout = curRoute.layout
      }

      if (curRoute) {
        views.push(curRoute.name)
      }
    } else {
      notInRoute = true
    }
  })

  if (!notInRoute) {
    let resHtml = ''

    try {
      var data = fs.readFileSync('layout/' + layout + '.html', 'utf8')
      resHtml = data
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('Layout data failed')
      return
    }

    for (let item of views) {
      try {
        var data = fs.readFileSync('view/' + item + '.html', 'utf8')

        if (resHtml.length) {
          resHtml = resHtml.replace('<child />', data)
        } else {
          resHtml = data
        }
      } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('View data failed')
        return
      }
    }

    resHtml = resHtml.replace('<child />', '')

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(resHtml)
  } else {
    // 視為檔案的處理方式
    try {
      const data = fs.readFileSync(path)
      const type = getMimeFromPath(path)
      res.writeHead(200, { 'Content-Type': type })
      res.end(data, type)
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('Page not found')
      return
    }
  }
}

const server = http.createServer(onRequest)

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(port)

if (server.listening) {
  clDisplay(port)
}
