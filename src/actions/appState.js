// @flow
const SET_LOADING = "SET_LOADING";

// {type, loading= true|false}
const setLoading = (loading: boolean) => {
  return {
    type: SET_LOADING,
    loading
  };
};

const SET_ERROR = "SET_ERROR";

// {type, state: true|false, message:string}
const setError = (error: boolean, errorMessage: string) => ({
  type: SET_ERROR,
  hasError: error,
  errorMessage
});

export { SET_LOADING, setLoading, SET_ERROR, setError };
