import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export const SearchBar = ({ value, onChange, onSearch, isLoading }: SearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative group">
        <Input
          type="text"
          placeholder="Search the web..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-12 pr-12 text-base border-search-border bg-background hover:border-primary focus-visible:ring-primary transition-all duration-200 rounded-full"
          disabled={isLoading}
        />
        <Button
          onClick={onSearch}
          disabled={!value.trim() || isLoading}
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 transition-all duration-200"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
