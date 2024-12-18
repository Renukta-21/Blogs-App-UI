const baseUrl = `/api/blogs`

const getAll =async ()=>{
    const response = await fetch(baseUrl, {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
    /* if(!response.ok) throw new Error(`${response.url} does not exist`) */
    const data =await response.json()
    console.log(data)
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

const putLike = async(object)=>{
    const response = await fetch(`${baseUrl}/${object.id}`, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }, body: JSON.stringify(object)
    })

    const data = await response.json()
    return data
}

const deleteBlog = async(blogId) =>{
    const response = await fetch(`${baseUrl}/${blogId}`, {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token
        }
    })
    if (!response.ok) {
        throw new Error('Error al eliminar el blog');
      }

    return null
}
export default { getAll, setToken, createPost, putLike, deleteBlog}