import React from "react";
import { Retry } from "./Retry";

interface IRetryPageProps {
  onRetry(): void;
}

export class RetryPage extends React.Component<IRetryPageProps> {
  constructor(props: IRetryPageProps) {
    super(props);
  }

  public render() {
    return (
      <div className="retry-page">
        <Retry onRetry={this.props.onRetry} />
      </div>
    );
  }
}
