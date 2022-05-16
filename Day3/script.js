const main = document.getElementById('main');
// Declare the other variables - get elements by id
const addButton = document.getElementById('add-button');
const cancelButton = document.getElementById('cancel-button');
const saveButton = document.getElementById('save-button');
const body = document.getElementById('body');

const formTitle = document.getElementById('formTitle');
const formTag = document.getElementById('formTag');
const formAuthor = document.getElementById('formAuthor');
const formDate = document.getElementById('formDate');
const formImgUrl = document.getElementById('formImgUrl');
const formContent= document.getElementById('formContent');

// Fetch the articles list
function getArticlesFromServer() {
    fetch('http://localhost:3000/articles')
        .then(function (response) {
            // Trasform server response to plain object
            response.json().then(function (articles) {
                renderArticles(articles);
            });
        });
};

// Add article
function addArticleToServer() {
    // Solution here
    const obj = {
        title: formTitle.value,
        tag: formTag.value,
        author: formAuthor.value,
        date: formDate.value,
        imgUrl: formImgUrl.value,
        content: formContent.value
    }
    fetch('http://localhost:3000/articles', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(
    function()    
    {
        getArticlesFromServer();
        
        resetForm();
        
        closeModal();
    });
}

// Delete article from server
function deleteArticleFromServer(id) {
    // Solution here
    fetch(`http://localhost:3000/articles/${id}`, {
        method: 'delete',
    }).then(function () {
        // Get the new articles list
        getArticlesFromServer();
    });
}

// Update article
function updateArticleToServer(id) {
    // Solution here
    const obj = {
        title: formTitle.value,
        tag: formTag.value,
        author: formAuthor.value,
        date: formDate.value,
        imgUrl: formImgUrl.value,
        content: formContent.value
    }
    fetch(`http://localhost:3000/articles/${id}`, {
        method: 'put',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(
    function()    
    {
        getArticlesFromServer();
        
        resetForm();
        
        closeModal();
    });
}

// Copy edited article information to form and add event listener on Update button
function openAddModal() {
    // Solution here
    saveButton.addEventListener('click', addArticleToServer);

    body.className = "show-modal";
}

// Copy edited article information to form and add event listener on Update button
function openEditModal(article) {
    // Solution here
    formTitle.value = article.title;
    formTag.value = article.tag;
    formAuthor.value = article.author;
    formDate.value = article.date;
    formImgUrl.value = article.imgUrl;
    formContent.value = article.content;

    saveButton.addEventListener('click', function() {
        updateArticleToServer(article.id);
    });
    body.className = "show-modal";
}

// Remove articles list if exist
function removeOldArticlesFromDOM () {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function createArticleDOMNode(article) {

    // Title
    let title = document.createElement('h2');
    title.className = "title";
    title.textContent = article.title;

    // Tag
    let tag = document.createElement('li');
    tag.className = "info__item";
    tag.textContent = article.tag;

    // Author
    let author = document.createElement('span');
    author.className = "info__mark";
    author.textContent = article.author;

    let authorContainer = document.createElement('li');
    authorContainer.className = "info__item";
    authorContainer.textContent = 'Added By ';
    authorContainer.appendChild(author)

    // Date
    let date = document.createElement('li');
    date.className = "info__item";
    date.textContent = article.date;

    // Information container
    let infoContainer = document.createElement('ul');
    infoContainer.className = "info__container";
    infoContainer.appendChild(tag);
    infoContainer.appendChild(authorContainer);
    infoContainer.appendChild(date);

    // Edit button
    let editButton = document.createElement('button');
    editButton.className = "actions__btn";
    
    // Add event on edit button and pass article object to populate the form  more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
    editButton.addEventListener('click', function () {
        openEditModal(article);
    });    
    editButton.textContent = 'Edit';

    // Delete button
    let deleteButton = document.createElement('button');
    deleteButton.className = "actions__btn";
    
    // Add event on delete button and pass article id to delete it form server more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
    deleteButton.addEventListener('click', function() {
        deleteArticleFromServer(article.id);
    });
    deleteButton.textContent = 'Delete';

    // Buttons container
    let buttonsContainer = document.createElement('div');
    buttonsContainer.className = "actions__container";
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    // Image
    let img = document.createElement('img');
    img.src = article.imgUrl;

    // Paragraph
    let paragraph = document.createElement('p');
    paragraph.textContent = article.content;

    // Paragraph container
    let paragraphContainer = document.createElement('div');
    paragraphContainer.className = "content__container";
    paragraphContainer.appendChild(paragraph);

    // Append all article nodes to container
    let articleNode = document.createElement('article');
    articleNode.appendChild(title);
    articleNode.appendChild(infoContainer);
    articleNode.appendChild(buttonsContainer);
    articleNode.appendChild(img);
    articleNode.appendChild(paragraphContainer);

    return articleNode;
}

// Create DOM objects and append them to DOM
function renderArticles(articles) {
    
    removeOldArticlesFromDOM()

    // Create and append tags
    for (let i = 0; i < articles.length; i++) {
        let articleDOMNode = createArticleDOMNode(articles[i]);
        main.appendChild(articleDOMNode);
    }
}

// Reset form values
function resetForm() {
    // Solution here
    formTitle.value = '';
    formTag.value = '';
    formAuthor.value = '';
    formDate.value = '';
    formImgUrl.value = '';
    formContent.value = '';
}
//  Remove Save Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function clearSaveButtonEvents() {
    // Solution here
}

// Close modal
function closeModal() {
    // Solution here
    body.className = "";
}

// Add event listener on Add button
addButton.addEventListener('click', openAddModal);
// Add event listener on Cancel button
cancelButton.addEventListener('click', closeModal);


// Get all articles
getArticlesFromServer();