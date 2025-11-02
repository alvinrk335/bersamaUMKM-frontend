import type { Umkm } from "../../models/Umkm";
import CircleLoading from "../CircleLoading/CircleLoading";
import FirstTimeContent from "./FirstTimeContent";
import AiSearchContent from "./aiSearchContent";
import NormalSearchContent from "./normalSearchContent";
import "./searchContent.css";
export default function searchContent({
  data,
  dataType,
  searchType,
  loading,
  firstTime,
}: {
  data?: Umkm[];
  dataType?: "umkm" | "product";
  searchType?: "normal" | "ai";
  loading?: boolean;
  firstTime?: boolean;
}) {
  if (firstTime) {
    return <FirstTimeContent searchType={searchType} />;
  }
  if (loading) {
    const cls = searchType === "ai" ? "search-content-ai" : "search-content";
    return (
      <div className={cls} role="status" aria-live="polite">
        <div className="search-loading">
          <CircleLoading />
        </div>
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    const cls = searchType === "ai" ? "search-content-ai" : "search-content";
    return (
      <div className={cls} role="status" aria-live="polite">
        <div className="no-data-message">No results found</div>
      </div>
    );
  }
  if (searchType === "normal") {
    return <NormalSearchContent data={data} type={dataType} />;
  } else if (searchType === "ai") {
    return <AiSearchContent data={data} dataType={dataType} />;
  }
}
