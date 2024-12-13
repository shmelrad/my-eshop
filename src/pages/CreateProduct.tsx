import React from "react";
import { useForm } from "react-hook-form";
import { useProductStore } from "@/store/productStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  category: z.string().min(1),
  price: z.coerce.number()
});

const CreateProduct: React.FC = () => {
  const addProduct = useProductStore((state) => state.addProduct);
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addProduct({
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      image: data.image,
      category: data.category,
      price: data.price,
      isLiked: false,
    });
    navigate("/products")
  };

  return (
    <div className="p-4 px-48">
      <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название товара</FormLabel>
                <FormControl>
                  <Input placeholder="Название" {...field} />
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
                  <Input placeholder="Описание" {...field} />
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
                  <Input placeholder="Ссылка на изображение" {...field} />
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
                  <Input placeholder="Категория" {...field} />
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
                <Input 
                    type="number"
                    placeholder="Цена" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4" type="submit">Create Product</Button>
        </form>
      </Form>
    </div>

  );
};

export default CreateProduct;
