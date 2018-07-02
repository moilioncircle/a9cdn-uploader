const qn = require('../lib/qiniu.js')

qn.config({ // the cdn name, qiniu cdn config
    accessKey: '',
    secretKey: '',
    bucket: '',
    domain: '', // public domain for check
})

qn.upload('./index.js','/test/index.js', console.log)