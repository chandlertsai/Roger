import axios from "axios";
import React, { useState, useEffect } from "react";
var pjson = require("../package.json");

export const useServerVersion = () => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    axios
      .get("api/version")
      .then(res => setVersion(res.data.version))
      .catch(err => useServerVersion("Unknow"));
  }, []);
  return version;
};

export const webVersion = pjson.version;
