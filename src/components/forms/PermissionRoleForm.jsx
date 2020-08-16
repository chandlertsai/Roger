// @flow
import React, { useState, useEffect } from "react";

import { Button, Row, Col, Input, Modal, message } from "antd";
import { useTranslation } from "react-i18next";
import ErrorTip from "components/forms/ErrorTip";
import { useSelector, useDispatch } from "react-redux";

import { loadingState } from "reducers/storeUtils";
import R from "ramda";
import FormRow from "components/forms/FormRow";
import AbilityField from "components/forms/AbilityField";
import { PermissionGroup } from "apis/auth";
import { uniqueKey } from "apis/utils";
import axios from "axios";
import { setLoading } from "actions/appState";

// transfer between backend and state
const concatAll = R.unapply(R.reduce(R.concat, []));

type Props = {
  loading: boolean,
  dispatch: Function,
};

const AddPermissionRole = (props) => {
  const { addRole } = props;
  const { t } = useTranslation();

  const [name, setRoleName] = useState("");
  return (
    <div>
      <Row>
        <Col span={12}>
          <Input
            value={name}
            placeholder={t("inputPermissionName")}
            style={{ margin: "5px" }}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </Col>
        <Col span={4} offset={8}>
          <Button
            style={{ margin: "5px" }}
            onClick={() =>
              addRole({
                name:
                  name ||
                  "Default - " + Math.random().toString(36).substring(7),
                key: uniqueKey("permission"),
                abilities: [],
              })
            }
          >
            Add
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export const userArray = R.intersection([
  PermissionGroup.license,
  PermissionGroup.users,
  PermissionGroup.group,
]);
export const warnningArray = R.intersection([
  PermissionGroup.settings.tts,
  PermissionGroup.settings.errorMessage,
  PermissionGroup.settings.specialMonitor,
]);
export const deviceArray = R.intersection([
  PermissionGroup.device.information,
  PermissionGroup.device.vendor,
  PermissionGroup.device.monitor,
  PermissionGroup.device.errorLog,
  PermissionGroup.device.maintainLog,
  PermissionGroup.device.errorReport,
  PermissionGroup.device.alarm,
]);

const permissionRoleForm = (props: Props) => {
  const loading = useSelector(loadingState);
  const [options, setOptions] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState({
    show: false,
    users: [],
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const fetchPermission = () => {
    dispatch(setLoading(true));
    axios
      .get("/apis/v1/read/permission")
      .then((res) => {
        console.log(res.data);
        const regroupArray = (arr) => ({
          user: userArray(arr),
          alarm: warnningArray(arr),
          device: deviceArray(arr),
        });
        const transformer = R.map(
          R.evolve({
            name: R.identity,
            abilities: regroupArray,
            key: R.identity,
          })
        );
        setOptions(transformer(res.data));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        message.error(err.message);
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    fetchPermission();
  }, []);

  const addRole = (data) => {
    dispatch(setLoading(true));
    axios({
      url: "/apis/v1/create/permission",
      method: "POST",
      data,
    })
      .then((res) => {
        fetchPermission();
      })
      .catch((error) => {
        dispatch(setLoading(false));
        message.error(error.message);
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const onChanged = (key) => (name) => (v) =>
    setOptions((pre) =>
      R.map(
        R.ifElse(
          R.propEq("key", key),
          R.assocPath(["abilities", name], v),
          R.identity
        )
      )(pre)
    );

  const onDelete = (keyValue) => {
    console.log("Permission role delete: ", keyValue);

    dispatch(setLoading(true));
    axios({
      method: "GET",
      url: "/apis/v1/read/users",
      params: { pkey: keyValue.key },
    })
      .then((res) => {
        console.log("get users permission ", res.data);
        const users = res.data || [];
        if (users.length > 0) {
          setShowDeleteWarning({ show: true, users });
          return Promise.resolve();
        }
        console.log("DELETE");
        return axios({
          method: "DELETE",
          url: "/apis/v1/delete/permission",
          params: keyValue,
        });
      })
      .then((res) => fetchPermission())
      .catch((error) => {
        if (error.response) {
          axios({
            method: "DELETE",
            url: "/apis/v1/delete/permission",
            params: keyValue,
          })
            .then((res) => fetchPermission())
            .finally(() => dispatch(setLoading(false)));
        } else {
          dispatch(setLoading(false));
          message.error(error.message);
        }
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const onSubmit = (values) => {
    console.log("Permission role submit: ", values);

    const body = values;

    dispatch(setLoading(true));
    axios({
      method: "PUT",
      url: "/apis/v1/update/permission",
      data: body,
    })
      .then((res) => {
        console.log("updated psermission: ", res);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const handleModalOK = (e) => {
    console.log("handleModalOk ", showDeleteWarning);
    setShowDeleteWarning({ users: [], show: false });
  };

  const createFields = R.map((role) => {
    return (
      <AbilityField
        loading={loading}
        onChange={onChanged(role.key)}
        submit={onSubmit}
        del={onDelete}
        value={concatAll(
          role.abilities.user,
          role.abilities.alarm,
          role.abilities.device
        )}
        roleName={role.name}
        key={role.key}
        roleKey={role.key}
      />
    );
  });

  return (
    <div>
      <Modal
        visible={showDeleteWarning.show}
        title={t("error.deletePermissionTitle")}
        onOk={handleModalOK}
        onCancel={handleModalOK}
      >
        <p>{t("error.deletePermission")}</p>
        <ul>
          {showDeleteWarning.users.map((user) => (
            <li key={user.key}>{user.name}</li>
          ))}
        </ul>
      </Modal>
      <AddPermissionRole addRole={addRole} />
      {createFields(options)}
    </div>
  );
};

export default permissionRoleForm;
