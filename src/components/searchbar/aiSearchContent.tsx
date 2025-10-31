import type { Umkm } from "../../models/umkmModel";

export default function AiSearchContent({
  data,
  dataType,
}: {
  data?: Umkm[];
  dataType?: "umkm" | "product";
}) {
  const dataS = data;
  return <div className="search-content-ai">AI Search Content</div>;
}
