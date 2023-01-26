import React, {useEffect} from 'react';
import './App.css';
import {SearchAppBar} from "./Components/SearchAppBar/SearchAppBar";
import {useDispatch, useSelector} from "react-redux";
import CustomPaginationActionsTable from "./Components/CustomPaginationActionsTable/CustomPaginationActionsTable";
import {fetching_API} from "./api/api";
import {initialStateType, setItemsAC, setTotalCountAC} from "./redux/reducers/items-reducer";
import {AppRootStateType} from "./redux/store";
import {TransitionsModal} from "./Components/Modal/Modal";
import {useSearchParams} from "react-router-dom";

export function App() {
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, initialStateType>(state => state.data)
    const { page,  per_page: rowsPerPage} = state
    useEffect(() => {
        fetching_API.getData(rowsPerPage, page)
            .then(data => {
                dispatch(setTotalCountAC(data.total))
                dispatch(setItemsAC(data.data))
                setSearchParams({page: String(page)})
            })
            .catch(err=> err)
    }, [dispatch, page,rowsPerPage])

    // it is terrible solution, but I done pagination without routes...
    const [searchParams, setSearchParams] = useSearchParams({})
    if(searchParams.toString()){

    }


    return (
        <div>
            <SearchAppBar/>
            <CustomPaginationActionsTable/>
            <TransitionsModal/>
        </div>
    );
}


