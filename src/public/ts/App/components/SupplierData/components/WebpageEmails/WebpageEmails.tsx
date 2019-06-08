import React from "react";
import { ISearchResult } from "../../../../../../../lib/services/SearchService/SearchResult";
import { SupplierDataPaper } from "../../SupplierDataPaper";
import { withAppContext } from "../../../../../store/store";
import { IContextProps } from "../../../../../store/State";
import { IContactInformationSearchResult } from "../../../../../../../lib/services/ScrapeService/ContactInformation";
import { WebpageEmailsResult } from "./WebpageEmailsResult";
import TextField from "@material-ui/core/TextField";
import { scrapeEmails } from "../../../../../../../lib/routes";
import { SetContactInfo } from "../../../../../store/Action";

interface IWebpageEmailsProps extends IContextProps {
  result?: ISearchResult;
}

interface IWebpageEmailsState {
  failed: boolean;
  loading: boolean;
  filter: string;
  url: string;
}

class WebpageEmailsComponent extends React.Component<IWebpageEmailsProps, IWebpageEmailsState> {
  constructor(props: any) {
    super(props);
    const url = this.props.result && this.props.result.href || "";
    this.state = {failed: false, loading: false, filter: "", url};
    this.search = this.search.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  public async componentDidMount() {
    if (this.state.url) { // TODO: only update on new stuff
      this.setState({loading: true});
      const res = await fetch(`${scrapeEmails}?url=${this.state.url}`);
      if (res.status < 400) {
        const contactInfo: IContactInformationSearchResult = await res.json();
        this.props.context.dispatch(SetContactInfo(contactInfo));
        this.setState({loading: false});
      } else {
        this.setState({loading: false, failed: true});
      }
    }
  }

  public render() {
    return (
      <SupplierDataPaper
        title="Emails"
        loading={this.state.loading}
        onRetry={() => this.search(this.state.url)}
        failed={this.state.failed}>
        <header className="supplier-data__emails-header">
        <TextField
          className="supplier-data__emails-header-filter"
          onChange={this.updateFilter} placeholder="Filter links" name="links" />
        </header>
        {this.props.context.contactInformation &&
          <WebpageEmailsResult
          filter={this.state.filter}
          search={this.search}
          contactInformationResult={this.props.context.contactInformation} />}
      </SupplierDataPaper>
    );
  }

  private updateFilter(event: any) {
    this.setState({filter: event.target.value});
  }

  private async search(url: string) {
      this.setState({loading: true, url, failed: false});
      this.props.context.dispatch(SetContactInfo(undefined));
      const res = await fetch(`${scrapeEmails}?url=${url}`);
      if (res.status < 400) {
        const contactInfo: IContactInformationSearchResult = await res.json();
        this.props.context.dispatch(SetContactInfo(contactInfo));
        this.setState({loading: false});
      } else {
        this.setState({loading: false, failed: true});
      }
  }
}

export const WebpageEmails = withAppContext(WebpageEmailsComponent);
