import { allReducers } from './../redux/event/allReducers';
import { RootState, AppDispatch } from './../redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAction = () => {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(allReducers, dispatch)
}