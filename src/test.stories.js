import React from "react";
import { Button } from "@storybook/react/demo";

export default {
  title: "Button",
  decorators: [
    storyFn => <div style={{ backgroundColor: "yellow" }}>{storyFn()}</div>
  ]
};

export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

withEmoji.story = {
  decorators: [
    storyFn => <div style={{ border: "5px solid red" }}>{storyFn()}</div>
  ]
};
