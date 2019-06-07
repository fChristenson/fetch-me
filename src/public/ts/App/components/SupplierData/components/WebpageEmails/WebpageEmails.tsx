import React from "react";
import { ISearchResult } from "../../../../../../../lib/services/SearchService/SearchResult";
import { SupplierDataPaper } from "../../SupplierDataPaper";
import { withAppContext } from "../../../../../store/store";
import { IContextProps } from "../../../../../store/State";
import { IContactInformationSearchResult } from "../../../../../../../lib/services/ScrapeService/ContactInformation";
import { WebpageEmailsItem } from "./WebpageEmailsItem";
import { contactEvent, endEvent } from "../../../../../store/socket";
import TextField from "@material-ui/core/TextField";

interface IWebpageEmailsProps extends IContextProps {
  result?: ISearchResult;
}

interface IWebpageEmailsState {
  loading: boolean;
  filter: string;
  contactInformation: IContactInformationSearchResult[];
}

class WebpageEmailsComponent extends React.Component<IWebpageEmailsProps, IWebpageEmailsState> {
  constructor(props: any) {
    super(props);
    this.state = {loading: true, contactInformation: [], filter: ""};
    this.search = this.search.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  public componentDidMount() {
    if (this.props.result) {
      this.props.context.socket.open();
      this.props.context.socket.emit(contactEvent, this.props.result.href);
      this.props.context.socket.on(contactEvent, (contactInfo: IContactInformationSearchResult) => {
        this.setState({contactInformation: this.state.contactInformation.concat(contactInfo)});
      });
      this.props.context.socket.on(endEvent, () => {
        this.setState({loading: false});
      });
    }
  }

  public componentWillUnmount() {
    this.props.context.socket.close();
  }

  public render() {
    return (
      <SupplierDataPaper title="Emails" loading={this.state.loading}>
        <header className="supplier-data__emails-header">
          <TextField
            className="supplier-data__emails-header-filter"
            onChange={this.updateFilter} placeholder="Filter links" name="links" />
        </header>
        <ul className="supplier-data__emails">
          {this.state.contactInformation
            .map((e, i) => <WebpageEmailsItem
            filter={this.state.filter}
            key={i}
            search={this.search}
            contactInformationResult={e} />)}
        </ul>
      </SupplierDataPaper>
    );
  }

  private updateFilter(event: any) {
    this.setState({filter: event.target.value});
  }

  private search(url: string) {
    if (this.props.result) {
      this.props.context.socket.open();
      this.setState({loading: true});
      // @ts-ignore
      this.setState({contactInformation: []});
      this.props.context.socket.emit(contactEvent, url);
    }
  }
}

export const WebpageEmails = withAppContext(WebpageEmailsComponent);
