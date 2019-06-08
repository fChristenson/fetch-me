import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import {ResultList} from "./components/ResultList/ResultList";
import { Router, Route } from "react-router-dom";
import { SupplierData } from "./components/SupplierData/SupplierData";
import { ISearchResult } from "../../../lib/services/SearchService/SearchResult";
import { initState, IContextProps } from "../store/State";
import { withAppContext } from "../store/store";
import { LogoCrop } from "./components/LogoCrop/LogoCrop";
import { LoaderPage } from "./components/Loader/LoaderPage";
import { root, supplierData, crop, loading, search } from "../../../lib/routes";
import { SetSearchQuery, SetSearchResults } from "../store/Action";

interface IAppState {
  searchResults: ISearchResult[];
  selectedResult?: ISearchResult;
  failed: boolean;
}

class AppComponent extends React.Component<IContextProps, IAppState> {
  constructor(props: any) {
    super(props);
    this.getQueryResult = this.getQueryResult.bind(this);
    this.state = {searchResults: [], failed: false};
    this.retry = this.retry.bind(this);
  }

  public render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <form onSubmit={this.getQueryResult}>
              <TextField className="app__search" name="q" placeholder="Search" variant="outlined" />
            </form>
          </Toolbar>
        </AppBar>
        <>
          <Router history={initState.history}>
            <Route path={root} exact render={() => <ResultList
              onRetry={this.retry}
              failed={this.state.failed}
              resultList={this.props.context.searchResults} />} />
            <Route path={supplierData} render={() =>  <SupplierData />} />
            <Route path={crop} render={() =>  <LogoCrop />} />
            <Route path={loading} render={() =>  <LoaderPage />} />
          </Router>
        </>
      </>
    );
  }

  private async retry() {
    this.setState({failed: false});
    this.props.context.history.replace(loading);
    const res = await fetch(`${search}?q=${this.props.context.searchQuery}`);
    if (res.status < 400) {
      const searchResults: ISearchResult[] = await res.json();
      this.props.context.dispatch(SetSearchResults(searchResults));
      this.props.context.history.replace(root);
    } else {
      this.setState({failed: true});
      this.props.context.history.replace(root);
    }
  }

  private async getQueryResult(event: any) {
    event.preventDefault();
    this.setState({failed: false});
    const q = event.target.q.value;
    this.props.context.dispatch(SetSearchQuery(q));
    this.props.context.history.replace(loading);
    const res = await fetch(`${search}?q=${q}`);
    if (res.status < 400) {
      const searchResults: ISearchResult[] = await res.json();
      this.props.context.dispatch(SetSearchResults(searchResults));
      this.props.context.history.replace(root);
    } else {
      this.setState({failed: true});
      this.props.context.history.replace(root);
    }
  }
}

export const App = withAppContext(AppComponent);
