
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

function apiDeleteGroup(data, successCallback, errorCallback) {
  axios.delete("http://localhost:3000/" + 'api/groups', data )
    .then(successCallback)
    .catch(errorCallback);
  }

function apiGetActivity() {

return axios.get("http://localhost:3000/" + 'api/activities')
  .then((res) => res)
  .catch(err => err);
}

function apiAddActivity(data, successCallback, errorCallback) {
axios.post("http://localhost:3000/" + 'api/activities', data )
  .then(successCallback)
  .catch(errorCallback);
}

