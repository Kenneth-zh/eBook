//线下
const UPLOAD_PATH = './upload'
const UPLOAD_URL = 'http://localhost:8080'
//const UPLOAD_URL = '/Users/kennethzhang/Projects/se1/ebook-item/ebook-server/upload'

//线上
/* const UPLOAD_PATH ='/home/lighthouse/nginx/upload'
const UPLOAD_URL ='http://119.29.190.23:80/' */

//常量参数
module.exports = {
    PWD_SALT: 'admin_imooc_node',
    CODE_ERROR: -1,//错误码
    CODE_SUCCESS: 0,//成功
    PRIVATE_KEY: 'admin_imooc_node_test_youbaobao_xyz',//私钥
    JWT_EXPIRED: 1200 * 60, //token过期时间
    CODE_TOKEN_EXPIRED: -2,//token失效码
    debug: true,
    UPLOAD_PATH,//上传路径
    UPLOAD_URL,//上传URL
    MIME_TYPE_EPUB: 'application/epub+zip',//电子书后缀名
    UPDATE_TYPE_FROM_WEB: 1,
}