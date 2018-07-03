const qn = require('../lib/qiniu.js')

qn.config({ // the cdn name, qiniu cdn config
    accessKey: '',
    secretKey: '',
    bucket: '',
})

qn.upload('./index.js', true)
qn.upload('test', true)