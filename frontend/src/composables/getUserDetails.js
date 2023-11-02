export async function getUserDetails (email) {
    let req = await fetch(`http://localhost:3000/api/user/get-details?email=${email}`, { credentials: 'include' })
    let res = await req.json()

    return res
}