import React, {useEffect} from 'react';
import './App.css';
import {SearchAppBar} from "./Components/SearchAppBar/SearchAppBar";
import {BasicTable} from "./Components/Table/BasicTable";
import {fetching_API} from "./api/api";
import {useDispatch} from "react-redux";
import {setItemsAC, setPageAC, setTotalCountAC} from "./redux/reducers/items-reducer";
import CustomPaginationActionsTable from "./Components/CustomPaginationActionsTable/CustomPaginationActionsTable";

export function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        fetching_API.getData(5, 1)
            .then(data => {
                dispatch(setTotalCountAC(data.total))
                dispatch(setItemsAC(data.data))
                dispatch(setPageAC(1));
            })
    }, [])

    return (
        <div>
            <SearchAppBar/>
            {/*<BasicTable />*/}
            <CustomPaginationActionsTable/>
        </div>
    );
}


