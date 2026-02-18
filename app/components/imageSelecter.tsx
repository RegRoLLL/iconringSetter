import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  labelText: string;
  onSelect: (url: string | null) => void;
};

export default function ImageSelecter({ labelText, onSelect }: Props) {
  const imageSize = 256;
  const initImg = "file.svg";

  const inputRef = useRef<HTMLInputElement>(null!);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const onSelectButtonClick = () => {
    inputRef.current.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObj = e.target.files[0];
    const url = window.URL.createObjectURL(fileObj);
    setSelectedImg(url);
    onSelect(url);
  };

  return (
    <div className="flex flex-row items-center gap-5">
      <Image
        src={selectedImg ?? initImg}
        alt="selected Img"
        width={imageSize}
        height={imageSize}
        className="size-16 border-white border-2"
      />

      <input
        hidden
        ref={inputRef}
        onChange={onFileInputChange}
        type="file"
        accept="image/*"
        className="border-white border-2 pl-1"
      />
      <button
        onClick={onSelectButtonClick}
        className="bg-white text-indigo-300 font-bold text-xl cursor-pointer px-5 py-1 rounded-md hover:scale-105"
      >
        {labelText}
      </button>
    </div>
  );
}
