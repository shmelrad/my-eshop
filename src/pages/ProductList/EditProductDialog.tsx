import { Product } from "@/store/productStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

interface EditProductDialogProps {
  editingProduct: Product | null;
  onClose: () => void;
  onSave: (newProduct: Product) => void;
  onProductChange: (updatedProduct: Product) => void;
}

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number(),
  image: z.string().min(1),
  category: z.string().min(1),
});

export const EditProductDialog: React.FC<EditProductDialogProps> = ({
  editingProduct,
  onClose,
  onSave,
  onProductChange,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editingProduct?.title || "",
      description: editingProduct?.description || "",
      price: editingProduct?.price || 0,
      image: editingProduct?.image || "",
      category: editingProduct?.category || "",
    },
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        title: editingProduct.title,
        description: editingProduct.description,
        price: editingProduct.price,
        image: editingProduct.image,
        category: editingProduct.category,
      });
    }
  }, [editingProduct, form]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const newProduct = {
        ...editingProduct,
        ...data,
    } as Product;

    if (editingProduct) {
      onProductChange(newProduct);
      onSave(newProduct);
    }
  };

  return (
    <Dialog open={!!editingProduct} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование товара</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название товара</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание товара</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ссылка на изображение товара</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категория товара</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена товара</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Сохранить изменения</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}; 