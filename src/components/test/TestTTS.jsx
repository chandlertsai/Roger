import React, { useState } from "react";
import { Input, Button } from "antd";

const testTTS = () => {
  const [text, setText] = useState("");

  const speak = () => {
    var words = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(words);
  };

  const textChanged = ({ target: { value } }) => {
    setText(value);
  };
  return (
    <div>
      <Input.TextArea
        placeholder='輸入要說的文字'
        value={text}
        onChange={textChanged}
      />
      <Button onClick={speak}> Speak</Button>
    </div>
  );
};

export default testTTS;
