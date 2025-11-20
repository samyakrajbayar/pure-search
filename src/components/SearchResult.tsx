import { ExternalLink } from "lucide-react";

interface SearchResultProps {
  title: string;
  url: string;
  description: string;
}

export const SearchResult = ({ title, url, description }: SearchResultProps) => {
  const displayUrl = url.replace(/^https?:\/\//, '').split('/')[0];

  return (
    <div className="group p-4 rounded-lg hover:bg-search-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-search-border">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-medium text-link-blue group-hover:underline line-clamp-1">
            {title}
          </h3>
          <ExternalLink className="h-4 w-4 text-result-url flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-sm text-result-url mb-2">{displayUrl}</p>
        <p className="text-sm text-result-description line-clamp-2">{description}</p>
      </a>
    </div>
  );
};
