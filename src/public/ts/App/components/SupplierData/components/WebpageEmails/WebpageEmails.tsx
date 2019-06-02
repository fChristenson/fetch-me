import React from "react";
import { ISearchResult } from "../../../../../../../lib/services/SearchService/SearchResult";
import { SupplierDataPaper } from "../../SupplierDataPaper";

interface IWebpageEmailsProps {
  result?: ISearchResult;
}

interface IWebpageEmailsState {
  loading: boolean;
  emails: string[];
}

export class WebpageEmails extends React.Component<IWebpageEmailsProps, IWebpageEmailsState> {
  constructor(props: any) {
    super(props);
    this.state = {loading: true, emails: []};
    this.onLoad = this.onLoad.bind(this);
  }

  public async componentDidMount() {
    if (this.props.result && this.props.result.href) {
      const res = await fetch(`/api/v1/scrape-emails?url=${this.props.result.href}`);
      const emails: string[] = await res.json();
      this.setState({emails});
    }
  }

  public render() {
    return (
      <SupplierDataPaper title="Emails" loading={this.state.loading}>
        <ul>
          {this.state.emails.map((e, i) => <li key={i} >{e}</li>)}
        </ul>
      </SupplierDataPaper>
    );
  }

  private onLoad() {
    this.setState({loading: false});
  }
}
