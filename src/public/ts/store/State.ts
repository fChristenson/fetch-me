import { ISearchResult, SearchResult } from "../../../lib/services/SearchService/SearchResult";
import { History, createBrowserHistory } from "history";

export interface IContextProps {
  context: IContext;
}

export interface IContext {
  setSelectedResult: (result: ISearchResult) => void;
  setSelectedEmail: (email: string) => void;
  setSearchQuery: (q: string) => void;
  setSelectedImage: (url: string) => void;
  selectedEmail?: string;
  selectedResult?: ISearchResult;
  history: History;
  searchQuery: string;
  selectedImage: string;
}

export const initState: IContext = {
  setSelectedResult: () => undefined,
  setSelectedEmail: () => undefined,
  setSelectedImage: () => undefined,
  setSearchQuery: () => undefined,
  history: createBrowserHistory(),
  selectedResult: SearchResult("water", "water", "https://corporate.britannica.com/contact/"),
  searchQuery: "",
  selectedImage: "",
};
