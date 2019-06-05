import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Loader } from "../Loader/Loader";
import Switch from "@material-ui/core/Switch";

interface ISupplierDataPaperProps {
  title: string;
  loading?: boolean;
  titleHref?: string;
  variant?: undefined;
}

interface ISwitchProps {
  title: string;
  loading?: boolean;
  titleHref?: string;
  variant?: "switch";
  onSwitch: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

type IProps = ISupplierDataPaperProps|ISwitchProps;

export class SupplierDataPaper extends React.Component<IProps> {
  public render() {
    return (
      <Paper className="supplier-data__paper">
        <div className="supplier-data__header-container">
          {this.props.titleHref ?
          <a href={this.props.titleHref} target="_blank">
            <Typography className="supplier-data__header" variant="h2">{this.props.title}</Typography>
          </a> :
          <Typography className="supplier-data__header" variant="h2">{this.props.title}</Typography>
          }
          <div className="supplier-data__actions">
            {this.props.variant === "switch" && <Switch onChange={this.props.onSwitch} color="primary"></Switch>}
            {this.props.loading && <Loader />}
          </div>
        </div>
        <div className="supplier-data__paper-content-container">
          {this.props.children}
        </div>
      </Paper>
    );
  }
}
