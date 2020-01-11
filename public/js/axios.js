
function apiGetGroups() {

    return axios.get("http://localhost:3000/" + 'api/groups')
      .then((res) => res)
      .catch(err => err);
}

function apiAddGroups(data, successCallback, errorCallback) {
    axios.post(api_url + 'api/groups', data )
      .then(successCallback)
      .catch(errorCallback);
}
