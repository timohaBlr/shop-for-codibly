import React, {useEffect} from 'react';
import './App.css';
import {SearchAppBar} from "./Components/SearchAppBar/SearchAppBar";
import {useDispatch, useSelector} from "react-redux";
import {CustomPaginationActionsTable} from "./Components/CustomPaginationActionsTable/CustomPaginationActionsTable";
import {fetching_API} from "./api/api";
import {initialStateType, setFilterAC, setItemsAC, setPageAC, setTotalCountAC} from "./redux/reducers/items-reducer";
import {AppRootStateType} from "./redux/store";
import {TransitionsModal} from "./Components/Modal/Modal";
import {useSearchParams} from "react-router-dom";

export function App() {
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, initialStateType>(state => state.data)
    const {page, per_page: rowsPerPage} = state
    const [searchParams, setSearchParams] = useSearchParams({})

    useEffect(() => {
        if (searchParams.toString()) {
            const stringifySearchParams = searchParams.toString()
            const searchParamValue = Number(stringifySearchParams.slice(-1))
            if (stringifySearchParams.slice(0, -2) === 'page') {
                dispatch(setPageAC(searchParamValue))
            } else if (stringifySearchParams.slice(0, -2) === 'id') {
                dispatch(setFilterAC(searchParamValue))
            }
        }
    }, [dispatch, searchParams])
    useEffect(() => {
        fetching_API.getData(rowsPerPage, page)
            .then(data => {
                dispatch(setTotalCountAC(data.total))
                dispatch(setItemsAC(data.data))
                //this condition to prevent the search parameter id from being replaced
                if (searchParams.toString().slice(0, -2) !== 'id') {
                    setSearchParams({page: String(page)})
                }
            })
            .catch(err => err)
    }, [dispatch, page, rowsPerPage,searchParams, setSearchParams])

    return (
        <div>
            <SearchAppBar/>
            <CustomPaginationActionsTable/>
            <TransitionsModal/>
        </div>
    );
}


