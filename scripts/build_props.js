const fs = require("fs");
const path = require("path");

const ComponentsPath = path.resolve(
  __dirname,
  "../packages/demo/src/components"
);

const dirs = fs.readdirSync(ComponentsPath).filter((dir) => !path.extname(dir));

for (let dir of dirs) {
  const componentMdxPath = path.resolve(ComponentsPath, `./${dir}/index.mdx`);
  // todo: props自动写入脚本
  // 1、利用fs来处理文本字符串
  // 2、利用mdx编译器来处理ast
  
}
