import React from "react";
import { initState, IContextProps, IContext } from "./State";
import { IAction } from "./Action";
import { reducer } from "./reducer";

const {Provider, Consumer} = React.createContext(initState);

interface IContextProviderState {
  context: IContext;
}

export class ContextProvider extends React.Component<any, IContextProviderState> {
  constructor(props: any) {
    super(props);
    this.dispatch = this.dispatch.bind(this);
    const context: IContext = {
      ...initState,
      dispatch: this.dispatch,
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

  private dispatch(...actions: IAction[]) {
    const context = actions.reduce(reducer, this.state.context);
    this.setState({context});
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
