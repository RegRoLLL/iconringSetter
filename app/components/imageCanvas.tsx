import html2canvas from "html2canvas";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  iconImg: string | null;
  ringImg: string | null;
  iconScale: number;
};

export type ScrollHandle = {
  scrollCenter: () => void;
};

export default function ImageCanvas(prop: Props) {
  const imgSize = 1024;
  const targetDivRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dlLinkRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 });

  //正方形なのでこれでいい
  const scrollSize = () =>
    scrollRef.current
      ? scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      : 1;

  // アイコン位置リセットのため、スクロール位置を中央にする
  function scrollCenter() {
    if (!scrollRef.current) return;
    const scrollTarget = scrollRef.current;
    scrollTarget.scrollTo({
      left: scrollTarget.scrollWidth / 4,
      top: scrollTarget.scrollHeight / 4,
    });
  }

  useEffect(() => {
    scrollCenter();
  }, [prop.iconImg]);

  const onScroll = () => {
    if (!scrollRef.current) return;
    setScrollOffset({
      x: scrollRef.current.scrollLeft / scrollSize(),
      y: scrollRef.current.scrollTop / scrollSize(),
    });
  };

  const onClickDownloadButton = (): void => {
    generateImgUri();
  };

  const generateImgUri = (): void => {
    const target = targetDivRef;
    if (!target.current) return;
    console.log("generating image...", window.devicePixelRatio);
    html2canvas(target.current!, {
      scale: Math.max(1, window.devicePixelRatio),
    }).then((canvas: HTMLCanvasElement) => {
      const out = canvasRef.current!;
      const ctx = out.getContext("2d")!;
      ctx.drawImage(canvas, 0, 0, imgSize, imgSize);

      const targetImgUri = out.toDataURL("image/png");
      saveImg(targetImgUri);
    });
  };

  const saveImg = (uri: string): void => {
    const downloadLink = dlLinkRef.current;

    if (!downloadLink) return;

    if (typeof downloadLink.download == "string") {
      const date = new Date();
      downloadLink.href = uri;
      downloadLink.download = `generatedIcon_${date.toLocaleString()}.png`;
      downloadLink.click();
    } else {
      window.open(uri);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <button
        className="w-full bg-white text-indigo-300 font-bold text-xl cursor-pointer px-5 py-1 rounded-t-md rounded-bl-2xl"
        onClick={scrollCenter}
      >
        アイコン位置リセット
      </button>
      <div
        ref={targetDivRef}
        className="relative flex flex-col aspect-square max-w-4xs w-full mx-8 bg-white overflow-hidden"
      >
        {prop.iconImg && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transform: `translate(${(0.5 - scrollOffset.x) * 100}%, ${(0.5 - scrollOffset.y) * 100}%) scale(${prop.iconScale})`,
            }}
          >
            <Image src={prop.iconImg!} alt="iconImg" fill />
          </div>
        )}
        {prop.ringImg && (
          <Image
            src={prop.ringImg!}
            alt="ringImg"
            height={imgSize}
            width={imgSize}
            className="size-full absolute pointer-events-none"
          />
        )}
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-scroll overscroll-none"
          onScroll={onScroll}
        >
          <div className="size-[200%]" />
        </div>
      </div>
      <button
        onClick={onClickDownloadButton}
        className="cursor-pointer text-black py-2 bg-white w-full rounded-b-4xl"
      >
        download image
      </button>
      <a hidden ref={dlLinkRef} />
      <canvas hidden height={imgSize} width={imgSize} ref={canvasRef} />
    </div>
  );
}

ImageCanvas.displayName = "ImageCanvas";
