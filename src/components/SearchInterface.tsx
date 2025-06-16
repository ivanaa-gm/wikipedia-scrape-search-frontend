import React, { useState, useMemo } from "react";
import { Search, ExternalLink, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { Article } from "../pages/Index";

interface SearchInterfaceProps {
  articles: Article[];
}

type SortOption = "relevance" | "date" | "length";

const SearchInterface: React.FC<SearchInterfaceProps> = ({ articles }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const similarityThreshold = 40; // Add the missing similarity threshold

  // Simulate search results with similarity scores
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const results = articles
      .filter((article) => article.isEmbedded)
      .map((article) => ({
        ...article,
        similarity: Math.floor(Math.random() * 100), // Simulated similarity score
      }))
      .filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((article) => article.similarity >= similarityThreshold);

    // Sort results
    return results.sort((a, b) => {
      switch (sortBy) {
        case "relevance":
          return b.similarity - a.similarity;
        case "date":
          return (
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
          );
        case "length":
          return b.wordCount - a.wordCount;
        default:
          return 0;
      }
    });
  }, [searchQuery, articles, similarityThreshold, sortBy]);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return searchResults.slice(startIndex, startIndex + resultsPerPage);
  }, [searchResults, currentPage, resultsPerPage]);

  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return "text-secondary";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles semantically..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-lg bg-background"
          />
        </div>
        <div className="mt-8">
          <div className="flex flex-row gap-2">
            <Filter size={18} />
            <label className="block text-sm font-medium mb-2">
              Sort By
            </label>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-[25%] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-background"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="length">Length</option>
          </select>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-primary">
              Search Results ({searchResults.length})
            </h3>
            {searchResults.length > resultsPerPage && (
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * resultsPerPage + 1}-
                {Math.min(currentPage * resultsPerPage, searchResults.length)}{" "}
                of {searchResults.length}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {paginatedResults.map((article) => (
              <div key={article.id} className="search-card p-5 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-lg text-primary hover:text-secondary cursor-pointer transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`font-bold text-lg similarity-score ${getSimilarityColor(
                        article.similarity!
                      )}`}
                    >
                      {article.similarity}%
                    </span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <span>Wikipedia</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex space-x-4">
                    <span>
                      Published:{" "}
                      {new Date(article.publishDate).toLocaleDateString()}
                    </span>
                    <span>{article.wordCount.toLocaleString()} words</span>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary underline transition-colors"
                  >
                    View on Wikipedia
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
              >
                <ArrowUp size={16} className="rotate-[-90deg]" />
              </button>

              <span className="px-4 py-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
              >
                <ArrowDown size={16} className="rotate-[90deg]" />
              </button>
            </div>
          )}
        </div>
      )}

      {searchQuery && searchResults.length === 0 && (
        <div className="bg-card p-8 rounded-lg border shadow-sm text-center">
          <div className="text-muted-foreground">
            No articles found matching your search criteria.
            <br />
            Try adjusting your search terms.
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInterface;
