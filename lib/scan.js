/**
 * list files that match file-conf-entry
 */

const fs = require('fs')
const path = require('path')


/**
   return {
       root: realpath
       list:[uri]
    }
 * @param {string} root the path as root
 */
function list(root) {
    const list = []
    let dir = fs.realpathSync(root)
    if (fs.statSync(root).isDirectory()) {
        const posi = dir.length + 1
        walk(list, posi, dir)
    }else{
        dir = path.dirname(dir)
        list.push(path.basename(root))
    }
    return {
        root: dir,
        list: list
    }
}

function walk(outs, posi, dir) {
    const lst = fs.readdirSync(dir)
    for (const f of lst) {
        const p = path.resolve(dir, f)
        if (fs.statSync(p).isDirectory()) {
            walk(outs, posi, p)
        } else {
            outs.push(p.substring(posi))
        }
    }
}

module.exports = {
    list: list
}
