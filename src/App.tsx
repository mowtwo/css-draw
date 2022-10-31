import { createSignal, onMount } from "solid-js";
import CanvasWorker from "./components/CanvasWorker";
import ref from "./utils/ref";
import example from "./assets/example.png";
import ShadowPreview from "./components/ShadowPreview";
import { RGBA } from "./utils/imageData2RGBA";

const App = () => {
  const [img] = createSignal(example);
  const [shadows, setShadows] = createSignal<RGBA[]>([]);
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);

  const handleLoad = (rgbaList: RGBA[], w: number, h: number) => {
    setShadows(rgbaList);
    setWidth(w);
    setHeight(h);
  };
  return (
    <div>
      <h2>这个是用css画出来的👇</h2>
      <CanvasWorker src={img()} onLoad={handleLoad} />
      <ShadowPreview rgbaList={shadows()} width={width()} height={height()} />
      <hr />
      <div>
        源代码：
        <a href="https://github.com/mowtwo/css-draw">
          https://github.com/mowtwo/css-draw
        </a>
      </div>
    </div>
  );
};

export default App;
