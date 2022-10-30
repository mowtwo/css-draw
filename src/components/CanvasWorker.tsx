import { createSignal, onMount, Ref } from "solid-js";
import imageData2RGBA, { RGBA } from "../utils/imageData2RGBA";
import ref, { forwardRef } from "../utils/ref";

export interface CanvasWorkerProps {
  src: string;
  onLoad?: (rgbaList: RGBA[], width: number, height: number) => void;
}

const CanvasWorker = (props: CanvasWorkerProps) => {
  const canvas = ref<HTMLCanvasElement>();
  const context = ref<CanvasRenderingContext2D>();
  const img = ref<HTMLImageElement>();

  const handleOnLoad = () => {
    const canvasValue = canvas.content!;
    const contextValue = context.content!;
    const imgValue = img.content!;
    let { width, height } = imgValue;
    width /= 2;
    height /= 2;
    canvasValue.width = width;
    canvasValue.height = height;
    contextValue.drawImage(imgValue, 0, 0, width, height);
    const data = contextValue.getImageData(0, 0, width, height).data;
    props?.onLoad?.(imageData2RGBA(data, width), width, height);
  };

  onMount(() => {
    context.content = canvas.content!.getContext("2d")!;
  });
  return (
    <>
      <canvas class="hidden" ref={canvas.content}></canvas>
      <img
        ref={img.content}
        class="hidden"
        src={props.src}
        onLoad={handleOnLoad}
        alt="load"
      />
    </>
  );
};

export default CanvasWorker;
