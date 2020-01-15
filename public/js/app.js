var api_url = 'http://localhost:3000/';

function createPostItem(data) {
    let item = `
        <div class="card" style="width: 18rem;">
            <img src="../images/lion.jpg" class="card-img-top" alt="Could not load image">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
                <a href="#" class="btn btn-primary">Join!</a>
            </div>
        </div>
    `;
    return item;
}

function insertIntoFeed(item) {
    $('#groupFeed').append(item); 
}

