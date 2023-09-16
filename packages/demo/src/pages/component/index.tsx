import { useState } from 'react';
import { Button, Icon, Input, Skeleton, Card, Popover, Modal, Transition } from 'pivot-design';
// import router from '@/routers';
import ButtonMdx from '@/components/Button/index.mdx';
import IconMdx from '@/components/Icon/index.mdx';
import InputMdx from '@/components/Input/index.mdx';
import CardMdx from '@/components/Card/index.mdx';
import SkeletonMdx from '@/components/Skeleton/index.mdx';
//import PopoverMdx from '@/components/Popover/index.mdx';
import ModalMdx from '@/components/Modal/index.mdx';
import PopoverMdx from '@/components/Popover/index.mdx';
import TransitionMdx from '@/components/Transition/index.mdx';
import DraggableMdx from '@/components/Draggable/index.mdx';
import SwitchMdx from '@/components/Switch/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list as DraggableList } from '@/components/Draggable/.catalog';
import { list as ButtonList } from '@/components/Button/.catalog';
import { list as InputList } from '@/components/Input/.catalog';
import { list as PopoverList } from '@/components/Popover/.catalog';
import { list as SkeletonList } from '@/components/Skeleton/.catalog';
import { list as IconList } from '@/components/Icon/.catalog';
import { list as CardList } from '@/components/Card/.catalog';
import { list as TransitionList } from '@/components/Transition/.catalog';
import './index.scss';

function Index() {
  const [select, setSelect] = useState('Button');
  const [selectTitle, setSelectTitle] = useState(null);
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <div className={`demo-item ${select === 'Button' ? 'active' : ''}`} onClick={() => setSelect('Button')}>
          Button 按钮
        </div>
        <div className={`demo-item ${select === 'Switch' ? 'active' : ''}`} onClick={() => setSelect('Switch')}>
          Switch 开关
        </div>
        <div className={`demo-item ${select === 'Card' ? 'active' : ''}`} onClick={() => setSelect('Card')}>
          Card 卡片
        </div>
        <div className={`demo-item ${select === 'Draggable' ? 'active' : ''}`} onClick={() => setSelect('Draggable')}>
          Draggable 拖拽列表
        </div>
        <div className={`demo-item ${select === 'Skeleton' ? 'active' : ''}`} onClick={() => setSelect('Skeleton')}>
          Skeleton 骨架屏
        </div>
        <div className={`demo-item ${select === 'Icon' ? 'active' : ''}`} onClick={() => setSelect('Icon')}>
          Icon 图标
        </div>
        <div className={`demo-item ${select === 'Input' ? 'active' : ''}`} onClick={() => setSelect('Input')}>
          Input 输入框
        </div>
        <div className={`demo-item ${select === 'Popover' ? 'active' : ''}`} onClick={() => setSelect('Popover')}>
          Popover 气泡
        </div>
        <div className={`demo-item ${select === 'Modal' ? 'active' : ''}`} onClick={() => setSelect('Modal')}>
          弹窗
        </div>
        <div className={`demo-item ${select === 'Transition' ? 'active' : ''}`} onClick={() => setSelect('Transition')}>
          Transition 元素动画
        </div>
      </div>
    );
  };

  function countH2AndH3BeforeClick(list, h2Index, h3Index) {
    let totalCount = 0;

    if (h2Index > 0) {
      const h2List = list.slice(0, h2Index);
      totalCount += h2Index + h2List.reduce((sum, item) => sum + item.h3.length, 0);
    }

    if (h3Index > 0) {
      totalCount += h3Index;
    }

    return totalCount;
  }
  const renderCatalog = (list) => {
    const scrollToElement = (id: string, index: number) => {
      const element = document.getElementById(id);
      const linkVisible = document.querySelector<HTMLSpanElement>('.link');
      linkVisible?.classList.add('link-visible');
      if (element && linkVisible) {
        const { height, top } = element.getBoundingClientRect();
        // 右侧anchor的scroolBar
        const topOffset = 14.5 + 30.5 * index;
        const scrollTop = top + window.pageYOffset - height / 3;
        linkVisible.style.top = topOffset + 'px';
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    };

    return (
      <div className="catalog_content">
        <span className="link" />
        {list.map((item, h2Index: number) => (
          <div key={item.h2}>
            <div
              className={`catalog_h2 ${selectTitle === item.h2 ? 'active' : ''}`}
              id={item.h2}
              onClick={() => {
                setSelectTitle(item.h2);
                scrollToElement(item.h2, countH2AndH3BeforeClick(list, h2Index, 0));
              }}
            >
              {item.h2}
            </div>
            {item.h3.map((h3, h3Index: number) => (
              <div
                className={`catalog_h3 ${selectTitle === h3 ? 'active' : ''}`}
                id={h3}
                onClick={() => {
                  setSelectTitle(h3);
                  scrollToElement(h3, countH2AndH3BeforeClick(list, h2Index, h3Index));
                }}
              >
                {h3}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pivot-design-docs-content">
      {demoSelect()}
      <div className="demo-component" id="nice">
        {select === 'Button' ? <ButtonMdx components={{ Button, CodeBlock }} /> : null}
        {select === 'Switch' ? <SwitchMdx components={{ CodeBlock }} /> : null}
        {select === 'Icon' ? <IconMdx components={{ Icon, CodeBlock }} /> : null}
        {select === 'Input' ? <InputMdx components={{ Input, CodeBlock }} /> : null}
        {select === 'Card' ? <CardMdx components={{ Card, CodeBlock }} /> : null}
        {select === 'Popover' ? <PopoverMdx components={{ Popover, CodeBlock }} /> : null}
        {select === 'Draggable' ? (
          <DraggableMdx
            components={{
              CodeBlock,
            }}
          />
        ) : null}
        {select === 'Transition' ? <TransitionMdx components={{ Transition, CodeBlock }} /> : null}
        {select === 'Skeleton' ? <SkeletonMdx components={{ Skeleton, CodeBlock }} /> : null}
        {select === 'Modal' ? <ModalMdx components={{ Modal, CodeBlock }} /> : null}
      </div>
      <div className="demo-component-catalogue">
        {select === 'Draggable' && renderCatalog(DraggableList)}
        {select === 'Button' && renderCatalog(ButtonList)}
        {select === 'Card' && renderCatalog(CardList)}
        {select === 'Skeleton' && renderCatalog(SkeletonList)}
        {select === 'Popover' && renderCatalog(PopoverList)}
        {select === 'Input' && renderCatalog(InputList)}
        {select === 'Icon' && renderCatalog(IconList)}
        {select === 'Transition' && renderCatalog(TransitionList)}
      </div>
    </div>
  );
}
export default Index;
