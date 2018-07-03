var client = require('scp2')

const subject = {}

/**
 * upload file to host
 * @param {string} file the local file/path
 * @param {boolean} vb output all message
 */
function upload(file, vb) {
    client.scp(file, subject, err => {
        if (err) {
            console.log('a9cdn-upload-ng:' + file + ':' + err)
        } else if (vb) {
            console.log('a9cdn-upload-ok:' + file)
        }
    })
}


/**
 * config the cdn
 * @param {object} cnf 
 */
function config(cnf) {
    subject.host = cnf.host
    subject.path = cnf.path
    if (cnf.port != null) {
        subject.port = cnf.port
    }
    subject.username = cnf.user
    subject.password = cnf.pass
    if (cnf.keyf != null) {
        const fs = require('fs')
        subject.privateKey = fs.readFileSync(cnf.keyf)
    }
}


module.exports = {
    config: config,
    upload: upload,
}
