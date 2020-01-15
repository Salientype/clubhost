
function apiGetGroups() {

    return axios.get("http://localhost:3000/" + 'api/groups')
      .then((res) => res)
      .catch(err => err);
}

function apiAddGroups(data, successCallback, errorCallback) {
    axios.post("http://localhost:3000/" + 'api/groups', data )
      .then(successCallback)
      .catch(errorCallback);
}

// function apiAddGroups() {
//  return axios.post("http://localhost:3000/" + 'api/groups', data )
//     .then((res) => res)
//     .catch((err) => err);
// }

// axios({
//   method: 'post',
//   url: 'myurl',
//   data: bodyFormData,
//   headers: {'Content-Type': 'multipart/form-data' }
//   })
//   .then(function (response) {
//       //handle success
//       console.log(response);
//   })
//   .catch(function (response) {
//       //handle error
//       console.log(response);
//   });