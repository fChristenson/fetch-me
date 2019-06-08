import React from "react";
import { IContactInformationSearchResult } from "../../../../../../../lib/services/ScrapeService/ContactInformation";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withAppContext } from "../../../../../store/store";
import { IContextProps } from "../../../../../store/State";
import { SetSelectedEmail } from "../../../../../store/Action";

interface IWebpageEmailsResultProps extends IContextProps {
  search: (url: string) => void;
  filter: string;
  contactInformationResult: IContactInformationSearchResult;
}

class WebpageEmailsResultComponent extends React.Component<IWebpageEmailsResultProps> {
  constructor(props: IWebpageEmailsResultProps) {
    super(props);
  }

  public render() {
    return (
      <div className="supplier-data__emails-result">
        <div className="supplier-data__emails-result-section">
          <Typography display="block" variant="caption">Page searched</Typography>
          <a href={this.props.contactInformationResult.url} target="_blank">
            <Typography variant="caption">{this.props.contactInformationResult.url}</Typography>
          </a>
        </div>
        <div className="supplier-data__emails-result-section">
          <Typography display="block" variant="caption">Emails found</Typography>
          <ul className="supplier-data__emails-result-list">
            {this.props.contactInformationResult.emails.map((str, i) => {
              return <li
                role="button"
                onClick={ () => this.props.context.dispatch(SetSelectedEmail(str))}
                className="supplier-data__emails-result-list-item" key={i}>
                {<Typography variant="body2">{str}</Typography>}
              </li>;
            })}
          </ul>
        </div>
        <div className="supplier-data__emails-result-section">
          <Typography display="block" variant="caption">Links found</Typography>
          <ul className="supplier-data__emails-result-list">
            {this.props.contactInformationResult.links
              .filter((str) => !this.props.filter || str.includes(this.props.filter))
              .map((str, i) => {
              return <li className="supplier-data__emails-link-result-list-item" key={i}>
                <a href={str} target="_blank">
                  {<Typography variant="body2">{str}</Typography>}
                </a>
                <Button
                  className="supplier-data__emails-result-list-item-btn"
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.search(str)}>Search</Button>
              </li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export const WebpageEmailsResult = withAppContext(WebpageEmailsResultComponent);
