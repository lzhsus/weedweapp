import appConfig from '../common/app_config'
module.exports = function (img_url) {
    return (img_url.indexOf("http")!=-1?img_url:appConfig.oss+img_url)
}