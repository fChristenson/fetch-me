import React from "react";
import Button from "@material-ui/core/Button";
import { ISearchResult } from "../../../../../lib/services/SearchService/SearchResult";
import { withAppContext } from "../../../store/store";
import { IContextProps } from "../../../store/State";
import Typography from "@material-ui/core/Typography";
import { supplierData } from "../../../../../lib/routes";
import { SetContactInfo, SetSelectedResult } from "../../../store/Action";

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
        <div className="result-list__li-container">
          <a target="_blank" href={this.props.result.href ? this.props.result.href : "#"} >
            <Typography
              className="result-list__li-title"
              variant="h2">{this.props.result.title}</Typography>
          </a>
          <Typography
            className="result-list__li-description"
            variant="body1">{this.props.result.description}</Typography>
          <Typography
            className="result-list__li-url"
            variant="body1">{this.props.result.href}</Typography>
        </div>
        <Button color="primary" variant="contained" onClick={this.setResult}>
          Select
        </Button>
      </li>
    );
  }

  private setResult() {
    this.props.context.dispatch(SetContactInfo(undefined), SetSelectedResult(this.props.result));
    this.props.context.history.push(supplierData);
  }
}

export const ResultListItem = withAppContext(ResultListItemComponent);
