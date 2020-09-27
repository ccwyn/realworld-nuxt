## 资源
  - 仓库 https://github.com/gothinkster/realworld
  - 在线示例 https://demo.realworld.io/#/ 
  - 接口文档 https://github.com/gothinkster/realworld/tree/master/api 
  - 页面模板 https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md 

## github Actions 部署
1、环境准备
* Linux 服务器
* Github仓库
2、配置 Github Access Token
* 生成【身份令牌】：https://github.com/settings/tokens  
    * 461396d77fd01735ac4ff64ee1bfa581da6158ac
* 配置到github项目的 secrets 
    * https://github.com/ccwyn/realworld-nuxt/settings/secrets 

## 配置Github Actions 执行脚本
* 在项目根目录创建 .github/workflows目录
* 下载 main.yml到目录中 
    * 根据tags构建 https://github.com/lipengzhou/realworld-nuxtjs/blob/master/.github/workflows/main.yml
    * 在github项目的 secrets中配置yml所需变量
        * HOST - 要部署到服务器的 公网IP或者域名
        * PORT - 要部署到服务器的 端口（默认22）
        * TOKEN - 身份令牌 Github Access Token
        * USERNAME - 要部署到服务器的 登录账号
        * PASSWORD - 要部署到服务器的 登录密码
* 修改nuxt.config.js
```
server:{
  // 指定使用一个 host，默认是 localhost，如果你希望服务器外部可访问,制定如下:'0.0.0.0' 代表本机的所有ip地址,网络中0.0.0.0的IP地址表示整个网络，即网络中的所有主机。
  host:'0.0.0.0’, 
  // 端口号
  prot:3000, 
}
```
* 配置pm2配置文件 ( pm2.config.json )
{
"apps": [
      {
        "name": "RealWorld",
        "script": "npm",
        "args": "start"
      }
    ]
}
* 提交更新
    * git tag v0.1.1
* 在服务器指定目录创建文件夹 （root/realworld-nuxtjs）
* 在服务器安全组开放对应端口 （3000）
* 部署成功后在浏览器访问 服务器IP:3000