import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

const InputSearch = ({ setDebouncedSearchTerm, className, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce((value) => {
    setDebouncedSearchTerm(value);
  }, 500);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={handleSearchInput}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default InputSearch;
