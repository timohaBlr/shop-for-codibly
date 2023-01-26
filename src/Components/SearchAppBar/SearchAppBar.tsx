import React, {ChangeEvent, KeyboardEvent, FocusEvent, useState, useEffect} from "react";
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {
    initialStateType,
    setFilterAC,
    setFilteredItemAC,
    setSearchFieldValueAC
} from "../../redux/reducers/items-reducer";
import {fetching_API} from "../../api/api";
import ClearIcon from '@mui/icons-material/Clear';
import {useSearchParams} from "react-router-dom";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export const SearchAppBar = () => {
    const state = useSelector<AppRootStateType, initialStateType>(state => state.data)
    const {searchFieldValue, filter, filteredItem, page} = state
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams({})


    // it's make this component partially uncontrolled. Left as an example
    const [error, setError] = useState<string | null>(null)

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = Number(e.currentTarget.value)
        if (value !== Number(e.currentTarget.value)) {
            setError('Accept only integers')
        } else {
            dispatch(setSearchFieldValueAC(e.currentTarget.value))
            if (error) {
                setError(null)
            }
        }
    }
    const dispatchFilter = (value: string) => {
        if (value.trim() !== '') {
            dispatch(setSearchFieldValueAC(''))
            dispatch(setFilterAC(+value))
            setSearchParams({id: value})
        }
    }

    const inputKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatchFilter(searchFieldValue.trim())
        }
    }
    const inputBlurHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        dispatchFilter(searchFieldValue.trim())
        if (error) {
            setError(null)
        }
    }
    const buttonClickHandler = () => {
        dispatch(setFilteredItemAC(null))
        dispatch(setFilterAC(null))
        setError(null)
        setSearchParams({page: String(page)})
    }
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (filter) {
            fetching_API.getFilteredData(filter)
                .then(data => {
                    if (data) {
                        dispatch(setFilteredItemAC(data.data))
                    } else {
                        setError('We don\'t have this')
                        setSearchParams({page: String(page)})
                    }
                })
            timer = setTimeout(() => setError(null), 3000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [filter, dispatch])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        MUI
                    </Typography>{filteredItem &&
                    <IconButton aria-label="delete"
                                onClick={buttonClickHandler}>
                        <ClearIcon/>
                    </IconButton>}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>

                        <StyledInputBase
                            placeholder={error ? error : "Search…"}
                            inputProps={{'aria-label': 'search'}}
                            value={searchFieldValue}
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler}
                            onKeyPress={inputKeyPressHandler}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}