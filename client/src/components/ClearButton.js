import { Component } from "react";

import Styles from "./styles/Styles"

class ClearButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Styles.ClearButtonStyles className = "clearButton">
        <button onClick={this.props.onClick}> {this.props.text}</button>
      </Styles.ClearButtonStyles>
    );
  }
}

export default ClearButton;
