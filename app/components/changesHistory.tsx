export default function ChangesHistory() {
  return (
    <div className="mt-10">
      {[
        "2026-04-29 ver1.3 アイコン位置調整機能を実装(表示部分をスクロール)",
        "2026-04-29 ver1.2 スマホ向けのレイアウト改善",
        "2026-03-01 ver1.1 アイコンサイズ調整機能を実装",
        "2026-02-19 ver1.0 公開",
      ].map((item) => (
        <p key={item} className="text-gray-500 text-sm sm:text-md">
          {item}
        </p>
      ))}
    </div>
  );
}
