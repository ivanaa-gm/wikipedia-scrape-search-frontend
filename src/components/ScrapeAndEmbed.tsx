import React, { useState, useRef, KeyboardEvent } from "react";
import toast from "react-hot-toast";
import { X, LibraryBig, Loader as LoaderLucide, Download } from "lucide-react";
import { Article, ScrapingProgress } from "../pages/Index";
import { PropagateLoader } from "react-spinners";

interface ArticleManagementProps {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  scrapingProgress: ScrapingProgress;
  setScrapingProgress: React.Dispatch<React.SetStateAction<ScrapingProgress>>;
}

const ScrapeAndEmbed: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [hasStartedScraping, setHasStartedScraping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [articles, setArticles] = useState(); //TODO:

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim()) {
      e.preventDefault();
      if (!topics.includes(currentInput.trim())) {
        setTopics([...topics, currentInput.trim()]);
        setCurrentInput("");
      } else {
        toast.error("Topic already added");
      }
    }
  };

  const removeTopic = (topicToRemove: string) => {
    setTopics(topics.filter((topic) => topic !== topicToRemove));
  };

  const handleScrape = () => {
    if (topics.length === 0) {
      toast.error("Please add at least one topic");
      return;
    }

    setHasStartedScraping(true);
    setTopics([]);
    setTimeout(() => {
      setHasStartedScraping(false);
    }, 10000);

    //TODO: TODO: TODO:
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="bg-card p-4 sm:p-6 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center text-grey-400">
          <LibraryBig className="mr-2 sm:mr-3" size={20} />
          Articles
        </h2>

        <div className="flex flex-col space-y-4 sm:space-y-6">
          <div className="tag-input border-2 rounded-lg p-3 sm:p-4 min-h-[3rem] flex flex-wrap gap-2 items-center focus-within:ring-0 transition-all">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow-sm"
              >
                {topic}
                <button
                  onClick={() => removeTopic(topic)}
                  className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors filter hover:brightness-90"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a topic and press Enter..."
              className="flex-1 min-w-[200px] outline-none bg-transparent text-sm sm:text-base "
            />
          </div>

          <button
            onClick={handleScrape}
            disabled={hasStartedScraping}
            className="w-full sm:w-auto bg-primary flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg disabled:cursor-not-allowed transition-all duration-500 font-medium filter hover:brightness-90"
          >
            <Download size={18} />
            <span className="text-sm sm:text-base">
              {hasStartedScraping ? "Scraping..." : "Scrape Articles"}
            </span>
          </button>
          <div className="m-8">
            {hasStartedScraping && (
              <div className="flex justify-center mt-8 mb-4">
                <PropagateLoader
                  color="#4fa94d"
                  size={15}
                  speedMultiplier={1}
                />
              </div>
            )}
            <div>
              <h3 className=" flex flex-row gap-2 text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                <Download />
                Scraped Articles (2)
              </h3>
              <div className="grid gap-4 sm:gap-6">
                <div
                  // key=
                  className="p-4 sm:p-6 bg-muted/30 rounded-lg border hover:shadow-md transition-all duration-200 hover:border-primary/30"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                    <h4 className="font-bold text-lg sm:text-xl text-foreground">
                      Machine Learning
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base mb-4 leading-relaxed">
                    Machine Learning (ML) is a field of artificial intelligence
                    that enables systems to automatically learn from data,
                    identify patterns, and make decisions with minimal human
                    intervention.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <span className="font-medium">Published: 2012-10-01</span>
                    <span className="font-medium">12324 words</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapeAndEmbed;
