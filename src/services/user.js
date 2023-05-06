import axios from 'axios'

const baseUserUrl = 'http://172.20.10.4:8080/users'


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
    fans: "9,10",
    followings: "9,10",
    haters: "1,2",
    avatarUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"
  }
  const returnedUser = JSON.parse(JSON.stringify(fakeUser))
  return returnedUser
}


const addFollower = async (logginedUserId, authorID, logginedUserToken) => {
  // const config = {
  //   headers: {
  //       'Authorization': `token 23e5e8d1-a521-4149-b3f9-fff222eec957` // 添加Authorization token
  //   }
  // }


  // console.log("发到了这个接口：",`${baseUserUrl}/${logginedUserId}/follow`, followedId)
  const response = await axios.post(`${baseUserUrl}/${logginedUserId}/follow/${authorID}`);

  //console.log("发到了这个接口：",`${baseUserUrl}/3/follow`)
  return response
}

const cancelFollower = async (logginedUserId, authorID, logginedUserToken) => {
  // const config = {
  //   headers: {
  //       'Authorization': `token ${logginedUserToken}` // 添加Authorization token
  //   }
  // }
  console.log("发到了这个接口：", `${baseUserUrl}/${logginedUserId}/follow`)
  const response = await axios.put(`${baseUserUrl}/${logginedUserId}/follow/${authorID}`);

  return response
}

const getAll = async () => {
  const response = await axios.get(`${baseUserUrl}`)
  return response.data
}

export { getOneUserInfo, addFollower, cancelFollower, getAll }