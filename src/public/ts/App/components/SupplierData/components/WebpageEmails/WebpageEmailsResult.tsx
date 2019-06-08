import React from "react";
import { IContactInformationSearchResult } from "../../../../../../../lib/services/ScrapeService/ContactInformation";
import Typography from "@material-ui/core/Typography";
import { withAppContext } from "../../../../../store/store";
import { IContextProps } from "../../../../../store/State";
import { WebpageEmailsResultEmailsSection } from "./WebpageEmailsResultEmailsSection";
import { WebpageEmailsResultLinksSection } from "./WebpageEmailsResultLinksSection";

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
        <WebpageEmailsResultEmailsSection contactInformationResult={this.props.contactInformationResult} />
        <WebpageEmailsResultLinksSection
          contactInformationResult={this.props.contactInformationResult}
          filter={this.props.filter}
          search={this.props.search} />
      </div>
    );
  }
}

export const WebpageEmailsResult = withAppContext(WebpageEmailsResultComponent);
