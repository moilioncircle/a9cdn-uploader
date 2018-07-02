// the interface of cdx

/**
 * upload file to cdn
 * @param {string} file the local file
 * @param {string} uri the uri of cdn
 */
function upload(file, uri) {
    console.log('upload ' + file + ' to ' + uri)
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

