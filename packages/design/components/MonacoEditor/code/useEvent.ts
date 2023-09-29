export default `import {
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import "./index.scss";
function getRandomColor() {
  const colors = ["green", "blue", "purple", "red", "pink"];
  return colors[Math.floor(Math.random() * colors.length)];
}
function useEvent(handler) {
  // todo
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });
  return useCallback(() => {
    const fn = handlerRef.current;
    fn();
  }, []);
}
export default function App() {
  const [color, setColor] = useState(getRandomColor());
  const ButtonRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    function getNewColor() {
      const newColor = getRandomColor();
      if (color === newColor) {
        getNewColor();
      } else {
        setColor(newColor);
      }
    }
    getNewColor();
    console.log("===", color);
  };
  // todo
  const handleEventClick = useEvent(handleClick);
  useEffect(() => {
    ButtonRef.current.addEventListener("click", handleEventClick);
  }, []);
  return (
    <section>
      <h1>useEvent</h1>
      <button className="link" ref={ButtonRef}>
        Next
      </button>
      <article>
        <figure>
          <p style={{ background: \`$\{color}\` }} />
          <figcaption>Current: {color}</figcaption>
        </figure>
      </article>
    </section>
  );
}
`;
