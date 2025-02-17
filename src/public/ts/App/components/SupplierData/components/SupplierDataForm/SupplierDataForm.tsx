import React from "react";
import { IContextProps } from "../../../../../store/State";
import { withAppContext } from "../../../../../store/store";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { crop } from "../../../../../../../lib/routes";
import { SetSelectedEmail, SetSelectedImage } from "../../../../../store/Action";

class SupplierDataFormComponent extends React.Component<IContextProps> {
  constructor(props: IContextProps) {
    super(props);
    this.state = {};
    this.updateLogo = this.updateLogo.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    return (
      <form className="supplier-data__form" onSubmit={this.onSubmit}>
        <TextField
          className="supplier-data__form-field"
          fullWidth
          onChange={this.updateEmail}
          label="Supplier email"
          value={this.props.context.selectedEmail}></TextField>
        <TextField
          className="supplier-data__form-field"
          fullWidth
          onChange={this.updateLogo}
          label="Logo"
          name="logo"
          value={this.props.context.selectedImage}></TextField>
          <div className="supplier-data__form-field">
            <Button color="primary" variant="contained" type="submit">Crop</Button>
          </div>
      </form>
    );
  }

  private updateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.context.dispatch(SetSelectedEmail(event.target.value));
  }

  private updateLogo(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.context.dispatch(SetSelectedImage(event.target.value));
  }

  private onSubmit(event: any) {
    event.preventDefault();
    this.props.context.history.push(crop);
  }
}

export const SupplierDataForm = withAppContext(SupplierDataFormComponent);
