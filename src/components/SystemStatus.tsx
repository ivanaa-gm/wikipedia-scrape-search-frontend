import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Database,
  Brain,
  BookOpenText,
  CaseUpper,
  SearchCheck,
} from "lucide-react";
import { BounceLoader } from "react-spinners";
import apiService from "../services/apiService";

interface SystemStatusData {
  total_articles: number;
  total_word_count: number;
  average_word_count: number;
  semantic_searches_performed: number;
  embedding_dimensions: number;
  model_name: string;
}

const SystemStatus: React.FC = () => {
  const [status, setStatus] = useState<SystemStatusData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService
      .getSystemStatus()
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load system status");
        setLoading(false);
      });
  }, []);


  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  const stats = [
    {
      title: "Total Articles",
      value: status?.total_articles.toLocaleString(),
      icon: BookOpenText,
      color: "text-secondary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Word Count",
      value: status?.total_word_count.toLocaleString(),
      icon: CaseUpper,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Avg. Word Count",
      value: status?.average_word_count.toLocaleString(),
      icon: BarChart3,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Semantic Searches Performed",
      value: status?.semantic_searches_performed.toLocaleString(),
      icon: SearchCheck,
      color: "text-secondary",
      bgColor: "bg-warning/10",
    },
    {
      title: "Model",
      value: status?.model_name,
      icon: Brain,
      color: "text-secondary",
      bgColor: "bg-warning/10",
    },
    {
      title: "Embedding Dimensions",
      value: status?.embedding_dimensions.toString(),
      icon: Database,
      color: "text-secondary",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="min-w-full flex justify-center">
            <BounceLoader color="#AFE1AF" loading={true} size={80}/>
          </div>
        ) : stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-lg transition-all duration-500 hover:border/90 hover:bg-primary-foreground/80"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-card`}>
                  <Icon size={24} className="text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-[#808080]/90 font-medium">{stat.title}</p>
              </div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

export default SystemStatus;
