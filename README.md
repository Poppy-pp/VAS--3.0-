## 目录结构
```
.
├── LICENSE
├── README.md
├── docs
│   └── docs.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue         
│   ├── api            请求接口
│   ├── assets         静态资源
│   ├── components     组件
│   ├── lang           国际化
│   ├── main.js        入口文件
│   ├── mock           MOCK 数据
│   ├── router         路由
│   ├── store          Store
│   ├── svg            svg 存放目录
│   ├── theme          主题色
│   ├── utils          辅助工具方法
│   └── views          页面
├── template
│   └── index.vue
└── vue.config.js      vue-cli3 配置文件
```

## 启动

执行 dev 脚本将自动启动 http://localhost:10000

```
# install dependency
npm install

# develop
npm run dev 

# build for production environment
npm run build

# lint
npm run lint
```
