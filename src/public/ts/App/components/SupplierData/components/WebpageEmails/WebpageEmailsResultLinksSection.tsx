import React from "react";
import { IContactInformationSearchResult } from "../../../../../../../lib/services/ScrapeService/ContactInformation";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

interface IWebpageEmailsResultLinksSectionProps {
  contactInformationResult: IContactInformationSearchResult;
  search: (url: string) => void;
  filter: string;
}

export class WebpageEmailsResultLinksSection extends React.Component<IWebpageEmailsResultLinksSectionProps> {
  constructor(props: IWebpageEmailsResultLinksSectionProps) {
    super(props);
  }

  public render() {
    return (
      <div className="supplier-data__emails-result-section">
          <div>
            <Typography display="block" variant="caption">
              Links found: <span className={this.props.contactInformationResult.links.length > 0 ?
                  "supplier-data__items-found-number" :
                  "supplier-data__items-found-number--red"}>
                  {this.props.contactInformationResult.links.length}
                </span>
            </Typography>
          </div>
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
    );
  }
}
