import React from "react";
import { initState, IContextProps, IContext } from "./State";
import { ISearchResult } from "../../../lib/services/SearchService/SearchResult";

const {Provider, Consumer} = React.createContext(initState);

interface IContextProviderState {
  context: IContext;
}

export class ContextProvider extends React.Component<any, IContextProviderState> {
  constructor(props: any) {
    super(props);
    this.setSelectedResult = this.setSelectedResult.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.setSelectedImage = this.setSelectedImage.bind(this);
    const context = {
      ...initState,
      setSelectedResult: this.setSelectedResult,
      setSelectedImage: this.setSelectedImage,
      setSearchQuery: this.setSearchQuery,
    };
    this.state = {context};
  }

  public render() {
    return (
      <Provider value={this.state.context}>
        {this.props.children}
      </Provider>
    );
  }

  private setSelectedResult(selectedResult: ISearchResult) {
    this.setState({context: {...this.state.context, selectedResult}});
  }

  private setSelectedImage(url: string) {
    this.setState({context: {...this.state.context, selectedImage: url}});
  }

  private setSearchQuery(q: string) {
    this.setState({context: {...this.state.context, searchQuery: q}});
  }
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAppContext<P extends IContextProps>(Component: React.ComponentClass<P>) {
  return (props: Omit<P, "context">) => {
    return <Consumer>
      {(context) => {
        // @ts-ignore
        return <Component {...props} context={context} />;
      }}
    </Consumer>;
  };
}
