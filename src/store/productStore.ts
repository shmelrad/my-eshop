import { create } from "zustand";

export type Product = {
    id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    isLiked: boolean;
};

type ProductState = {
    products: Product[];
    setProducts: (products: Product[]) => void;
    deleteProduct: (id: string) => void;
    toggleLike: (id: string) => void;
    editProduct: (updatedProduct: Product) => void;
    addProduct: (newProduct: Product) => void;
};

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    deleteProduct: (id) =>
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        })),
    toggleLike: (id) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === id ? { ...product, isLiked: !product.isLiked } : product
            ),
        })),
    editProduct: (updatedProduct) =>
        set((state) => {
            console.log('Editing product:', {
                productId: updatedProduct.id,
                oldProduct: state.products.find(p => p.id === updatedProduct.id),
                newProduct: updatedProduct
            });
            
            const updatedProducts = state.products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            
            console.log('Products after update:', updatedProducts);
            
            return { products: updatedProducts };
        }),
    addProduct: (newProduct) =>
        set((state) => ({
            products: [...state.products, newProduct]
        })),
}));