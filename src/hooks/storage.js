import Cookie from 'js-cookie'

export function setLoginToken(token) {
    Cookie.set('userToken', token, { expires: 1 })
}

export function getLoginToken() {
    return Cookie.get('userToken')
}

export function clearLoginToken() {
    Cookie.remove('userToken')
    localStorage.clear()
    window.location.reload(false)
}
