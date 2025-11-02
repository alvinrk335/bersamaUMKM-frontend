import "./searchContent.css";

export default function FirstTimeContent({
  searchType,
}: {
  searchType?: "normal" | "ai";
}) {
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
        <div style={{ textAlign: "center", padding: "0.75rem 0" }}>
          <h3 style={{ margin: 0, marginBottom: "0.5rem" }}>Tips Pencarian</h3>
          <p className="ft-desc">
            Ketik nama tempat, kategori produk, atau alamat untuk mencari UMKM
            dan produk. Aktifkan mode AI (logo Gemini) untuk pencarian dengan
            bahasa alami.
          </p>
        </div>
      )}
    </div>
  );
}
