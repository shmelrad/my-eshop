import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { Button } from "@/components/ui/button";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useProductStore((state) =>
    state.products.find((p) => p.id === id)
  );

  if (!product) return <p>Product not found</p>;

  return (
    <div className="flex flex-col items-center px-48">
      <img className="w-48" src={product.image} alt={product.title} />
      <h1 className="text-xl font-bold mb-2">{product.title} ({product.category})</h1>
      <p>{product.description}</p>
      <Button className="mt-12" onClick={() => navigate("/products")}>Back</Button>
    </div>
  );
};

export default ProductDetail;
