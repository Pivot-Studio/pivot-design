declare interface SvgrComponent extends React.FC<React.SVGAttributes<React.ReactSVGElement>> {}

declare module '*.svg'{
  const content: SvgrComponent;
  export default content;
}
