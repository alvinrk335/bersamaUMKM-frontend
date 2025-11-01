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
      {searchType === "ai" ? (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <h3 style={{ margin: 0 }}>Cari dengan bahasa sehari-hari</h3>
          <p className="ft-desc" style={{ marginTop: "0.5rem" }}>
            Ketik pertanyaan atau perintah seperti berbicara kepada teman —
            gunakan bahasa yang spesifik dengan menyebutkan lokasi, jenis
            makanan, atau kebutuhan khusus. Contoh: "Tempat makan bakmi di dekat
            Alam Sutera" atau "Rekomendasikan kafe kopi terbaik dekat saya
            dengan harga terjangkau."
          </p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
