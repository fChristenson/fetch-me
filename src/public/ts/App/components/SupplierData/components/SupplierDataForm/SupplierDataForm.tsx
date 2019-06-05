import React from "react";
import { IContextProps } from "../../../../../store/State";
import { withAppContext } from "../../../../../store/store";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { crop } from "../../../../../../../lib/routes";

class SupplierDataFormComponent extends React.Component<IContextProps> {
  constructor(props: IContextProps) {
    super(props);
    this.state = {};
    this.updateLogo = this.updateLogo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    return (
      <form className="supplier-data__form" onSubmit={this.onSubmit}>
        <TextField
          className="supplier-data__form-field"
          fullWidth
          label="Supplier email"
          value="foo@bar.se"></TextField>
        <TextField
          className="supplier-data__form-field"
          fullWidth
          onChange={this.updateLogo}
          label="Logo"
          name="logo"
          value={this.props.context.selectedImage}></TextField>
          <div className="supplier-data__form-field">
            <Button color="primary" variant="contained" type="submit">Done</Button>
          </div>
      </form>
    );
  }

  private updateLogo(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.context.setSelectedImage(event.target.value);
  }

  private onSubmit(event: any) {
    event.preventDefault();
    this.props.context.history.push(crop);
  }
}

export const SupplierDataForm = withAppContext(SupplierDataFormComponent);
