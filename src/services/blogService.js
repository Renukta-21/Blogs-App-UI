const baseUrl = `/api/blog`

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
const setToken = actualToken=>{
    token = `Bearer ${actualToken}`

}

const createPost = async(newBlog)=>{
    console.log(token)
    const response = await fetch(baseUrl,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': token
        }, body: JSON.stringify(newBlog)
    })
    const data = await response.json()
    return data
}

export default { getAll, setToken, createPost}