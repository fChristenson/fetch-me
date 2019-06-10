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
import { root, supplierData, crop, search } from "../../../lib/routes";
import { SetSearchQuery, SetSearchResults } from "../store/Action";
import { LoaderPage } from "./components/Loader/LoaderPage";

interface IAppState {
  searchResults: ISearchResult[];
  selectedResult?: ISearchResult;
  failed: boolean;
  loading: boolean;
}

class AppComponent extends React.Component<IContextProps, IAppState> {
  constructor(props: any) {
    super(props);
    this.getQueryResult = this.getQueryResult.bind(this);
    this.state = {loading: false, searchResults: [], failed: false};
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
            <span>
              Selected email: {this.props.context.selectedEmail || "undefined"}
            </span>
            <span>
              Selected image: {this.props.context.selectedImage || "undefined"}
            </span>
          </Toolbar>
        </AppBar>
        {this.state.loading && <LoaderPage />}
        {!this.state.loading && <>
          <Router history={initState.history}>
            <Route path={root} exact render={() => <ResultList
              onRetry={this.retry}
              failed={this.state.failed}
              resultList={this.props.context.searchResults} />} />
            <Route path={supplierData} render={() =>  <SupplierData />} />
            <Route path={crop} render={() =>  <LogoCrop />} />
          </Router>
        </>}
      </>
    );
  }

  private async retry() {
    this.setState({failed: false, loading: true});
    const res = await fetch(`${search}?q=${this.props.context.searchQuery}`);
    if (res.status < 400) {
      const searchResults: ISearchResult[] = await res.json();
      this.props.context.dispatch(SetSearchResults(searchResults));
      this.props.context.history.replace(root);
      this.setState({loading: false});
    } else {
      this.setState({failed: true, loading: false});
      this.props.context.history.replace(root);
    }
  }

  private async getQueryResult(event: any) {
    event.preventDefault();
    this.setState({failed: false, loading: true});
    const q = event.target.q.value;
    this.props.context.dispatch(SetSearchQuery(q));
    const res = await fetch(`${search}?q=${q}`);
    if (res.status < 400) {
      const searchResults: ISearchResult[] = await res.json();
      this.props.context.dispatch(SetSearchResults(searchResults));
      this.props.context.history.replace(root);
      this.setState({loading: false});
    } else {
      this.setState({failed: true, loading: false});
      this.props.context.history.replace(root);
    }
  }
}

export const App = withAppContext(AppComponent);
