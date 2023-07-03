export const setError = (error:string) =>  (dispatch: any) => {
    dispatch({ type: "SET_ERROR", payload: error });
    setTimeout(() => dispatch({ type: "DELETE_ERROR"}), 3000);
};
