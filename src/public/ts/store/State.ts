import { ISearchResult, SearchResult } from "../../../lib/services/SearchService/SearchResult";
import { History, createBrowserHistory } from "history";
import { socket } from "./socket";

export interface IContextProps {
  context: IContext;
}

export interface IContext {
  socket: SocketIOClient.Socket;
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
  socket,
  setSelectedResult: () => undefined,
  setSelectedEmail: () => undefined,
  setSelectedImage: () => undefined,
  setSearchQuery: () => undefined,
  history: createBrowserHistory(),
  selectedResult: SearchResult("water", "water", "https://corporate.britannica.com/contact/"),
  searchQuery: "",
  selectedImage: "",
};
