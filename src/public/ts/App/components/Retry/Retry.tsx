import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface IRetryProps {
  onRetry(): void;
}

export class Retry extends React.Component<IRetryProps> {
  constructor(props: IRetryProps) {
    super(props);
  }

  public render() {
    return (
      <div className="retry">
        <Typography variant="subtitle1">Try again</Typography>
        <Button color="primary" variant="contained" className="retry__btn" onClick={this.props.onRetry}>Retry</Button>
      </div>
    );
  }
}
