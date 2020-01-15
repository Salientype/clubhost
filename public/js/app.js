var api_url = 'http://localhost:3000';

function createPostItem(data) {
    let item = `
      <div class="card card-body bg-light mb-4">
        <div>${data.firstName}</div>
        <div>${data.lastNname}</div>
        <div>${data.email}</div>
      </div>
`;
    return item;
}

  function insertIntoFeed(item) {
    $('#displayUserInput').append(item);
}