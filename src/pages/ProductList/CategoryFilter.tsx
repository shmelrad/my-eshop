import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => (
  <div className="flex gap-2 p-4">
    {categories.map((category) => (
      <Button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`${
          selectedCategory === category ? "bg-blue-500 text-white" : ""
        }`}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Button>
    ))}
  </div>
); 