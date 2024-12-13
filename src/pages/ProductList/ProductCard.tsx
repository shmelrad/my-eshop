import { Product } from "@/store/productStore";
import { Button } from "@/components/ui/button";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface ProductCardProps {
  product: Product;
  onNavigate: (id: string) => void;
  onToggleLike: (id: string) => void;
  onEdit: (id: string, e: React.MouseEvent) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
  onToggleLike,
  onEdit,
  onDelete,
}) => (
  <div
    className="border rounded-lg p-4 flex flex-col cursor-pointer relative"
    onClick={() => onNavigate(product.id)}
  >
    <div className="absolute top-2 right-2 flex gap-2">
      <Button
        variant="outline"
        className="p-2 shadow"
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike(product.id);
        }}
      >
        {product.isLiked ? (
          <GoHeartFill className="w-6 h-6 text-red-500" />
        ) : (
          <GoHeart className="w-6 h-6" />
        )}
      </Button>
      <Button
        variant="outline"
        className="p-2 shadow"
        onClick={(e) => onEdit(product.id, e)}
      >
        <FaPencil className="w-5 h-5 text-gray-500" />
      </Button>
      <Button
        variant="outline"
        className="p-2 shadow"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(product.id);
        }}
      >
        <FaTrash className="w-5 h-5 text-gray-500 hover:text-red-500" />
      </Button>
    </div>
    <img
      src={product.image}
      alt={product.title}
      className="h-48 object-contain mb-4"
    />
    <h3 className="font-semibold text-lg mb-2 flex-grow whitespace-nowrap truncate">
      {product.title}
    </h3>
    <p className="text-xl font-bold text-gray-800">${product.price}</p>
  </div>
); 