import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import ScrapeAndEmbed from "../components/ScrapeAndEmbed";
import SearchInterface from "../components/SearchInterface";
import SystemStatus from "../components/SystemStatus";
import { Search, FileText, BarChart3, ChevronRight } from "lucide-react";
import { Variants, easeInOut } from "framer-motion";

export interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishDate: string;
  wordCount: number;
  similarity?: number;
  isEmbedded: boolean;
}

export interface ScrapingProgress {
  isActive: boolean;
  message: string;
  progress: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<"manage" | "search" | "status">(
    "manage"
  );
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "3",
      title: "Natural Language Processing",
      summary:
        "Natural language processing (NLP) is an interdisciplinary subfield of linguistics, computer science, and artificial intelligence.",
      url: "https://en.wikipedia.org/wiki/Natural_language_processing",
      publishDate: "2024-01-08",
      wordCount: 6750,
      isEmbedded: false,
    },
  ]);

  const [scrapingProgress, setScrapingProgress] = useState<ScrapingProgress>({
    isActive: false,
    message: "",
    progress: 0,
  });

  const features = [
    "Scrape Wikipedia article",
    "Embed scrapings in DataBase",
    "Wikipedia Semantic Search",
  ];

  const tabs: {
    id: "manage" | "search" | "status";
    label: string;
    icon: React.FC<any>;
  }[] = [
    { id: "manage", label: "Article Management", icon: FileText },
    { id: "search", label: "Search", icon: Search },
    { id: "status", label: "System Status", icon: BarChart3 },
  ];

  const emergeVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: easeInOut,
      },
    }),
  };

  return (
    <div className="min-h-screen knowledge-pattern">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#f2f2f2",
            color: "hsl(var(--card-foreground))",
            border: "1px solid hsl(var(--border))",
          },
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-8 lg:mb-12 text-center relative">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 mt-4 sm:mt-8 text-foreground"
            initial="hidden"
            animate="visible"
            variants={emergeVariant}
            style={{
              textShadow:
                "0 0 60px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.5)",
            }}
          >
            Wikipedia Semantic Search
          </motion.h1>

          <div className="flex flex-col items-center space-y-3 max-w-2xl mx-auto px-4 text-muted-foreground">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className=""
                initial="hidden"
                animate="visible"
                custom={index + 1}
                variants={emergeVariant}
              >
                <div className="flex items-center space-x-2 text-base sm:text-lg lg:text-xl transform hover:scale-105 duration-500 filter hover:brightness-105">
                  <ChevronRight className="w-5 h-5 text-primary" />
                  <p>{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 lg:mt-8 flex justify-center">
            <div className="w-24 sm:w-32 h-0.5 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors duration-500 hover:bg-primary filter hover:brighness-105 hover:text-white
                  ${
                    activeTab === id
                      ? "bg-primary text-white shadow-lg"
                      : "text-muted-foreground"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto shadow-md">
          <div className="tab-content p-4 sm:p-6 lg:p-8">
            {activeTab === "manage" && (
              <ScrapeAndEmbed />
            )}

            {activeTab === "search" && <SearchInterface articles={articles} />}

            {activeTab === "status" && <SystemStatus />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
