const path = require('path'); //node环境当前路径
module.exports = {
  entry: {
    app: './index.ts', //找到咱们刚才在src下面的入口文件
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //打包文件输出的地址
    filename: 'bundle.[contenthash:8].js',
    clean: true, //webpack5新增的，每次打包前删除旧的dist包文件
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: 'babel-loader', // 导入为正常ts，tsx文件
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          //loader 顺序是自下而上执行，所以顺序一定不要错
          'style-loader',
          'css-loader', //如果需要使用css module模式的话，在这个loader里面添加配置即可，自己百度下
          'sass-loader',
        ],
      },
    ],
  },
};
