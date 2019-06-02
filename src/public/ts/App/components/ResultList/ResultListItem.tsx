import React from "react";
import Button from "@material-ui/core/Button";
import { ISearchResult } from "../../../../../lib/services/SearchService/SearchResult";
import { withAppContext } from "../../../store/store";
import { IContextProps } from "../../../store/State";
import Typography from "@material-ui/core/Typography";

interface IResultListItemProps extends IContextProps {
  result: ISearchResult;
}

class ResultListItemComponent extends React.Component<IResultListItemProps> {
  constructor(props: any) {
    super(props);
    this.setResult = this.setResult.bind(this);
  }

  public render() {
    return (
      <li className="result-list__li">
        <div>
          <Typography display="block" variant="caption">{this.props.result.title}</Typography>
          <Typography display="block" variant="body1">{this.props.result.description}</Typography>
          <Typography display="block" variant="body1">{this.props.result.href}</Typography>
        </div>
        <Button color="primary" variant="contained" onClick={this.setResult}>
          Select
        </Button>
      </li>
    );
  }

  private setResult() {
    this.props.context.setSelectedResult(this.props.result);
    this.props.context.history.push("/supplier-data");
  }
}

export const ResultListItem = withAppContext(ResultListItemComponent);
