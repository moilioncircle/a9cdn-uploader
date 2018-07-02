const libScan = require('./lib/scan.js')

/**
 * check cdn files with local in `dir` to cdn. the uri base on `dir`
 * @param {*} cnf a js-json format, see the `conf()` output.
 * @param {string} dir a path as root.
 */
function check(cnf, dir) {
    const conf = parse(cnf)
    const item = libScan.list(dir)
    const host = conf.domain
    const root = item.root
    const http = require('http');
    const fs = require('fs');
    const crypto = require('crypto')

    for (let e of item.list) {
        if (e.charAt(0) !== '/') e = '/' + e
        const url = host + e

        http.get(url, res => {
            const s1 = crypto.createHash('sha1').setEncoding('hex');
            res.pipe(s1).on('finish', () => {
                const h1 = s1.read()

                const b = fs.readFileSync(root + e)
                const s2 = crypto.createHash('sha1');
                s2.update(b)
                const h2 = s2.digest('hex')
                if (h1 === h2) {
                    console.log('a9cdn-check-ok:' + e)
                } else {
                    console.log('a9cdn-check-ng:' + h1 + ':' + h2)
                }
            })
        })
    }
}

/**
 * upload local files in `dir` to cdn. the uri base on `dir`
 * @param {*} cnf a js-json format, see the `conf()` output.
 * @param {string} dir a path as root.
*/
function upload(cnf, dir) {
    const conf = parse(cnf)
    const cdnx = require('./lib/' + conf.cdnxlib + '.js')
    cdnx.config(conf.coinfig)
    const item = libScan.list(dir)
    const root = item.root
    const func = function (err, uri) {
        if (err) {
            console.log('a9cdn-upload-ng:' + uri + ':' + err)
        } else {
            console.log('a9cdn-upload-ok:' + uri)
        }
    }
    for (const e of item.list) {
        cdnx.upload(root + '/' + e, e, func)
    }
}

/**
 * show config help
 */
function conf() {
    const fs = require('fs')
    const t = fs.readFileSync(__dirname + '/conf.js', 'utf8')
    console.log('``` conf.js')
    console.log(t)
    console.log('```')
}

// 
function parse(cnf) {

    const acn = cnf.active
    if (acn == null) {
        console.error('need `active`')
        process.exit(1)
    }

    const conf = cnf[acn]
    if (conf == null) {
        console.error('need `' + acn + '` object')
        process.exit(1)
    }

    const domain = cnf.domain
    if (domain == null) {
        console.error('need `domain`')
        process.exit(1)
    }


    return { cdnxlib: acn, coinfig: conf, domain: cnf.domain }
}

module.exports = {
    check: check,
    upload: upload,
    conf: conf
}