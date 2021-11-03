import { useEffect, useState } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  // API requests to get data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // setting state to data given from request
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })

  }, [])

  // function to return array of days with the updated number of spots
  const updateSpots = (id, state, change) => {
    return state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: day.spots + change }
      }
      return day;
    })
  }

  function bookInterview(id, interview) {
    // changing interview value to given interview, with an appointment id
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // check if we are editing or creating a new interview
    const isEdit = state.appointments[id].interview !== null;
    // if editing, don't increase spots, if creating new, decrease spots by 1
    const days = updateSpots(id, state, isEdit ? 0 : -1)

    // setting the state to appointment with new interview value
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      // setting the interview value to null to cancel interview
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // updating days to increase spots by 1
    const days = updateSpots(id, state, 1)

    // setting the state to new appointment with interview null
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        })
      })
  }

  return { state, bookInterview, cancelInterview, setDay }
}
export default useApplicationData;