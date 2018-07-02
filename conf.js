// must use module.exports, 
// so can `cost conf = require('conf.js')`
module.exports = {
    active: 'qiniu', // the active cdn-name
    domain: 'http://cdn.moilion.com', // public domain for check
    
    qiniu: { // the cdn name, qiniu cdn config
        accessKey: '', // qiniu api's accessKey
        secretKey: '',  // qiniu api's secretKey
        bucket: 'moilion', // qiniu bucket
    },

    aliyun: { // ali yun config

    }
}