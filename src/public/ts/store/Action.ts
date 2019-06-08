import { IContactInformationSearchResult } from "../../../lib/services/ScrapeService/ContactInformation";
import { ISearchResult } from "../../../lib/services/SearchService/SearchResult";

export enum ActionType {
  SET_CONTACT_INFO,
  SET_SELECTED_RESULT,
  SET_SELECTED_EMAIL,
  SET_SELECTED_IMAGE,
  SET_SEARCH_RESULTS,
  SET_SEARCH_QUERY,
}

export interface IAction {
  type: ActionType;
  value: any;
}

function makeAction<T>(type: ActionType): (value: T) => IAction {
  return (value: T) => {
    return {
      type,
      value,
    };
  };
}

export const SetContactInfo = makeAction<IContactInformationSearchResult|undefined>(ActionType.SET_CONTACT_INFO);
export const SetSelectedResult = makeAction<ISearchResult>(ActionType.SET_SELECTED_RESULT);
export const SetSelectedEmail = makeAction<string>(ActionType.SET_SELECTED_EMAIL);
export const SetSelectedImage = makeAction<string>(ActionType.SET_SELECTED_IMAGE);
export const SetSearchResults = makeAction<ISearchResult[]>(ActionType.SET_SEARCH_RESULTS);
export const SetSearchQuery = makeAction<string>(ActionType.SET_SEARCH_QUERY);
