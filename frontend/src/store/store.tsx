import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/index";


export const store = createStore(reducers, applyMiddleware(thunk));
type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
