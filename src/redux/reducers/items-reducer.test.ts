import {
    DataType,
    initialStateType,
    itemsReducer, openModalAC, setFilterAC, setFilteredItemAC,
    setItemsAC, setRowToModalAC,
    setPageAC,
    setPerPageAC, setSearchFieldValueAC,
    setTotalCountAC
} from "./items-reducer";

let state = {} as initialStateType;
beforeEach(()=> {
    state = {} as initialStateType
})

test('total count  should be set',()=> {
    const per_page = 16;
    const newState = itemsReducer(state,setTotalCountAC(per_page))
    expect(state).not.toBe(newState)
    expect(newState.total).toBe(per_page)
})

test('page size should be set',()=> {
    const total = 16;
    const newState = itemsReducer(state,setPerPageAC(total))
    expect(state).not.toBe(newState)
    expect(newState.per_page).toBe(total)
})
test('page number should be set',()=> {
    const page = 2;
    const newState = itemsReducer(state,setPageAC(page))
    expect(state).not.toBe(newState)
    expect(newState.page).toBe(page)
})
test('items should be set',()=> {
    const data: DataType[] = [
        {id: 1, name: 'Alex1', year: 2000, color: 'red'},
        {id: 2, name: 'Alex2', year: 2001,color: 'blue'},
        {id: 3, name: 'Alex3', year: 2002,color: 'green'},
        {id: 4, name: 'Alex4', year: 2003,color: 'yellow'},
        {id: 5, name: 'Alex5', year: 2004,color: 'white'},
    ];
    const newState = itemsReducer(state,setItemsAC(data))
    expect(state).not.toBe(newState)
    expect(newState.data).toStrictEqual(data)
})
test('search field should be updated',()=> {
    const newValue = '5'
    const newState = itemsReducer(state,setSearchFieldValueAC(newValue))

    expect(state).not.toBe(newState)
    expect(newState.searchFieldValue).toBe(newValue)
})

test('current filter should be set',()=> {
    const newVFilter = 3
    const newState = itemsReducer(state,setFilterAC(newVFilter))

    expect(state).not.toBe(newState)
    expect(newState.filter).toBe(newVFilter)
})

test('filtered item should be set',()=> {
    const filteredItem = {id: 3, name: 'Test', year: 2000, color: 'red'}
    const newState = itemsReducer(state,setFilteredItemAC(filteredItem))

    expect(state).not.toBe(newState)
    expect(newState.filteredItem).toStrictEqual(filteredItem)
})

test('modalOpen changes to true',()=> {
    const newState = itemsReducer(state,openModalAC(true))

    expect(state).not.toBe(newState)
    expect(newState.modalOpen).toBeTruthy()
})

test('row for modal should be set',()=> {
    const rowForModal = {id: 3, name: 'Test', year: 2000, color: 'red'}
    const newState = itemsReducer(state,setRowToModalAC(rowForModal))

    expect(state).not.toBe(newState)
    expect(newState.rowToModal).toStrictEqual(rowForModal)
})