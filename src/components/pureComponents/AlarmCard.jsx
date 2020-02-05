// @flow
import React, { useState, useEffect } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import R from "ramda";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
type tProps = {
  // LineChartCard parameters
  alarms: Array<mixed>,
  type: string
};
// type = alarm | close | ack | read

const AlarmCardEssential = ({ style, title, context }) => {
  return (
    <div className={style}>
      <div className="card-body">
        <h3 className="text-white">{title}</h3>
        <div className="card-text">{context}</div>
      </div>
    </div>
  );
};
/**
 * Component LineChartCard, Card componet with line chart
 */
const alarmCard = (props: tProps) => {
  const { alarms = [], type = "alarm" } = props;
  const { t } = useTranslation();

  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("title");
  const [context, setContext] = useState("context");
  const [style, setStyle] = useState("card text-white bg-success");

  const getTitle = type => {
    switch (type) {
      case "alarm":
        return t("alarm.alarmCount");
      case "read":
        return t("alarm.read");
      case "ack":
        return t("alarm.ack");
      case "close":
        return t("alarm.close");
    }
  };

  const getContext = type => {
    switch (type) {
      case "alarm":
        return t("alarm.alarmContext");
      case "read":
        return t("alarm.readContext");
      case "ack":
        return t("alarm.ackContext");
      case "close":
        return t("alarm.closeContext");
    }
  };

  const getColor = () => {
    if (count <= 0) return "bg-success";
    switch (type) {
      case "alarm":
        return "bg-danger";
      case "ack":
        return "bg-info";
      case "read":
        return "bg-warning";
      case "close":
        return "bg-secondary";
    }
  };

  useEffect(() => {
    setTitle(getTitle(type));
  }, [type]);

  const matchType = type => R.filter(i => i.state == type);

  useDeepCompareEffect(() => {
    const _matchAlarms = matchType(type)(alarms) || [];
    setCount(_matchAlarms.length);
  }, [alarms]);

  useEffect(() => {
    setContext(getContext(type) + count);
    setStyle(classNames("card", "text-white", getColor()));
  }, [count, type]);

  // const mainClass = classNames("card", "text-white", getColor());

  return <AlarmCardEssential style={style} title={title} context={context} />;
};

alarmCard.defaultProps = {
  cardInfo: {
    title: "DEFAULT TITLE",
    info: "Default information",
    type: "primary"
  }
};

export default alarmCard;
