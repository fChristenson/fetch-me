import React from "react";
import { ISearchResult } from "../../../../../lib/services/SearchService/SearchResult";
import { ResultListItem } from "./ResultListItem";

interface IResultListProps {
  resultList: ISearchResult[];
}

export class ResultList extends React.Component<IResultListProps> {
  public render() {
    return (
      <ul className="result-list">
        {this.props.resultList.map((e, i) => <ResultListItem key={i} result={e} />)}
      </ul>
    );
  }
}
