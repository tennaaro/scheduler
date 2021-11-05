import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";


export default function Form(props) {
  //console.log("this is interviewer", props.interviewer)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function () {
    setStudent("")
    setInterviewer("")
    setError("")
  }

  const cancel = function () {
    reset()
    props.onCancel()
  }

  function validate() {
    if ((student === "") && (interviewer === null)) {
      setError("Student and interviewer cannot be blank")
    }
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please choose an interviewer")
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  /*
  const handleSave = () => {
    if(student === "") {
      //do something
    }
    props.onSave(student, interviewer);1014
  };
  */

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event)=> setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}