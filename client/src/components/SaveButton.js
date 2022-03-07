import React, { Component } from "react";
import Styles from "./styles/Styles";

class SaveButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getGridItems = this.getGridItems.bind(this);
    this.handleGridItems = this.handleGridItems.bind(this);
    this.saveScheduleLocally = this.saveScheduleLocally.bind(this);
  }

  getGridItems = () => {
    return this.props.addedWidgets;
  };

  handleGridItems = () => {
    const grid = this.getGridItems();
    console.log(grid);
  };

  saveScheduleLocally = () => {
    let widgets = this.getGridItems();
    let widgets_serialised = JSON.stringify(widgets);
    window.localStorage.setItem("savedSchedule", widgets_serialised);
  };

  render() {
    return (
      <Styles.SaveButtonStyles>
        <button className="saveButton" onClick={this.saveScheduleLocally}>
          Save Schedule
        </button>
      </Styles.SaveButtonStyles>
    );
  }
}

export default SaveButton;
