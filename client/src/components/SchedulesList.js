import Styles from "./styles/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const { Component } = require("react");

class SchedulesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      clickedSchedule: {},
    };
    this.loadList = this.loadList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // loads schedules from MongoDB and stores in state
  loadList = async () => {
    const response = await fetch(`http://localhost:5000/schedules/`);

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const schedules = await response.json();

    this.setState(
      {
        schedules: schedules,
      },
      () => {
        console.log(this.state.schedules);
      }
    );
  };

  // finds clicked date in state, stores in clickedItem and sends to parent
  handleClick = (id) => {
    let clickedItem;
    const schedules = this.state.schedules;
    for (let i = 0; i < schedules.length; i++) {
      if (schedules[i]._id === id) {
        clickedItem = schedules[i];
      }
    }

    this.props.getClickedSchedule(clickedItem);
  };

  // delete clicked schedule and reload list 
  handleDelete = async (id) => {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    }).then(() => {
      this.loadList();
    });
  };

  componentDidMount() {
    this.loadList();
  }

  render() {
    const schedules = this.state.schedules;
    const calendarIcon = <FontAwesomeIcon icon={faCalendarDays} />;
    return (
      <Styles.SchedulesListStyles>
        <h1>Saved Schedules</h1>
        {schedules.map((item) => (
          <li key={item._id} onClick={() => this.handleClick(item._id)}>
            <a>{calendarIcon}</a>
            {item.schedule.startDate}
            {/* add a delete button here  */}
          </li>
        ))}
      </Styles.SchedulesListStyles>
    );
  }
}

export default SchedulesList;
