import React from "react";
import { ISearchResult } from "../../../../../lib/services/SearchService/SearchResult";
import { ResultListItem } from "./ResultListItem";
import { RetryPage } from "../Retry/RetryPage";

interface IResultListProps {
  resultList: ISearchResult[];
  onRetry: () => void;
  failed: boolean;
}

export class ResultList extends React.Component<IResultListProps> {
  public render() {
    if (this.props.failed) {
      return <RetryPage onRetry={this.props.onRetry} />;
    }
    return (
      <ul className="result-list">
        {this.props.resultList.map((e, i) => <ResultListItem key={i} result={e} />)}
      </ul>
    );
  }
}
