import React from "react";
import { IContactInformationSearchResult } from "../../../../../../../lib/services/ScrapeService/ContactInformation";
import Typography from "@material-ui/core/Typography";
import { withAppContext } from "../../../../../store/store";
import { IContextProps } from "../../../../../store/State";
import { SetSelectedEmail } from "../../../../../store/Action";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

interface IWebpageEmailsResultEmailsSectionProps extends IContextProps {
  contactInformationResult: IContactInformationSearchResult;
}

interface IWebpageEmailsResultEmailsSectionState {
  open: boolean;
}

class WebpageEmailsResultEmailsSectionComponent extends
  React.Component<IWebpageEmailsResultEmailsSectionProps, IWebpageEmailsResultEmailsSectionState> {
  constructor(props: IWebpageEmailsResultEmailsSectionProps) {
    super(props);
    this.state = {open: true};
    this.toggle = this.toggle.bind(this);
  }

  public render() {
    return (
      <div className="supplier-data__emails-result-section">
          <div className="supplier-data__emails-result-section-header">
            <Typography display="block" variant="caption">
              Emails found: <span className={this.props.contactInformationResult.emails.length > 0 ?
                  "supplier-data__items-found-number" :
                  "supplier-data__items-found-number--red"}>
                  {this.props.contactInformationResult.emails.length}
                </span>
            </Typography>
            <ChevronLeft onClick={this.toggle} className={this.state.open ?
            "supplier-data__emails-chevron--down" :
            "supplier-data__emails-chevron"} />
          </div>
          {this.state.open && <ul className="supplier-data__emails-result-list">
            {this.props.contactInformationResult.emails.map((str, i) => {
              return <li
                role="button"
                onClick={ () => this.props.context.dispatch(SetSelectedEmail(str))}
                className="supplier-data__emails-result-list-item" key={i}>
                {<Typography variant="body2">{str}</Typography>}
              </li>;
            })}
          </ul>}
        </div>
    );
  }

  private toggle() {
    this.setState({open: !this.state.open});
  }
}

export const WebpageEmailsResultEmailsSection = withAppContext(WebpageEmailsResultEmailsSectionComponent);
