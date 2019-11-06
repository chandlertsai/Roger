import React from "react";
import { Card } from "antd";

const contactInfo = ({ email, phone, mobile, fax }) => {
  return (
    <Card style={{ width: 100 }} bordered={false}>
      <p>Email: {email}</p>
      <p>電話: {phone}</p>
      <p>手機: {mobile}</p>
      <p>傳真: {fax}</p>
    </Card>
  );
};

export default contactInfo;
