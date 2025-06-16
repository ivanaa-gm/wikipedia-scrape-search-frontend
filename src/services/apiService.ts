import request from "./request";

const baseURL = "http://127.0.0.1:8000";

interface TopicsList {
  topics: string[];
}

interface SearchInput {
  user_input: string;
}

interface SystemStatus {
  total_articles: number;
  total_word_count: number;
  average_word_count: number;
  semantic_searches_performed: number;
  embedding_dimensions: number;
  model_name: string;
}

interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface EmbeddedArticle {
  id: number;
  title: string;
  first_created: string;
  url: string;
  summary: string;
  word_count: number;
  last_edited: string;
  scraped_at: string;
}

export interface PostArticlesResponse {
  embedded_articles: EmbeddedArticle[];
  unsuccessfully_scraped: any[]; 
}


export default {
  postArticles(topicsList: TopicsList): Promise<void> {
    return request("POST", `${baseURL}/scrape`, topicsList);
  },
  searchArticles(input: SearchInput): Promise<any> {
    return request("POST", `${baseURL}/search`, input);
  },
  getSystemStatus(): Promise<SystemStatus> {
    return request("GET", `${baseURL}/system-status`);
  },
  getAuthToken(): Promise<AuthToken> {
    return request("POST", `${baseURL}/token`);
  },
};
