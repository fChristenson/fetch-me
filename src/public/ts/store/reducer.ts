import { IContext } from "./State";
import { IAction, ActionType } from "./Action";

export function reducer(state: IContext, action: IAction): IContext {
  console.log("Start", state, action);
  console.log('--------------------------');

  let result;

  switch (action.type) {
    case ActionType.SET_CONTACT_INFO:
      result = {...state, contactInformation: action.value};
      break;

    case ActionType.SET_SEARCH_QUERY:
      result = {...state, searchQuery: action.value};
      break;

    case ActionType.SET_SEARCH_RESULTS:
      result = {...state, searchResults: action.value};
      break;

    case ActionType.SET_SELECTED_EMAIL:
      result = {...state, selectedEmail: action.value};
      break;

    case ActionType.SET_SELECTED_IMAGE:
      result = {...state, selectedImage: action.value};
      break;

    case ActionType.SET_SELECTED_RESULT:
      result = {...state, selectedResult: action.value};
      break;

    default:
      result = state;
      break;
  }

  console.log("Result", result);
  console.log('--------------------------');
  return result;
}
