const KEY_ACCESS_TOKEN = 'access_token';

const setItem = (key, value)=>{
    return localStorage.setItem(key, value)
}

const getItem = (key)=>{
    return localStorage.getItem(key)
}

const removeItem = (key)=>{
    return localStorage.removeItem(key)
}

export {
    setItem,
    getItem,
    removeItem,
    KEY_ACCESS_TOKEN
}