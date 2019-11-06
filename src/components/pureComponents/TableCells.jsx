import React, { useContext } from "react";
import { Form, Input, Button } from "antd";

const EditableContext = React.createContext();
const editableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export const EditableFormRow = Form.create()(editableRow);

export const EditOperationCell = ({ editing, record, handlerSetEditing }) => {
  return (
    <div>
      <Button
        size='small'
        type='primary'
        onClick={() => handlerSetEditing(record)}
        style={{ margin: "5px" }}
      >
        編輯
      </Button>
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
