import React from "react";
import { withAppContext } from "../../../store/store";
import { IContextProps } from "../../../store/State";
import { WebpageScreenshot } from "./components/WebpageScreenshot/WebpageScreenshot";
import { IScreenshot } from "../../../../../lib/services/ScrapeService/Screenshot";
import { WebpageImages } from "./components/WebpageImages/WebpageImages";
import { WebpageEmails } from "./components/WebpageEmails/WebpageEmails";
import { SupplierDataForm } from "./components/SupplierDataForm/SupplierDataForm";

interface ISupplierDataState {
  screenshot?: IScreenshot;
}

class SupplierDataComponent extends React.Component<IContextProps, ISupplierDataState> {
  constructor(props: IContextProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className="supplier-data">
        <div className="supplier-data__panels">
          <WebpageScreenshot result={this.props.context.selectedResult} />
          <WebpageEmails result={this.props.context.selectedResult} />
          <WebpageImages result={this.props.context.selectedResult} />
        </div>
        <SupplierDataForm />
      </div>
    );
  }
}

export const SupplierData = withAppContext(SupplierDataComponent);
