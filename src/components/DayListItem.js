import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

function formatSpots(props) {
  let returnStr = "spots remaining";
  const spots = props.spots;

  if (spots === 0) {
    returnStr = "no spots remaining"
  } else if (spots === 1) {
    returnStr = "1 spot remaining"
  } else {
    returnStr = `${spots} spots remaining`
  }
  return returnStr;
}

export default function DayListItem(props) {
  //console.log("this is props", props)
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const spotsMessage = formatSpots(props);

  return (
    <li data-testid='day' className={dayClass} onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsMessage}</h3>
    </li>
  );
}

