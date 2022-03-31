const os = require('os')
const clui = require('clui')
const clc = require('cli-color')

const terminalLink = require('terminal-link')
const boxen = require('boxen')

const clear = clui.Clear
const Line = clui.Line
const LineBuffer = clui.LineBuffer
const Progress = clui.Progress
const Gauge = clui.Gauge

function getIPAddress () {
  var interfaces = os.networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address
    }
  }
  return '0.0.0.0'
}

function show (msg) {
  process.stdout.write(`\u001b[0G${msg}`);
}

module.exports = function (port) {
  // var total = os.totalmem()
  // var free = os.freemem()
  // var used = total - free
  // var human = Math.ceil(used / 1000000) + ' MB'

  // var text = Gauge(used, total, 20, total * 0.8, human)

  // boxen colors: 'black' 'red' 'green' 'yellow' 'blue' 'magenta' 'cyan' 'white' 'gray' or a hex value like '#ff0000'

  let msg = `${clc.green.bold('Node.js Server')} @ v1

${clc.cyan.bold('▸ Environment:')} development (${clc.cyan(process.env.NODE_ENV)})
${clc.cyan.bold('▸ Rendering:')}   server-side
${clc.cyan.bold('▸ Target:')}      server

${clc.white.bold('Listening:')} http://${terminalLink(`${getIPAddress()}:${port}`, `http://${getIPAddress()}:${port}`)}`

  console.log(boxen(msg, { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'green' }))
  console.log(clc.green.bold('✔') + ' Waiting for request...')

  // process.stdin demo
  // process.stdin.setEncoding('utf-8')

  // process.stdin.on('readable', () => {
  //   let input
  //   while ((input = process.stdin.read()) !== null) {
  //     const command = input.trim()
  //     console.log(`我監聽到東西啦：${command}`, process.env)
  //     // if (command === 'Robin is handsome') process.stdout.write("right.")
  //     // if (command === 'Kevin has a girlfriend') process.stderr.write("ok.")
  //     // if (command === 'exit') process.exit();
  //   }
  // })


  // progressbar demo
  // var progressBar = new Progress(20)
  // var pbInterval
  // var percent = 0
  // show('client-side build progress: ' + progressBar.update(percent))

  // function updatePbBar () {
  //   pbInterval = setTimeout(() => {
  //     percent += 0.01

  //     show('client-side build progress: ' + progressBar.update(percent))

  //     if (percent < 1) {
  //       updatePbBar()
  //     } else {
  //       // process.exit(0)
  //     }
  //   }, 10)
  // }

  // updatePbBar()


  // const Spinner = clui.Spinner
  // var countdown = new Spinner('Exiting in 10 seconds...  ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷'])
  // countdown.start()

  // var number = 10
  // setInterval(function () {
  //   number--
  //   countdown.message('Exiting in ' + number + ' seconds...  ')
  //   if (number === 0) {
  //     process.stdout.write('\n')
  //     process.exit(0)
  //   }
  // }, 1000)
}