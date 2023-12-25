import jwt from 'jsonwebtoken'

const jwtPassword = "server@root29"


const getToken = (user) => {
    const token = jwt.sign(user, jwtPassword)
    return token
}


export { getToken }