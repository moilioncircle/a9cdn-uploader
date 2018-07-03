const qn = require('../lib/scp2.js')

qn.config({
    host:'127.0.0.1',
    path:'/tmp/',
    user:'cdn-release',
    //pass:'Ee564HCqxv6FTMyp',
    keyf:'/home/trydofor/.ssh/id_rsa' // over password
})

qn.upload('./index.js', true)
qn.upload('/tmp/a', true)