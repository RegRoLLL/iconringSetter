export default function ChangesHistory() {
  return (
    <div className="mt-10">
      {[
        "2026-04-29 ver1.2 スマホ向けのレイアウト改善",
        "2026-03-01 ver1.1 アイコンサイズ調整機能を実装",
        "2026-02-19 ver1.0 公開",
      ].map((item) => (
        <p key={item} className="text-gray-500">
          {item}
        </p>
      ))}
    </div>
  );
}
