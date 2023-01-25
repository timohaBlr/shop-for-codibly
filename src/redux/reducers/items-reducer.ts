export type initialStateType = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: DataType[]
}
export type DataType = {
    id: number
    name: string
    year: number
    color: string
}
type ActionType = SetTotalCountActionType | SetPerPageActionType
    | SetItemsActionType | SetPageActionType
const initialState = {
    page: 1,
} as initialStateType

const enum ACTION_TYPES {
    SET_TOTAL = 'SET_TOTAL',
    SET_PER_PAGE = 'SET_PER_PAGE',
    SET_ITEMS = 'SET_ITEMS',
    SET_PAGE = 'SET_PAGE',
}

export const itemsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case ACTION_TYPES.SET_TOTAL:
            return {...state, total: action.payload.total};
        case ACTION_TYPES.SET_PER_PAGE:
            return {...state, per_page: action.payload.per_page};
        case ACTION_TYPES.SET_ITEMS:
            const actualData = action.payload.data.map(m => {
                const {id, name, year, color} = m
                //  There is no information in the task about  "pantone_value", I decided to remove it
                //of course 6 new objects are worse for performance than one extra property in the old array, but...i did
                return {id, name, year, color}
            })
            return {...state, data: actualData};
        case ACTION_TYPES.SET_PAGE:
            return {...state, page: action.payload.page};
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