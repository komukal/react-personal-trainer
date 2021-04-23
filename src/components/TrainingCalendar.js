import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'moment/locale/en-gb';
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container } from "@material-ui/core";
function TrainingCalendar(){
const [trainings, setTrainings] = React.useState([]);

const fetchTrainings = () => {
  fetch("https://customerrest.herokuapp.com/gettrainings")
    .then((response) => response.json())
    .then((data) => setTrainings(data))
    .catch((err) => console.log(err));
};
useEffect(() => {
    fetchTrainings();
  }, []);

    const localizer = momentLocalizer(moment)
    return(
      <div>
          <Container 
          style={{ height: "80vh" }}
          >
        <Calendar
        localizer={localizer}
        events={trainings}
        defaultView='week'
        startAccessor={event=>{return moment(event.date).toDate(); }}
        endAccessor={event=>{return moment(event.date).add(event.duration,'minutes').toDate(); }}
        titleAccessor={event=>{return event.activity + ' / ' +event.customer.firstname +' '+  event.customer.lastname}}


         />
         </Container>
      </div>
    )
  }
export default TrainingCalendar;
