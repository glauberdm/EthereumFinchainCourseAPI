module.exports = (path) => { 
    var basePath = config.basePath
    if(path){
        path = path.replace('/', '')
        var toPath = `${basePath}${path}`
        return toPath
    }
    return basePath
}