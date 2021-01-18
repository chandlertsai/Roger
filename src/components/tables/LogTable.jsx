// @flow

import React, { useState, useEffect } from "react";
import { useFetch } from "apis/crud";
import { setLoading, setError } from "actions/appState";
import {
  Table,
  Drawer,
  Tag,
  Popover,
  Button,
  Row,
  Col,
  Input,
  Checkbox,
} from "antd";

import {
  useDebounce,
  dateCompare,
  ISODateToString,
  renderTimeCell,
} from "apis/utils";
import { useTranslation } from "react-i18next";

import R from "ramda";
import { CSVLink, CSVDownload } from "react-csv";
const { Search } = Input;
// props type
type Props = {
  dispatch: Function,
};

// const replacer = (k, v) => (v === null ? "" : v);
// const json2csv = (jsonList) => {
//   const data = jsonList || [];
//   if (data.length <= 0) return "No data";
//   const fields = Object.keys(data[0]);
//   let csv = R.map(
//     (row) =>
//       R.map(
//         (fieldName) => JSON.stringify(row[fieldName], replacer),
//         fields
//       ).join(","),
//     data
//   );
//   csv.unshift(fields.join(","));
//   csv = csv.join("\r\n");
//   var fileName = "ooooo.csv"; //匯出的檔名
//   var data = csv;
//   var blob = new Blob([data], {
//     type: "application/octet-stream",
//   });
//   var href = URL.createObjectURL(blob);
//   var link = document.createElement("a");
//   document.body.appendChild(link);
//   link.href = href;
//   link.download = fileName;
//   link.click();
// };

const logTable = (props: Props) => {
  const [data, _remove, _update, query] = useFetch("cacti");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const debounceSearchTerm = useDebounce(search, 500);
  const { t } = useTranslation();

  useEffect(() => {
    query(debounceSearchTerm);
  }, [debounceSearchTerm]);

  const sort = R.sortBy(R.prop("time"));
  useEffect(() => {
    setTableData(sort(data));
  }, [data]);

  const columns = [
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },

    {
      title: t("logTable.ts"),
      dataIndex: "ts",
      sorter: (a, b) => dateCompare(a.ts, b.ts),
      key: "ts",
      render: renderTimeCell,
    },

    {
      title: t("logTable.rawData"),
      dataIndex: "data",
      key: "data",
      render: (text, record, index) => <span>{JSON.stringify(text)}</span>,
    },
  ];

  return (
    <div>
      <Row className="my-2">
        <Col>
          <Search
            placeholder="input search text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            enterButton
          />
        </Col>
        <Col style={{ marginLeft: "8px" }}>
          <CSVLink data={data} filename="export.csv">
            Export CSV
          </CSVLink>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table size="small" columns={columns} dataSource={tableData} />
        </Col>
      </Row>
    </div>
  );
};

export default logTable;
