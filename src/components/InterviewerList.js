import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const interviewers = props.interviewers;

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  
  // Creating array with InterviewerListItem for each interviewer
  const mappedInterviewers = interviewers.map(interviewer => <InterviewerListItem
    key={interviewer.id} 
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={props.value === interviewer.id} 
    setInterviewer={() => props.onChange(interviewer.id)}/>)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {mappedInterviewers} </ul>
    </section>
  );
}