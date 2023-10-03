import { MessageChangeType } from '../types';
import { babelTransform } from '../compiler';

self.addEventListener('message', (e) => {
  const { type, data } = e.data;

  if (type === MessageChangeType.Compile) {
    // 发送结果回主线程

    self.postMessage({
      type,
      data: babelTransform(data.filename, data.code, []),
    });
  }
});
