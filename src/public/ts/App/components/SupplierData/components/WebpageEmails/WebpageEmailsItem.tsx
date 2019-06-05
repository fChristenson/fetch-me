import React from "react";
import { IEmails } from "../../../../../../../lib/services/ScrapeService/Email";
import Typography from "@material-ui/core/Typography";
import { withAppContext } from "../../../../../store/store";
import { IContextProps } from "../../../../../store/State";

interface IWebpageEmailsProps extends IContextProps {
  emailResult: IEmails;
}

class WebpageEmailsItemComponent extends React.Component<IWebpageEmailsProps> {
  constructor(props: IWebpageEmailsProps) {
    super(props);
  }

  public render() {
    return (
      <li className="supplier-data__emails-result">
        <a href={this.props.emailResult.url} target="_blank">
          <Typography variant="caption">{this.props.emailResult.url}</Typography>
        </a>
        <ul className="supplier-data__emails-result-list">
          {this.props.emailResult.emails.map((str, i) => {
            return <li
              role="button"
              onClick={ () => this.props.context.setSelectedEmail(str)}
              className="supplier-data__emails-result-list-item" key={i}>
              {<Typography variant="body2">{str}</Typography>}
            </li>;
          })}
        </ul>
      </li>
    );
  }
}

export const WebpageEmailsItem = withAppContext(WebpageEmailsItemComponent);
