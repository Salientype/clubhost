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
        url: api_url + 'api/groups',
        success: successCallback,
        error : errorCallback
    });
}

