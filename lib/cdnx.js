// the interface of cdx

/**
 * upload path/file to cdn
 * @param {string} file the local file or path
 * @param {boolean} vb output all message
 */
function upload(file, vb) {
    console.log('upload ' + file + ' with verbos ' + vb)
}

/**
 * config the cdn
 * @param {object} cnf 
 */
function config(cnf) {
    console.log('config ' + cnf)
}

module.exports = {
    config: config,
    upload: upload,
}

