const qiniu = require('qiniu')

const subject = {
    accessKey: null,
    secretKey: null,
    bucket: null,
    config: null,
    uploadToken: null,
    activeTime: -1
}

/**
 * upload file to cdn
 * @param {string} file the local file/path
 * @param {boolean} vb output all message
 */
function upload(file, vb) {
    refresh()

    const libScan = require('./scan.js')
    const item = libScan.list(file)
    const root = item.root

    const func = function (err, uri) {
        if (err) {
            console.log('a9cdn-upload-ng:' + uri + ':' + err)
        } else {
            if (vb) console.log('a9cdn-upload-ok:' + uri)
        }
    }

    const upld = new qiniu.form_up.FormUploader(subject.config);
    for (const uri of item.list) {
        upld.putFile(subject.uploadToken, uri, root + '/' + uri, null, err => {
            func(err, uri)
        })
    }
}


/**
 * config the cdn
 * @param {object} cnf 
 */
function config(cnf) {
    subject.accessKey = cnf.accessKey
    subject.secretKey = cnf.secretKey
    subject.bucket = cnf.bucket
    refresh()
}

// 
function refresh() {
    const n = Date.now()
    const h = 3600 * 3 // 3h
    if (subject.activeTime + h * 1000 > n) return

    const opt = {
        scope: subject.bucket,
        expires: h, // 3h
    };

    const mac = new qiniu.auth.digest.Mac(subject.accessKey, subject.secretKey);
    const ppc = new qiniu.rs.PutPolicy(opt);
    subject.uploadToken = ppc.uploadToken(mac);
    subject.activeTime = n
    subject.config = new qiniu.conf.Config();
}

module.exports = {
    config: config,
    upload: upload,
}
