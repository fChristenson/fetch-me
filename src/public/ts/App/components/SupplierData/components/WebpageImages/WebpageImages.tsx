import React from "react";
import { ISearchResult } from "../../../../../../../lib/services/SearchService/SearchResult";
import { SupplierDataPaper } from "../../SupplierDataPaper";
import { withAppContext } from "../../../../../store/store";
import { IContextProps } from "../../../../../store/State";
import { WebpageImage } from "./WebPageImage";
import { scrapeImages } from "../../../../../../../lib/routes";

interface IWebpageImagesProps extends IContextProps {
  result?: ISearchResult;
}

interface IWebpageImagesState {
  loading: boolean;
  images: string[];
  darkBackground: boolean;
}

class WebpageImagesComponent extends React.Component<IWebpageImagesProps, IWebpageImagesState> {
  constructor(props: any) {
    super(props);
    this.state = {loading: true, images: [], darkBackground: false};
    this.changeBackground = this.changeBackground.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  public async componentDidMount() {
    if (this.props.result && this.props.result.href) {
      const res = await fetch(`${scrapeImages}?url=${this.props.result.href}`);
      const images: string[] = await res.json();
      this.setState({images, loading: false});
    }
  }

  public render() {
    const q = encodeURI(`${this.props.context.searchQuery} logo png`);
    const titleHref = this.props.result && `https://www.google.com/search?q=${q}&source=lnms&tbm=isch`;
    const containerClassName = this.state.darkBackground ?
    "supplier-data__images-thumbnail-container--dark" :
    "supplier-data__images-thumbnail-container";
    return (
      <SupplierDataPaper
        title="Images"
        titleHref={titleHref}
        variant="switch"
        onSwitch={this.changeBackground}
        loading={this.state.loading}>
        <ul className={ containerClassName }>
        {this.state.images.map((str, i) => <WebpageImage
          darkBackground={ this.state.darkBackground }
          onClick={this.selectImage}
          className={this.props.context.selectedImage === str ?
            "supplier-data__images-thumbnail--selected" :
            "supplier-data__images-thumbnail"}
          key={i} src={str} />)
        }
        </ul>
      </SupplierDataPaper>
    );
  }

  private selectImage(event: any) {
    this.props.context.setSelectedImage(event.target.src);
  }

  private changeBackground() {
    this.setState({darkBackground: !this.state.darkBackground});
  }
}

export const WebpageImages = withAppContext(WebpageImagesComponent);
