import createDataContext from '../create_data_context'

const LoginReducer = (state, action) => {
  switch (action.type) {
    case 'setAccountList':
      return { ...state, accountList: action?.payload }
    default:
      return state
  }
}
const setAccountList = dispatch => async data => {
  dispatch({
    type: 'setAccountList',
    payload: data,
  })
}
export const { Provider, Context } = createDataContext(
  LoginReducer,
  { setAccountList },
  { accountList: [] },
)
