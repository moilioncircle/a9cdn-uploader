// must use module.exports, 
// so can `cost conf = require('conf.js')`
module.exports = {
    active: 'scp2', // the active cdn-name
    domain: 'http://cdn.moilion.com', // public domain for check

    scp2: {
        host:'127.0.0.1',
        port:'22', // default 22
        path:'/var/www/cdn',
        user:'trydofor',
        pass:'password',
        keyf:'key-file' // over password
    },

    qiniu: { // the cdn name, qiniu cdn config
        accessKey: '', // qiniu api's accessKey
        secretKey: '',  // qiniu api's secretKey
        bucket: 'moilion', // qiniu bucket
    },

    aliyun: { // ali yun config

    }
}