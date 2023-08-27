import * as React from 'react';
import type { SVGProps } from 'react';
import '../index.scss';
const SvgIconClose = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path d="M10 8.586 2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
  </svg>
);
export default SvgIconClose;
