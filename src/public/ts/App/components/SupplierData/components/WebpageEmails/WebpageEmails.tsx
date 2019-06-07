import React from "react";
import { ISearchResult } from "../../../../../../../lib/services/SearchService/SearchResult";
import { SupplierDataPaper } from "../../SupplierDataPaper";
import { withAppContext } from "../../../../../store/store";
import { IContextProps } from "../../../../../store/State";
import { IContactInformationSearchResult } from "../../../../../../../lib/services/ScrapeService/ContactInformation";
import { WebpageEmailsResult } from "./WebpageEmailsResult";
import TextField from "@material-ui/core/TextField";
import { scrapeEmails } from "../../../../../../../lib/routes";

interface IWebpageEmailsProps extends IContextProps {
  result?: ISearchResult;
}

interface IWebpageEmailsState {
  loading: boolean;
  filter: string;
}

class WebpageEmailsComponent extends React.Component<IWebpageEmailsProps, IWebpageEmailsState> {
  constructor(props: any) {
    super(props);
    this.state = {loading: false, filter: ""};
    this.search = this.search.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  public async componentDidMount() {
    if (this.props.result && !this.props.context.contactInformation) {
      this.setState({loading: true});
      const res = await fetch(`${scrapeEmails}?url=${this.props.result.href}`);
      const contactInfo: IContactInformationSearchResult = await res.json();
      this.props.context.setContactInformation(contactInfo);
      this.setState({loading: false});
    }
  }

  public render() {
    return (
      <SupplierDataPaper title="Emails" loading={this.state.loading}>
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
    if (this.props.result) {
      this.setState({loading: true});
      // @ts-ignore
      this.setState({contactInformation: []});
      const res = await fetch(`${scrapeEmails}?url=${url}`);
      const contactInfo: IContactInformationSearchResult = await res.json();
      this.props.context.setContactInformation(contactInfo);
      this.setState({loading: false});
    }
  }
}

export const WebpageEmails = withAppContext(WebpageEmailsComponent);
