import Mock from 'mockjs';
import Util from '../util/util'
/*API-Login-登录接口模拟*/
var login = Mock.mock("/api/login",{
  "msg":"登录成功",          //登录成功过信息
  "code": 0,                 //正常
  "token": Util.getToken(),            
  "time": 240000              //有效期4分钟
})


export default {
}


