import React, { useState } from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { purge } from "actions/appState";
const testTTS = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const speak = () => {
    var words = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(words);
  };

  const handlePurge = () => {
    dispatch(purge());
  };

  const textChanged = ({ target: { value } }) => {
    setText(value);
  };
  return (
    <div>
      <Input.TextArea
        placeholder="輸入要說的文字"
        value={text}
        onChange={textChanged}
      />
      <Button onClick={speak}> Speak</Button>
      <Button onClick={handlePurge}> purge</Button>
    </div>
  );
};

export default testTTS;
