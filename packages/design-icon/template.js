const template = (variables, { tpl }) => {
  return tpl`
${variables.imports};

${variables.interfaces};

import '../index.scss';

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);

${variables.exports};
`;
};

module.exports = template;
