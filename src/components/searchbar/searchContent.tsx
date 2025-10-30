import type { Umkm } from "../../models/umkmModel";
import "./searchContent.css";
export default function searchContent({
  data,
  type,
}: {
  data?: Umkm[];
  type?: "umkm" | "product";
}) {
  return (
    <div className="search-content">
      {/* {data.map(item => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    {type === "umkm" ? (
                        <p>{item.address}</p>
                    ) : (
                        <p>{item.description}</p>
                    )}
                </div>
            ))} */}

      <div className="item-container">
        <img src="#" alt="umkm-pic" />
        <div className="item-info">
          <h3>UMKM Name</h3>
          <p>UMKM Address</p>
          <p>UMKM rating</p>
        </div>
        {type == "umkm" ? <></> : <></>}
      </div>
    </div>
  );
}
