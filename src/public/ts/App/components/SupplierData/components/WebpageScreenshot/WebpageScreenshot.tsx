import React from "react";
import { IImage } from "../../../../../../../lib/services/ScrapeService/Image";
import { ISearchResult } from "../../../../../../../lib/services/SearchService/SearchResult";
import {screenshot} from "../../../../../../../lib/routes"
import { SupplierDataPaper } from "../../SupplierDataPaper";

interface IWebpageScreenshotProps {
  result?: ISearchResult;
}

interface IWebpageScreenshotState {
  loading: boolean;
  failed: boolean;
  screenshot?: IImage;
}

export class WebpageScreenshot extends React.Component<IWebpageScreenshotProps, IWebpageScreenshotState> {
  constructor(props: any) {
    super(props);
    this.state = {loading: true, failed: false};
    this.onLoad = this.onLoad.bind(this);
    this.retry = this.retry.bind(this);
  }

  public async componentDidMount() {
    if (this.props.result && this.props.result.href) {
      const res = await fetch(`${screenshot}?url=${this.props.result.href}`);
      if (res.status < 400) {
        const image: IImage = await res.json();
        this.setState({screenshot: image});
      } else {
        this.setState({loading: false, failed: true});
      }
    }
  }

  public render() {
    const imgLink = this.state.screenshot && `/${this.state.screenshot.imageUrl}`;
    const pageHref = this.props.result && this.props.result.href;

    return (
      <SupplierDataPaper
        title="Webpage"
        failed={this.state.failed}
        onRetry={this.retry}
        loading={this.state.loading}>
        {(imgLink && pageHref) &&
          <a href={pageHref} target="_blank">
            <img onLoad={this.onLoad} className="supplier-data__screenshot" src={imgLink} />
          </a>}
      </SupplierDataPaper>
    );
  }

  private async retry() {
    if (this.props.result && this.props.result.href) {
      this.setState({failed: false, loading: true});
      const res = await fetch(`${screenshot}?url=${this.props.result.href}`);
      if (res.status < 400) {
        const image: IImage = await res.json();
        this.setState({screenshot: image});
      } else {
        this.setState({failed: true, loading: false});
      }
    }
  }

  private onLoad() {
    this.setState({loading: false});
  }
}
