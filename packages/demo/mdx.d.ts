declare module '*.mdx' {
  // eslint-disable-next-line no-undef
  let MDXComponent: (props: any) => React.ReactElement;
  export default MDXComponent;
}
