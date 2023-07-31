import { useQuery, useMutation, useQueryClient } from 'react-query'
// import axios from 'axios'
import { request } from '../utils/axios-utils'

const verifyLogin = loginDetail => {
    return request({ url: '/superheroes', method: 'post', data: loginDetail })
}
export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation(verifyLogin, {
        onSuccess: data => {
            // queryClient.setQueryData('super-heroes', oldQueryData => {
            //     return {
            //         ...oldQueryData,
            //         data: [...oldQueryData.data, data.data]
            //     }
            // })
        },
        onError: data => {

        }
    })
}
