export type initialStateType = {
    page: number
    per_page: number
    total: number
    data: DataType[]
    pantone_value?: string
    searchFieldValue: string
    filter: number | null
    filteredItem: DataType | null
    modalOpen: boolean
    rowToModal: DataType | null
}
export type DataType = {
    id: number
    name: string
    year: number
    color: string
}
type ActionType = SetTotalCountActionType | SetPerPageActionType | SetItemsActionType
    | SetPageActionType | SetSearchFieldValueActionType
    | SetFilterActionType | SetFilteredItemActionType | OpenModalActionType
    | SetRowToModalActionType
const initialState = {
    page: 1,
    per_page: 5,
    searchFieldValue: '',
    data: [] as DataType[],
    total: 0,
    filter: null,
    filteredItem: null,
    modalOpen: false,
    rowToModal: null,
} as initialStateType

const enum ACTION_TYPES {
    SET_TOTAL = 'SET_TOTAL',
    SET_PER_PAGE = 'SET_PER_PAGE',
    SET_ITEMS = 'SET_ITEMS',
    SET_PAGE = 'SET_PAGE',
    SET_SEARCH_FIELD_VALUE = 'SET_SEARCH_FIELD_VALUE',
    SET_FILTER = 'SET_FILTER',
    SET_FILTERED_ITEM = 'SET_FILTERED_ITEM',
    OPEN_MODAL = 'OPEN_MODAL',
    SET_ROW_TO_MODAL = 'SET_ROW_TO_MODAL',
}

export const itemsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case ACTION_TYPES.SET_TOTAL:
            return {...state, total: action.payload.total};
        case ACTION_TYPES.SET_PER_PAGE:
            return {...state, per_page: action.payload.per_page};
        case ACTION_TYPES.SET_ITEMS:
            return {...state, data: action.payload.data};
        case ACTION_TYPES.SET_PAGE:
            return {...state, page: action.payload.page};
        case ACTION_TYPES.SET_SEARCH_FIELD_VALUE:
            return {...state, searchFieldValue: action.payload.value};
        case ACTION_TYPES.SET_FILTER:
            return {...state, filter: action.payload.filter};
        case ACTION_TYPES.SET_FILTERED_ITEM:
            return {...state, filteredItem: action.payload.filteredItem};
        case ACTION_TYPES.OPEN_MODAL:
            return {...state, modalOpen: action.payload.open};
        case ACTION_TYPES.SET_ROW_TO_MODAL:
            return {...state, rowToModal: action.payload.modalRow};
        default:
            return state
    }
}


type SetTotalCountActionType = ReturnType<typeof setTotalCountAC>
export const setTotalCountAC = (total: number) => {
    return {
        type: ACTION_TYPES.SET_TOTAL,
        payload: {
            total,
        },
    } as const
}
type SetPerPageActionType = ReturnType<typeof setPerPageAC>
export const setPerPageAC = (per_page: number) => {
    return {
        type: ACTION_TYPES.SET_PER_PAGE,
        payload: {
            per_page,
        },
    } as const
}
type SetItemsActionType = ReturnType<typeof setItemsAC>
export const setItemsAC = (data: DataType[]) => {
    return {
        type: ACTION_TYPES.SET_ITEMS,
        payload: {
            data,
        },
    } as const
}
type SetPageActionType = ReturnType<typeof setPageAC>
export const setPageAC = (page: number) => {
    return {
        type: ACTION_TYPES.SET_PAGE,
        payload: {
            page,
        },
    } as const
}
type SetSearchFieldValueActionType = ReturnType<typeof setSearchFieldValueAC>
export const setSearchFieldValueAC = (value: string) => {
    return {
        type: ACTION_TYPES.SET_SEARCH_FIELD_VALUE,
        payload: {
            value,
        },
    } as const
}
type SetFilterActionType = ReturnType<typeof setFilterAC>
export const setFilterAC = (filter: number | null) => {
    return {
        type: ACTION_TYPES.SET_FILTER,
        payload: {
            filter,
        },
    } as const
}
type SetFilteredItemActionType = ReturnType<typeof setFilteredItemAC>
export const setFilteredItemAC = (filteredItem: DataType | null) => {
    return {
        type: ACTION_TYPES.SET_FILTERED_ITEM,
        payload: {
            filteredItem,
        },
    } as const
}
type OpenModalActionType = ReturnType<typeof openModalAC>
export const openModalAC = (open: boolean) => {
    return {
        type: ACTION_TYPES.OPEN_MODAL,
        payload: {
            open,
        },
    } as const
}
type SetRowToModalActionType = ReturnType<typeof setRowToModalAC>
export const setRowToModalAC = (modalRow: DataType) => {
    return {
        type: ACTION_TYPES.SET_ROW_TO_MODAL,
        payload: {
            modalRow,
        },
    } as const
}