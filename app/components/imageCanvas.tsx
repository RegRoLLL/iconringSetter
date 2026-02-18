import html2canvas from "html2canvas";
import Image from "next/image";
import { useRef } from "react";

type Props = {
  iconImg: string | null;
  ringImg: string | null;
};

export default function ImageCanvas(prop: Props) {
  const imgSize = 1024;
  const className = "size-full absolute";
  const targetDivRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dlLinkRef = useRef<HTMLAnchorElement>(null);

  const onClickDownloadButton = (): void => {
    generateImgUri();
  };

  const generateImgUri = (): void => {
    const target = targetDivRef;
    if (!target.current) return;
    html2canvas(target.current!).then((canvas: HTMLCanvasElement) => {
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
      <div
        ref={targetDivRef}
        className="relative flex flex-col aspect-square max-w-4xs w-full mx-8 bg-white"
      >
        {prop.iconImg && (
          <Image
            src={prop.iconImg!}
            alt="iconImg"
            height={imgSize}
            width={imgSize}
            className={className}
          />
        )}
        {prop.ringImg && (
          <Image
            src={prop.ringImg!}
            alt="ringImg"
            height={imgSize}
            width={imgSize}
            className={className}
          />
        )}
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
