import { ISearchResult, SearchResult } from "../../../lib/services/SearchService/SearchResult";
import { History, createBrowserHistory } from "history";
import { socket } from "./socket";

export interface IContextProps {
  context: IContext;
}

export interface IContext {
  socket: SocketIOClient.Socket;
  setSelectedResult: (result: ISearchResult) => void;
  setSearchQuery: (q: string) => void;
  setSelectedImage: (url: string) => void;
  selectedResult?: ISearchResult;
  history: History;
  searchQuery: string;
  selectedImage: string;
}

export const initState: IContext = {
  socket,
  setSelectedResult: () => undefined,
  setSelectedImage: () => undefined,
  setSearchQuery: () => undefined,
  history: createBrowserHistory(),
  selectedResult: SearchResult("cat", "cat", "http://www.cat.com"),
  searchQuery: "",
  selectedImage: "/aHR0cDovL3d3dy5uZXRmbGl4LmNvbQ==.png",
};
