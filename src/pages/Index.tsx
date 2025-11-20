import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchResult } from "@/components/SearchResult";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SearchResultData {
  title: string;
  url: string;
  content: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResultData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke('search', {
        body: { query: searchQuery }
      });

      if (error) throw error;

      if (data?.results) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "Unable to complete search. Please try again.",
        variant: "destructive",
      });
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-search-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="py-6">
          <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => {
            setSearchQuery("");
            setResults([]);
            setHasSearched(false);
          }}>
            CleanSearch
          </h1>
        </header>

        {/* Search Section */}
        <div className={`flex flex-col items-center transition-all duration-500 ${hasSearched ? 'pt-8' : 'pt-32'}`}>
          {!hasSearched && (
            <h2 className="text-5xl font-light mb-12 text-foreground animate-in fade-in duration-700">
              Search the web, clean and simple
            </h2>
          )}
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="mt-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground mb-4 px-4">
                  About {results.length} results
                </p>
                {results.map((result, index) => (
                  <SearchResult
                    key={index}
                    title={result.title}
                    url={result.url}
                    description={result.content}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                <p className="text-sm text-muted-foreground mt-2">Try different keywords</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
