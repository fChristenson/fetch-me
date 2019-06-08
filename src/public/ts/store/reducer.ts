import { IContext } from "./State";
import { IAction, ActionType } from "./Action";

export function reducer(state: IContext, action: IAction): IContext {
  switch (action.type) {
    case ActionType.SET_CONTACT_INFO:
      return {...state, contactInformation: action.value};

    case ActionType.SET_SEARCH_QUERY:
        return {...state, searchQuery: action.value};

    case ActionType.SET_SEARCH_RESULTS:
        return {...state, searchResults: action.value};

    case ActionType.SET_SELECTED_EMAIL:
        return {...state, selectedEmail: action.value};

    case ActionType.SET_SELECTED_IMAGE:
        return {...state, selectedImage: action.value};

    case ActionType.SET_SELECTED_RESULT:
        return {...state, selectedResult: action.value};

    default:
      return state;
  }
}