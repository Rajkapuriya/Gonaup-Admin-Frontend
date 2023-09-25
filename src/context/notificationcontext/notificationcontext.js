import createDataContext from '../create_data_context'

const NotificationReducer = (state, action) => {
    switch (action.type) {
        case 'setSuccessSnackbar':
            return { ...state, successSnackbar: action.payload }
        case 'setErrorSnackbar':
            return { ...state, errorSnackbar: action.payload }
        default:
            return state
    }
}
const setSuccessSnackbar = dispatch => async data => {
    dispatch({
        type: 'setSuccessSnackbar',
        payload: data,
    })
}

const setErrorSnackbar = dispatch => async data => {
    dispatch({
        type: 'setErrorSnackbar',
        payload: data,
    })
}
export const { Provider, Context } = createDataContext(
    NotificationReducer,
    { setSuccessSnackbar, setErrorSnackbar },
    {
        successSnackbar: { message: '', status: false },
        errorSnackbar: { message: '', status: false },
    },
)
