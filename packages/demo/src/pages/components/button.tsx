import React from 'react';
import { Button } from 'pivot-design';
import ButtonMdx from '@/components/Button/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Button/.catalog';
import { renderCatalog } from '@/utils';

const ButtonPage: React.FC = () => {
  return (
    <>
      <ButtonMdx components={{ Button, CodeBlock }} />
      <div className="demo-component-catalogue">
        {renderCatalog(list)}
        {/* {select === 'Draggable' && renderCatalog(DraggableList)}
  {select === 'Button' && renderCatalog(ButtonList)}
  {select === 'Card' && renderCatalog(CardList)}
  {select === 'Skeleton' && renderCatalog(SkeletonList)}
  {select === 'Popover' && renderCatalog(PopoverList)}
  {select === 'Input' && renderCatalog(InputList)}
  {select === 'Icon' && renderCatalog(IconList)}
  {select === 'Transition' && renderCatalog(TransitionList)} */}
      </div>
    </>
  );
};
export default ButtonPage;
