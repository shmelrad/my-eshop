import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "@/api/fakeApi";
import { Product, useProductStore } from "@/store/productStore";
import { SearchBar } from "./ProductList/SearchBar";
import { CategoryFilter } from "./ProductList/CategoryFilter";
import { ProductCard } from "./ProductList/ProductCard";
import { Pagination } from "./ProductList/Pagination";
import { EditProductDialog } from "./ProductList/EditProductDialog";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const {
    products,
    setProducts,
    toggleLike,
    deleteProduct,
    editProduct
  } = useProductStore((state) => state);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const itemsPerPage = 6;
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data.map(product => ({
          ...product,
          id: String(product.id),
          isLiked: false
        }) as Product));
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (products.length === 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [products.length, setProducts]);

  const handleEditProduct = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const product = products.find(p => p.id === id);
    if (product) {
      setEditingProduct(product);
    }
  };

  const handleSaveEdit = (newProduct: Product) => {
    if (editingProduct) {
      editProduct(newProduct);
      setEditingProduct(null);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showFavorites, selectedCategory]);

  const categories = ["all", ...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => !showFavorites || product.isLiked)
    .filter((product) => selectedCategory === "all" || product.category === selectedCategory);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-3 gap-4 p-4">
        {selectedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onNavigate={(id) => navigate(`/products/${id}`)}
            onToggleLike={toggleLike}
            onEdit={handleEditProduct}
            onDelete={deleteProduct}
          />
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      ) : (
        <div className="text-center mt-4">Товары не найдены..</div>
      )}

      <EditProductDialog
        editingProduct={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveEdit}
        onProductChange={setEditingProduct}
      />
    </div>
  );
};

export default ProductList;
