"use client";

import { ChangeEventHandler, useState } from "react";
import ImageSelecter from "./components/imageSelecter";
import ImageCanvas from "./components/imageCanvas";
import ChangesHistory from "./components/changesHistory";

export default function Home() {
  const [ringImg, setRingImg] = useState<string | null>(null);
  const [iconImg, setIconImg] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);

  const handleOnScaleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setScale(Number.parseFloat(e.target.value));
  };

  return (
    <div className="font-mono bg-indigo-100 max-w-2xl min-h-screen mx-auto flex flex-col items-center p-10 gap-3">
      <a className="text-3xl font-bold text-gray-800">
        アイコンリングセッター!!（仮設）
      </a>
      <div className="h-1 w-full rounded-sm bg-white" />
      <a className="text-sm -my-2 text-gray-800">ver.beta-1.2</a>
      <ImageCanvas iconImg={iconImg} ringImg={ringImg} iconScale={scale} />
      <div className="flex sm:flex-row flex-col gap-3">
        <ImageSelecter labelText="アイコン画像選択" onSelect={setIconImg} />
        <ImageSelecter labelText="リング画像選択" onSelect={setRingImg} />
      </div>
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-5 w-full bg-white text-indigo-300 font-bold text-xl cursor-pointer px-5 py-1 rounded-md">
        <label
          className="w-fit cursor-pointer hover:text-blue-600"
          onClick={() => setScale(1)}
        >
          アイコン倍率:{scale.toFixed(2)}
        </label>
        <input
          type="range"
          min={0}
          max={2}
          value={scale}
          step={0.01}
          onChange={handleOnScaleChange}
          className="grow cursor-pointer"
        />
      </div>
      <ChangesHistory />
    </div>
  );
}
