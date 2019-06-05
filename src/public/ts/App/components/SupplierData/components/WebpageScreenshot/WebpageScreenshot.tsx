import React from "react";
import { IImage } from "../../../../../../../lib/services/ScrapeService/Image";
import { ISearchResult } from "../../../../../../../lib/services/SearchService/SearchResult";
import { SupplierDataPaper } from "../../SupplierDataPaper";

interface IWebpageScreenshotProps {
  result?: ISearchResult;
}

interface IWebpageScreenshotState {
  loading: boolean;
  screenshot?: IImage;
}

export class WebpageScreenshot extends React.Component<IWebpageScreenshotProps, IWebpageScreenshotState> {
  constructor(props: any) {
    super(props);
    this.state = {loading: true};
    this.onLoad = this.onLoad.bind(this);
  }

  public async componentDidMount() {
    if (this.props.result && this.props.result.href) {
      const res = await fetch(`/api/v1/screenshot?url=${this.props.result.href}`);
      const screenshot: IImage = await res.json();
      this.setState({screenshot});
    }
  }

  public render() {
    const imgLink = this.state.screenshot && `/${this.state.screenshot.imageUrl}`;
    const pageHref = this.props.result && this.props.result.href;

    return (
      <SupplierDataPaper title="Webpage" loading={this.state.loading}>
        {(imgLink && pageHref) &&
          <a href={pageHref} target="_blank">
            <img onLoad={this.onLoad} className="supplier-data__screenshot" src={imgLink} />
          </a>}
      </SupplierDataPaper>
    );
  }

  private onLoad() {
    this.setState({loading: false});
  }
}
