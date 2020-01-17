// @flow
import React, { useState, useEffect } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useAlarm } from "apis/alarm";
import R from "ramda";
import { useTranslation } from "react-i18next";
type tProps = {
  currentAlarms: mixed
};

const alarmVoice = (props: tProps) => {
  const { currentAlarms } = props;
  const [voiceAlarms, setVoiceAlarms] = useState([]);
  const [alarms, getAlarm] = useAlarm([]);
  const [currentVoiceMessage, setCurrentVoiceMessage] = useState("");
  const [elapse, setElapse] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    setElapse(0);
    setInterval(() => {
      setElapse(pre => pre + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (elapse == 0) return;
    const speakList = R.filter(a => elapse % a.pollingInterval == 0)(
      voiceAlarms
    );

    if (speakList.length > 0) {
      setCurrentVoiceMessage(R.prop("message", R.head(speakList)));
    }
  }, [elapse]);

  useEffect(() => {
    if (currentVoiceMessage.length <= 0) return;
    var words = new SpeechSynthesisUtterance(currentVoiceMessage);
    window.speechSynthesis.speak(words);
    //setCurrentVoiceMessage("");
  }, [currentVoiceMessage]);

  useDeepCompareEffect(() => {
    console.log("deep compare ", currentAlarms);
    const n = R.map(a => {
      const alarmInfo = getAlarm(a.alarmKey);
      return R.assoc(
        "pollingInterval",
        R.prop("pollingInterval", alarmInfo)
      )(a);
    }, currentAlarms);
    console.log("combine ", n);
    setVoiceAlarms(n);
  }, [currentAlarms]);

  return (
    <div className="card text-white bg-danger">
      <div className="card-body">
        <h3 className="text-white">{t("alarm.alarmVoiceTitle")}</h3>
        <div className="card-text">{currentVoiceMessage}</div>
        <div className="card-text text-right"> {elapse} </div>
      </div>
    </div>
  );
};

export default alarmVoice;
