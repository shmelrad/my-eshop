import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage,
}) => (
  <div className="flex justify-center items-center mt-4 space-x-2">
    <Button
      onClick={onPreviousPage}
      disabled={currentPage === 1}
      className="disabled:opacity-50"
    >
      <FaChevronLeft />
    </Button>
    {Array.from({ length: totalPages }, (_, index) => (
      <Button
        key={index}
        onClick={() => onPageChange(index + 1)}
        className={`${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
      >
        {index + 1}
      </Button>
    ))}
    <Button
      onClick={onNextPage}
      disabled={currentPage === totalPages}
      className="disabled:opacity-50"
    >
      <FaChevronRight />
    </Button>
  </div>
); 