//@flow
import axios from "axios";
import { setLoading, setError } from "actions/appState";

import { useDispatch } from "react-redux";
import R from "ramda";

/**
 * @returns devices:Array<device>
 */
export const useDevices = (): Array<mixed> => {
  const [divices, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get("/apis/v1/read/devices")
      .then(res => res.data)
      .then(setPermissions)
      .catch(error => dispatch(setError(true, error.message)))
      .finally(dispatch(setLoading(false)));
  }, []);

  return divices;
};
