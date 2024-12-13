import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  showFavorites,
  setShowFavorites,
}) => (
  <div className="p-4 flex flex-row gap-4">
    <input
      type="text"
      placeholder="Поиск"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <Button
      onClick={() => setShowFavorites(!showFavorites)}
      className={showFavorites ? "bg-red-500 hover:bg-red-600" : ""}
    >
      {showFavorites ? "Показать все" : "Показать избранные"}
    </Button>
  </div>
); 