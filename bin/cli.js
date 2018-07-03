#!/usr/bin/env node
const prg = require('commander')

prg
  .version('1.0.0')
  .usage('<cmd> <cnf> <dir>')
  .option('-n, --noise', 'output all message')
  .description('<cnf> is a js-json config file path (see conf output)')

prg.command('check <cnf> <dir>')
  .description('check  dir\'s files. with cdn sha1')
  .action((cnf, dir) => exec('check', cnf, dir, prg.noise))

prg.command('upload <cnf> <dir>')
  .description('upload dir\'s files to cdn')
  .action((cnf, dir) => exec('upload', cnf, dir, prg.noise))

prg.command('*')
  .description('print sample conf.js')
  .action(() => exec('conf'))

prg.parse(process.argv)

if (process.argv.length < 3) {
  exec('help')
}

function exec(cmd, cnf, dir, vb) {

  const a9 = require('../index.js')
  if (cmd === 'conf') {
    a9.conf()
    return
  }

  if (cmd === 'check' || cmd === 'upload') {
    const path = require('path')
    const obj = require(path.resolve(process.cwd(), cnf))
    dir = path.resolve(process.cwd(), dir)

    switch (cmd) {
      case 'check':
        a9.check(obj, dir, vb === true)
        break
      case 'upload':
        a9.upload(obj, dir, vb === true)
        break
    }
  } else {
    console.log('use -h')
  }

}
