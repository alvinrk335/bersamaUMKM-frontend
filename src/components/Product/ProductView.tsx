import Product from "../../models/Product";

export default function ProductView({ data }: { data: Product }) {
  return (
    <span className="product-view-container">
      <img src={data.photoUrl ?? ""} alt={data.name} />
      <div className="product-info">
        <h3>{data.name}</h3>
        <span>Rp.{data.price}</span>
        <p>{data.description}</p>
      </div>
    </span>
  );
}
