function apiGetGroups(successCallback, errorCallback) {

    $.ajax({
        url: api_url + 'api/groups',
        success: successCallback,
        error : errorCallback
    });
    
}

function apiAddGroups(data, successCallback, errorCallback) {

    $.ajax({
        type: "POST",
        data : data,
        url: "http://localhost:3000/" + 'api/groups',
        success: successCallback,
        error : errorCallback
    });
}

