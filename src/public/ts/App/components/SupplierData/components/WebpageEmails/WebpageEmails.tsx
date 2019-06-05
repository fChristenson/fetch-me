import React from "react";
import { ISearchResult } from "../../../../../../../lib/services/SearchService/SearchResult";
import { SupplierDataPaper } from "../../SupplierDataPaper";
import { withAppContext } from "../../../../../store/store";
import { IContextProps } from "../../../../../store/State";
import { IEmails } from "../../../../../../../lib/services/ScrapeService/Email";
import { Events } from "../../../../../../../lib/events";
import { WebpageEmailsItem } from "./WebpageEmailsItem";

interface IWebpageEmailsProps extends IContextProps {
  result?: ISearchResult;
}

interface IWebpageEmailsState {
  loading: boolean;
  emails: IEmails[];
}

class WebpageEmailsComponent extends React.Component<IWebpageEmailsProps, IWebpageEmailsState> {
  constructor(props: any) {
    super(props);
    this.state = {loading: true, emails: []};
    this.onLoad = this.onLoad.bind(this);
    this.setResults = this.setResults.bind(this);
  }

  public componentDidMount() {
    this.props.context.socket.open();
    this.props.context.socket.on("email", (emails: IEmails) => {
      this.setResults(emails);
    });
  }

  public render() {
    return (
      <SupplierDataPaper title="Emails" loading={this.state.loading}>
        <ul className="supplier-data__emails">
          {this.state.emails.map((e, i) => <WebpageEmailsItem key={i} emailResult={e} />)}
        </ul>
      </SupplierDataPaper>
    );
  }

  private setResults(emails: IEmails) {
    this.setState({emails: this.state.emails.concat(emails)});
  }

  private onLoad() {
    this.setState({loading: false});
  }
}

export const WebpageEmails = withAppContext(WebpageEmailsComponent);
