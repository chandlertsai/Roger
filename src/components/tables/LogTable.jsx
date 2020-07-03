// @flow

import React, { useState, useEffect } from "react";
import { useFetch } from "apis/crud";
import { setLoading, setError } from "actions/appState";
import { Table, Drawer, Tag, Popover, Row, Col, Input, Checkbox } from "antd";
import { useDebounce, dateCompare } from "apis/utils";

import R from "ramda";
const { Search } = Input;
// props type
type Props = {
  dispatch: Function,
};

const logTable = (props: Props) => {
  const [data, _remove, _update, query] = useFetch("cacti");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const debounceSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    query(debounceSearchTerm);
  }, [debounceSearchTerm]);

  const sort = R.sortBy(R.prop("time"));
  useEffect(() => {
    setTableData(sort(data));
  }, [data]);
  /*
{"id":"192.168.10.100",
		"target": "Ping", 
		"action":"UP", 
		"info":"Test",
	"time":"2018/12/24 14:51:40" }
*/
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Target",
      dataIndex: "target",
      key: "trget",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Info",
      dataIndex: "info",
      key: "info",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => dateCompare(a.time, b.time),
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
