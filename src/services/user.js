import axios from 'axios'

const baseUserUrl = 'http://172.20.10.2:8080/users'


// const getOneUserInfo = async (id) => {
//     const returnedUser = await axios.get(`${baseUserUrl}/${id}`)
//     return returnedUser.data
//   }

const getOneUserInfo = async (id) => {
    const fakeUser = {
        Id: 123,
        username: "SupperMan",
        password: "123456789",
        birthday: "2010-1-1",
        token: "random",
        creationDate: "1999-1-1",
        email: "UserAisSuperman@qq.com",
        location: "Zurich",
        fans: "9,10",
        followings: "7,6,5",
        haters: "1,2",
        avatarUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"
    }
    const returnedUser = JSON.parse(JSON.stringify(fakeUser))
    return returnedUser
  }


const addFollower = async (logginedUserId, authorID, logginedUserToken) => {

    // console.log("发到了这个接口：",`${baseUserUrl}/${logginedUserId}/follow`, followedId)
    const response = await axios.post(`${baseUserUrl}/${logginedUserId}/follow/${authorID}`);

    return response
  }

const cancelFollower = async (logginedUserId, authorID, logginedUserToken) => {
  console.log("发到了这个接口：",`${baseUserUrl}/${logginedUserId}/follow`)
    const response = await axios.put(`${baseUserUrl}/${logginedUserId}/follow/${authorID}`);
    
    return response
  }
  
export { getOneUserInfo, addFollower, cancelFollower }