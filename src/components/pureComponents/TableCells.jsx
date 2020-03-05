import React, { useContext } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import Hide from "components/utils/Hide";

const EditableContext = React.createContext();
const editableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export const EditableFormRow = Form.create()(editableRow);

export const EditOperationCell = ({
  record,
  handlerSetEditing,
  handleDetail
}) => {
  const { t } = useTranslation();
  return (
    <div className="navbar">
      <Button
        size="small"
        type="primary"
        onClick={() => handlerSetEditing(record)}
        style={{ margin: "5px" }}
      >
        {t("edit")}
      </Button>
      <Hide show={handleDetail}>
        <Button
          type="secondary"
          shape="circle"
          icon={<SearchOutlined />}
          onClick={() => handleDetail(record)}
        />
      </Hide>
    </div>
  );
};

export const EditableCell = props => {
  const {
    editing,
    record,
    title,
    dataIndex,
    handleChanged,
    index,
    ...restProps
  } = props;
  const form = useContext(EditableContext);
  const { getFieldDecorator } = form;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item style={{ margin: 0 }}>
          {getFieldDecorator(dataIndex, {
            rules: [
              {
                required: true,
                message: `請輸入 ${title}!`
              }
            ],
            initialValue: record[dataIndex]
          })(<Input />)}
        </Form.Item>
      ) : (
        restProps.children
      )}
    </td>
  );
};
