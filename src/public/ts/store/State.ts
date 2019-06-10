import { ISearchResult } from "../../../lib/services/SearchService/SearchResult";
import { History, createBrowserHistory } from "history";
import { IContactInformationSearchResult } from "../../../lib/services/ScrapeService/ContactInformation";
import { IAction } from "./Action";

export interface IContextProps {
  context: IContext;
}

export interface IContext {
  dispatch: (...actions: IAction[]) => void;
  contactInformation?: IContactInformationSearchResult;
  selectedEmail?: string;
  selectedResult?: ISearchResult;
  searchResults: ISearchResult[];
  history: History;
  searchQuery: string;
  selectedImage: string;
}

export const initState: IContext = {
  dispatch: (..._: IAction[]) => undefined,
  searchResults: [],
  history: createBrowserHistory(),
  searchQuery: "",
  selectedImage: "",
};
