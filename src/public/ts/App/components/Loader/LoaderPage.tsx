import React from "react";
import { Loader } from "./Loader";

export class LoaderPage extends React.Component {
  public render() {
    return (
      <div className="loader-page">
        <Loader />
      </div>
    );
  }
}
