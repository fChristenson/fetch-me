import React from "react";
import { withAppContext } from "../../../store/store";
import { IContextProps } from "../../../store/State";
// @ts-ignore
import ReactCrop from "react-image-crop";
import { Typography, Button } from "@material-ui/core";
import { ICrop, getCroppedImg } from "./crop";

interface ILogoCropState {
  img?: any;
  crop: ICrop;
}

class LogoCropComponent extends React.Component<IContextProps, ILogoCropState> {
  constructor(props: IContextProps) {
    super(props);
    this.state = {crop: {x: 0, y: 0, width: 0, height: 0, aspect: 16 / 9}};
    this.onChange = this.onChange.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.crop = this.crop.bind(this);
  }

  public render() {
    return (
      <div className="logo-crop">
        <ReactCrop
          className="logo-crop__react-crop"
          onChange={this.onChange}
          onImageLoaded={this.onImageLoaded}
          crop={this.state.crop}
          src={this.props.context.selectedImage} />
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
    this.setState({img});
  }

  private onChange(crop: ICrop) {
    this.setState({ crop });
  }
}

export const LogoCrop = withAppContext(LogoCropComponent);
