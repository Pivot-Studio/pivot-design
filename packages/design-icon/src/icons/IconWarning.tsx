import * as React from 'react';
import type { SVGProps } from 'react';
import '../index.scss';
const SvgIconWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M543.083 161.173a64 64 0 0 1 24.853 24.854l317.91 572.224a64 64 0 0 1-55.98 95.082H194.134a64 64 0 0 1-55.957-95.082l317.888-572.224a64 64 0 0 1 87.019-24.854zM512 217.11 194.112 789.333h635.755L512 217.11zm32 444.224v64h-64v-64h64zm0-276.437v233.77h-64v-233.77h64z" />
  </svg>
);
export default SvgIconWarning;
