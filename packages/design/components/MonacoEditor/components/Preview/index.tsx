import iframe from '!!raw-loader!./index.html';
import { useRef } from 'react';
import { MessageChangeType } from '../../types';
const src = URL.createObjectURL(new Blob([iframe], { type: 'text/html' }));

const Preview = ({ compiler }: { compiler: Worker }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  compiler.addEventListener('message', (e) => {
    const { data, type } = e.data;
    if (type === MessageChangeType.Compile) {
      iframeRef.current?.contentWindow?.postMessage({
        type,
        data,
      });
    }
  });

  return (
    <iframe
      ref={iframeRef}
      src={src}
      sandbox="allow-scripts allow-same-origin"
      width="100%"
      height={800}
    />
  );
};
export default Preview;
