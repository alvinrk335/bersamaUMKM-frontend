import "./searchContent.css";

export default function FirstTimeContent({
  dataType,
  searchType,
}: {
  dataType?: "umkm" | "product";
  searchType?: "normal" | "ai";
}) {
  // if AI mode, provide natural-language keyword examples; otherwise provide simple names/locations
  const examples =
    searchType === "ai"
      ? dataType === "product"
        ? [
            "cari kue tradisional terdekat",
            "rekomendasi kopi robusta di dekat saya",
          ]
        : [
            "toko kue yang buka 24 jam dekat saya",
            "warung kopi dengan rating tinggi di Jakarta",
          ]
      : dataType === "product"
      ? ["kue tradisional", "kopi robusta"]
      : ["Toko Kue Prima", "Jl. Sudirman 45"];

  function applyExample(q: string) {
    const input = document.getElementById(
      "searchInput"
    ) as HTMLInputElement | null;
    if (!input) return;
    input.value = q;
    const ev = new Event("input", { bubbles: true });
    input.dispatchEvent(ev);
    input.focus();
  }

  return (
    <div
      className={
        searchType === "ai"
          ? "search-content-ai search-first-time"
          : "search-content search-first-time"
      }
    >
      <h3>Tips untuk mencari</h3>
      <p className="ft-desc">
        Coba contoh pencarian ini atau ketik kata kunci yang relevan.
      </p>
      <div className="ft-examples">
        {examples.map((ex) => (
          <button
            key={ex}
            className="ft-example-btn"
            onClick={() => applyExample(ex)}
          >
            {ex}
          </button>
        ))}
      </div>
      <div className="ft-guides">
        <div>
          • Gunakan nama tempat, kategori, atau produk (mis. "toko roti")
        </div>
        <div>• Aktifkan AI untuk hasil rekomendasi (klik logo Gemini)</div>
        <div>• Gunakan alamat atau kota untuk mempersempit hasil</div>
      </div>
    </div>
  );
}
