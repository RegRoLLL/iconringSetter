"use client";

import { useState } from "react";
import ImageSelecter from "./components/imageSelecter";
import ImageCanvas from "./components/imageCanvas";

export default function Home() {
  const [ringImg, setRingImg] = useState<string | null>(null);
  const [iconImg, setIconImg] = useState<string | null>(null);

  return (
    <div className="font-mono bg-indigo-100 max-w-3xl min-h-screen mx-auto flex flex-col items-center p-10 gap-3">
      <a className="text-3xl font-bold">アイコンリングセッター!!（仮設）</a>
      <div className="h-1 w-full rounded-sm bg-white" />
      <ImageCanvas iconImg={iconImg} ringImg={ringImg} />
      <div className="flex flex-col gap-3 items-">
        <ImageSelecter labelText="アイコン画像選択" onSelect={setIconImg} />
        <ImageSelecter labelText="リング画像選択" onSelect={setRingImg} />
      </div>
    </div>
  );
}
