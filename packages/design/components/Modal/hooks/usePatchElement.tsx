import * as React from 'react';

export default function usePatchElement(): [React.ReactElement[], (element: React.ReactElement) => Function] {
  const [elements, setElements] = React.useState<React.ReactElement[]>([]);

  const patchElement = React.useCallback((element: React.ReactElement) => {
    setElements(() => [element]);
    return () => {
      setElements([element]);
    };
  }, []);

  return [elements, patchElement];
}
