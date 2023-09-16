import { useState } from 'react';

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
export const renderCatalog = (list) => {
  const [selectTitle, setSelectTitle] = useState(null);

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
