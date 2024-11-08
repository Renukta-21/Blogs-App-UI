const baseUrl = `/api/blogs`

const getAll =async ()=>{
    const response = await fetch('http://localhost:3006/api/blogs', {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data =await response.json()
    return data
}

export default { getAll}