"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const parser_1 = require("@babel/parser");
const core_1 = require("@babel/core");
const path_1 = require("path");
// const curDir = path.dirname(fileURLToPath(import.meta.url));
const curDir = __dirname;
function getPivotDesignProps() {
    return getProps((0, path_1.resolve)(curDir, '../../../design-props/components/index.ts'));
}
function parseComment(commentStr) {
    let props = {};
    if (!commentStr) {
        return props;
    }
    const COMMENT_REG = /@(\w+)\s+(.+)/g;
    for (const prop of commentStr.matchAll(COMMENT_REG)) {
        const [, key, val] = prop;
        props[key] = val;
    }
    return props;
}
function getProps(path) {
    if (!(0, fs_1.existsSync)(path)) {
        throw `<API />设置的props所在路径${path}不存在`;
    }
    const sourceCode = (0, fs_1.readFileSync)(path, { encoding: 'utf-8' });
    const ast = (0, parser_1.parse)(sourceCode, {
        // 不确定是module还是es6写法
        sourceType: 'unambiguous',
        plugins: ['typescript'],
    });
    let returnProps = new Map();
    // 该函数返回值是代码，所以只好在plugin的post部分修改了props值
    (0, core_1.traverse)(ast, {
        TSInterfaceDeclaration: (path) => {
            const { name } = path.node.id;
            const extendsVal = path.node.extends;
            if (!returnProps.has(name)) {
                returnProps.set(name, []);
            }
            extendsVal?.forEach((item) => {
                if (item.expression.name === 'PivotDesignProps') {
                    const props = getPivotDesignProps().get('PivotDesignProps');
                    returnProps.set(name, props);
                }
            });
            path.traverse({
                TSPropertySignature: (p) => {
                    if (p.parentKey === 'members')
                        return;
                    //  "'--button-background-color'"的特殊处理
                    const key = p.get('key').toString().replaceAll(/['"]/g, '');
                    const value = p.get('typeAnnotation').toString().slice(1);
                    const optional = p.get('optional').node;
                    const commentStr = p.get('leadingComments').length > 0 && p.get('leadingComments')[0].node.value;
                    const comments = parseComment(commentStr);
                    let props = returnProps.get(name);
                    const newProps = { key, value, optional, ...comments };
                    props.push(newProps);
                    returnProps.set(name, props);
                },
            });
        },
    });
    return returnProps;
}
function getPropsNode(props) {
    let node = '';
    for (const key of props.keys()) {
        const val = props.get(key);
        node += `export const ${key}Props = ${JSON.stringify(val)}\n
    <ApiTable name='${key}' params={${key}Props}></ApiTable>\n`;
    }
    return node;
}
function loader(source) {
    let sourceCode = source.trim();
    const apiBlockReg = /<Api\s+path=(["'])([^"']+)\1(><\/Api>|\s+\/>)/g;
    const matchValArr = sourceCode.matchAll(apiBlockReg);
    const arr = Array.from(matchValArr);
    if (arr.length) {
        for (let matchVal of arr) {
            let [initialVal, , pathVal] = matchVal;
            pathVal = (0, path_1.join)(curDir, '../../../design-props', pathVal);
            const props = getProps(pathVal);
            const propsNode = getPropsNode(props);
            sourceCode = sourceCode.replace(initialVal, propsNode);
        }
        // 添加ApiTable的import\
        sourceCode = 'import ApiTable from "../../ApiTable.tsx"\n' + sourceCode;
    }
    return sourceCode;
}
exports.default = loader;
