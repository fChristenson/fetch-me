import React from "react";
import { withAppContext } from "../../../store/store";
import { IContextProps } from "../../../store/State";
// @ts-ignore
import ReactCrop from "react-image-crop";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ICrop, getCroppedImg } from "./crop";
import { downloadImage } from "../../../../../lib/routes";
import { LoaderPage } from "../Loader/LoaderPage";

interface ILogoCropState {
  img?: any;
  loading: boolean;
  crop: ICrop;
}

class LogoCropComponent extends React.Component<IContextProps, ILogoCropState> {
  constructor(props: IContextProps) {
    super(props);
    this.state = {loading: true, crop: {x: 0, y: 0, width: 0, height: 0, aspect: 16 / 9}};
    this.onChange = this.onChange.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.crop = this.crop.bind(this);
  }

  public render() {
    return (
      <div className="logo-crop">
        {this.state.loading && <LoaderPage />}
        <ReactCrop
        className="logo-crop__react-crop"
        onImageLoaded={this.onImageLoaded}
        onChange={this.onChange}
        crop={this.state.crop}
        src={`${downloadImage}?q=${this.props.context.selectedImage}`} />
        <Button
          variant="contained"
          color="primary"
          onClick={ this.crop }
          className="logo-crop__button">
            <Typography variant="caption">Download</Typography>
          </Button>
      </div>
    );
  }

  private crop() {
    if (this.state.crop.width > 0 && this.state.crop.height > 0) {
      getCroppedImg(this.state.img, this.state.crop);
    } else {
      const link = document.createElement("a");
      link.download = "logo.png";
      link.href = this.state.img.src;
      link.click();
    }
  }

  private onImageLoaded(img: any) {
    this.setState({img, loading: false});
  }

  private onChange(cropData: ICrop) {
    this.setState({ crop: cropData });
  }
}

export const LogoCrop = withAppContext(LogoCropComponent);
