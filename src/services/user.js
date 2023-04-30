import axios from 'axios'

const baseUserUrl = 'http://localhost:9000/users'

// const getOneUserInfo = async (id) => {
//     const returnedUser = await axios.get(`${baseUserUrl}/${id}`)
//     return returnedUser.data
//   }

const getOneUserInfo = async (id) => {
    const fakeUser = {
        Id: 123,
        username: "UserA",
        password: "123456789",
        birthday: "2010-1-1",
        token: "random",
        creationDate: "1999-1-1",
        email: "UserA@qq.com",
        location: "Zurich",
        fans: "1,2,3,4,5,6,7,8,9,9999",
        followings: "1,2,3,4,5,6,7,8,9,10",
        haters: "1,2",
        avatarUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"
    }
    const returnedUser = JSON.parse(JSON.stringify(fakeUser))
    return returnedUser
  }


const addFollower = async (logginedUserId, authorID) => {
    const response = await axios.post(`${baseUserUrl}/${logginedUserId}/follow`,{
        followedId: authorID
    });
    return response
  }
const cancelFollower = async (logginedUserId,authorID) => {
    const response = await axios.put(`${baseUserUrl}/${logginedUserId}/follow`,{
        followedId: authorID
    });
    return response
  }
  
export { getOneUserInfo, addFollower, cancelFollower }