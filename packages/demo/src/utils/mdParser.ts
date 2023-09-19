import { Processor, unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { Root } from 'remark-parse/lib';
import { PhrasingContent } from 'mdast';

class MarkdownParser {
  parser: Processor<Root, undefined, undefined, Root, string>;

  constructor() {
    this.parser = unified().use(remarkParse).use(remarkStringify);
  }

  getAnchorList(mdString: string) {
    const mdast = this._parse(mdString);
    const anchor = [];
    for (let node of mdast.children) {
      if (node.type === 'heading') {
        anchor.push({ depth: node.depth, text: this._nodeToString(node.children) });
      }
    }
    return anchor;
  }

  _nodeToString(nodes: PhrasingContent[]): string {
    return nodes
      .map((node) => {
        if (node.type === 'text') {
          return node.value;
          // todo
        } else if (node?.children) {
          return this._nodeToString(node.children);
        } else {
          return '';
        }
      })
      .join('');
  }
  _parse(mdString: string) {
    const res = this.parser.parse(mdString);
    return res;
  }
}

export default new MarkdownParser();
