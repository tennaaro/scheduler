
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let dayObj = {};
  // loop through state.days list of array and find object with name equal to day
  for (const obj of state.days) {
    if (obj.name === day) {
      // set DayObj to that object
      dayObj = obj;
    }
  }
  let returnArr = [];
  // checking if dayObj is empty
  if (Object.keys(dayObj).length === 0) {
    return returnArr;
  }
  for (const id of dayObj.appointments) {
    returnArr.push(state.appointments[`${id}`])
  }
  return returnArr;
}

export function getInterview(state, interview) {
  let returnObj = {}
  // case when there's no interview
  if (!interview) {
    return null;
  }
  // setting the interview object with values
  returnObj["student"] = interview.student;
  returnObj["interviewer"] = state.interviewers[interview.interviewer]
  return returnObj
}

export function getInterviewersForDay(state, day) {
  let dayObj = {}
  for (const obj of state.days) {
    if (obj.name === day) {
      dayObj = obj;
    }
  }
  let returnArr = [];
  if (Object.keys(dayObj).length === 0) {
    return returnArr
  }
  // loop through interviewers for given day and push them to an array
  for (const interviewer of dayObj.interviewers) {
    returnArr.push(state.interviewers[interviewer])
  }
  return returnArr
}
