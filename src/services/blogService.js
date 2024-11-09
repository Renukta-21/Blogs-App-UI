const baseUrl = `/api/blogs`

const getAll =async ()=>{
    const response = await fetch(baseUrl, {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data =await response.json()
    return data
}
let token
const setToken = token=>{
    token = `Bearer ${token}`

}
export default { getAll, setToken}