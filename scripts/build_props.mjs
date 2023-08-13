import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve, extname } from 'path';
import { transformFromAstSync } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';
import { parse } from '@babel/parser';
import { ComponentsPath, ConpopnentDocsPath } from './env.mjs';

const firstUpper = ([letter, ...rest]) => letter.toUpperCase() + rest.join('');
const COMMENT_REG = /\@(\w+)\s+([\S^\\]+)/g;
const inherit = [];

function parseComment(comment) {
	if (!comment) return {};
	const r = {};
	let m;
	while ((m = COMMENT_REG.exec(comment))) {
		r[m[1]] = m[2];
	}
	return r;
}

function h(componentMdxPath, component) {
	const sourceCode = readFileSync(componentMdxPath, { encoding: 'utf-8' });
	const ast = parse(sourceCode, {
		sourceType: 'unambiguous',
		plugins: ['typescript'],
	});
	const { code } = transformFromAstSync(ast, sourceCode, {
		plugins: [[generatorPropsPlugin, { name: component }]],
	});
	return code;
}
/**
 * @param {*} name
 * @param {*} docs
 */
function generatePropsMd(name, docs) {
	const DocsPath = resolve(
		ConpopnentDocsPath,
		`./${firstUpper(name)}/props.mdx`
	);
	let table = `import Table from '../table.tsx'\n\rexport const params = ${JSON.stringify(
		docs
	)}\n\r## API 列表\n\r<Table name='${name}' params={params}/>`;
	// let table = `|参数名称|参数类型|是否可选|默认值|备注|版本支持|\n\r|:---|:---:|:---:|:---:|:---:|---:|\n\r`
	// for (let doc of docs) {
	//   const { key, value, optional, version, description, default: defaultVal } = doc;
	//   table += `|${key}|${value}|${optional ? '可选' : '必选'}|${defaultVal}| ${description}| ${version}|\n\r`
	// }
	writeFileSync(DocsPath, table);
}
const generatorPropsPlugin = declare((api, options, dirname) => {
	api.assertVersion(7);
	return {
		pre: (file) => {
			// 用于存储props对象Array<{...}>
			file.docs = [];
		},
		visitor: {
			TSInterfaceDeclaration: (path, scope) => {
				if (options.name === 'index') {
					path.traverse({
						TSPropertySignature: (p) => {
							// console.log(p.get('typeAnnotation').toString(),p.get('optional').node);
							const key = p.get('key').toString();
							const value = p.get('typeAnnotation').toString();
							const optional = p.get('optional').node;
							const commentStr = p.get('leadingComments')[0].node.value;
							const comments = parseComment(commentStr);
							inherit.push({ key, value, optional, ...comments });
						},
					});
					return;
				}
				// ComponentProps
				if (path.get('id').toString() === `${firstUpper(options.name)}Props`) {
					// 匹配是否继承
					for (let extend of path.get('extends')) {
						if (extend.toString() === 'PivotDesignProps') {
							/**
							 * ```json
							 * {
							 *   key: 'className',
							 *   value: ': string',
							 *   optional: true,
							 *   comment: [version: '1.0.0', description: '自定义类名']
							 * },
							 * ```
							 */
							scope.file.docs.push(...inherit);
							break;
						}
					}
					// 解析自己的props
					// console.log(options.name, scope.file.docs);
					path.traverse({
						TSPropertySignature: (p) => {
							// console.log(p.get('typeAnnotation').toString(),p.get('optional').node);
							const key = p.get('key').toString();
							const value = p.get('typeAnnotation').toString();
							const optional = p.get('optional').node;
							const commentStr =
								p.get('leadingComments').length > 0 &&
								p.get('leadingComments')[0].node.value;
							const comments = parseComment(commentStr);
							scope.file.docs.push({ key, value, optional, ...comments });
						},
					});
				}
			},
		},
		post(file) {
			if (options.name === 'index') return;
			// console.log(file.docs);
			// todo:create md table 使用自己的自定义组件吧
			generatePropsMd(options.name, file.docs);
		},
	};
});

const components = readdirSync(ComponentsPath).filter((dir) => extname(dir));
h(resolve(ComponentsPath, `./index.ts`), 'index');

for (let componentPath of components) {
	if (componentPath === 'index.ts') continue;
	const componentMdxPath = resolve(ComponentsPath, `./${componentPath}`);
	const component = componentPath.split('.')[0];
	// if (component === "index") continue;
	h(componentMdxPath, component);
}
