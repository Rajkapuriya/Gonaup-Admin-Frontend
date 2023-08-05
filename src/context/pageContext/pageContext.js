import createDataContext from '../create_data_context'

const cardListReducer = (state, action) => {
    switch (action.type) {
        case 'setActivePage':
            return { ...state, ActivePage: action?.payload }
        default:
            return state
    }
}
const setActivePage = dispatch => async data => {
    dispatch({
        type: 'setActivePage',
        payload: data,
    })
}
export const { Provider, Context } = createDataContext(
    cardListReducer,
    {
        setActivePage,
    },
    {
        ActivePage: 'ProjectList',
    },
)
