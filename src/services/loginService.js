const baseUrl =  '/api/login'
const login = async(userLogging) => {
    const response = await fetch(baseUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogging)
    })
    const data = await response.json()
    /* console.log(`User
        username:${userLogging.username}
        password:${userLogging.password}`) */
    return data
}

export default {
  login,
}
