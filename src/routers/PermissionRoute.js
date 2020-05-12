import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import R from "ramda";
import { authPkey } from "reducers/storeUtils";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import PermissionDenied from "components/pureComponents/PermissionDenied";

const notArray = R.complement(R.is(Array));

const VALIDATING = 1;
const PASS = 2;
const FAILURE = 3;

const PermissionRoute = ({ component: Component, group, ...rest }) => {
  const pKey = useSelector(authPkey);
  const [curState, setCurState] = useState(VALIDATING);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const matchGroup = R.includes(group);
    axios({
      method: "GET",
      url: "/apis/v1/read/permission",
      params: { key: pKey },
    })
      .then((res) => {
        if (notArray(res.data)) {
          setReason(`無法取得正確的權限...`);
          setCurState(FAILURE);
          return false;
        }
        const getAbilies = R.pipe(R.head, R.prop("abilities"));
        const permission = getAbilies(res.data);

        if (matchGroup(permission)) {
          // console.log("PASS");

          setCurState(PASS);
        } else {
          // console.log("FAILURE");

          setReason("權限錯誤，請確認登入權限...");
          setCurState(FAILURE);
        }
        return true;
      })
      .catch((error) => {
        setReason(error.message);
        setCurState(FAILURE);
      });
  }, [pKey, group]);

  return (
    <Route
      {...rest}
      render={(props) =>
        curState === PASS ? (
          <Component {...props} />
        ) : (
          <PermissionDenied reason={reason} />
        )
      }
    />
  );
};

export default PermissionRoute;
