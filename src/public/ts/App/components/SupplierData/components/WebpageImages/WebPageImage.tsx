import React from "react";
import Typography from "@material-ui/core/Typography";

interface IWebpageImageProps extends
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  darkBackground: boolean;
}

interface IWebpageImageState {
  width?: number;
  height?: number;
}

export class WebpageImage extends React.Component<IWebpageImageProps, IWebpageImageState> {
  private imgRef: React.RefObject<HTMLImageElement>;

  constructor(props: any) {
    super(props);
    this.state = {};
    this.onLoad = this.onLoad.bind(this);
    this.imgRef = React.createRef();
  }

  public render() {
    const {
      darkBackground,
      ...props
    } = this.props;
    const className = darkBackground ?
    "supplier-data__thumbnail-dimensions--white" : "supplier-data__thumbnail-dimensions";
    return (
      <li>
        <img ref={this.imgRef} {...props} onLoad={this.onLoad} />
        <Typography
          variant="body2"
          className={ className }>{this.state.width}x{this.state.height}</Typography>
      </li>
    );
  }

  private onLoad() {
    const node = this.imgRef.current as HTMLImageElement;
    const height = node.naturalHeight;
    const width = node.naturalWidth;
    this.setState({width, height});
  }
}
