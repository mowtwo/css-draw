import { createEffect, createMemo, createSignal } from "solid-js";
import { RGBA } from "../utils/imageData2RGBA";
import readAsBase64 from "../utils/readAsBase64";
import ref from "../utils/ref";
import tempHTML from "../utils/tempHTML";

export interface ShadowPreviewProps {
  rgbaList: RGBA[];
  width: number;
  height: number;
}

const ShadowPreview = (props: ShadowPreviewProps) => {
  const out = ref<HTMLDivElement>();
  const d = ref<HTMLAnchorElement>();
  const [href, setHref] = createSignal("");
  const [download, setDownload] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const handleDownload = async () => {
    setLoading(true);
    const { outerHTML } = out.content!;
    const blob = new Blob([tempHTML(outerHTML)]);
    const uri = await readAsBase64(blob as File);
    setHref(uri);
    setDownload(`${Date.now()}.html`);
    d.content!.click();
    setLoading(false);
  };
  return (
    <>
      <div
        style={{
          width: props.width + "px",
          height: props.height + "px",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "1px",
            "box-shadow": props.rgbaList
              .map((item) => {
                const { 0: r, 1: g, 2: b, 3: a, x, y } = item;
                return `rgba(${r},${g},${b},${a}) ${x}px ${y}px 1px`;
              })
              .join(","),
          }}
          ref={out.content}
        ></div>
      </div>
      <a ref={d.content} href={href()} download={download()} class="hidden"></a>
      <button onClick={handleDownload} disabled={loading()}>
        {loading() ? "转换中" : "下载文件"}
      </button>
    </>
  );
};

export default ShadowPreview;
