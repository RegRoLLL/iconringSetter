import Image from "next/image";

type Props = {
  iconImg: string | null;
  ringImg: string | null;
};

export default function ImageCanvas(prop: Props) {
  const imgSize = 512;
  const className = "size-full absolute";

  return (
    <div className="flex relative aspect-square max-w-4xs w-full mx-8 bg-white">
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
  );
}
