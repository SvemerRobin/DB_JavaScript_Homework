// Declare main variable - get main element by id
// const root = document.getElementById('root');
// const form = document.getElementById('form');
// let inputName, inputImg, submitButton;
const main = document.getElementById('A');

// Fetch the articles list
async function getArticlesFromServer() {
    // Solution here
    const response = await fetch('http://localhost:3000/articles');
    if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
    }
    await response.json().then((response) => {
    renderArticles(response);
    });
    return response;
};

// Remove articles list if exist
function removeOldArticlesFromDOM () {
    // Solution here
    main.innerHTML="";
}

function createArticleDOMNode(article) {
    // Solution here

    const articleEl = document.createElement('article');

    const h2 = document.createElement('h2');
    h2.textContent = article.title;
    h2.className="title";

    const ul = document.createElement('ul');
    ul.className = "info__container";
    
    const tag = document.createElement('li');
    tag.textContent = article.tag;
    tag.className = "info__item";

    const addedBy = document.createElement('li');
    addedBy.textContent = "Added by";
    addedBy.className = "info__item";


    const author = document.createElement('span');
    author.textContent = article.author;
    author.className = "info__mark";

    addedBy.appendChild(author);

    const date = document.createElement('li');
    date.textContent = article.date;
    date.className = "info__item";

    ul.appendChild(tag);
    ul.appendChild(addedBy);
    ul.appendChild(date);

    const actions = document.createElement('div');
    actions.className = "actions__container";
    const edit = document.createElement('button');
    edit.textContent = "Edit";
    edit.className = "actions__btn";
    edit.type = "button";
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "actions__btn";
    deleteButton.type = "button";

    actions.appendChild(edit);
    actions.appendChild(deleteButton);

    const img = document.createElement('img');
    img.setAttribute('src', article.imgUrl);

    const div = document.createElement('div');
    div.className="content__container";
    const p = document.createElement('p');
    p.textContent = article.content;
    div.appendChild(p);


    articleEl.appendChild(h2);
    articleEl.appendChild(ul);
    articleEl.appendChild(actions)
    articleEl.appendChild(img);
    articleEl.appendChild(div);

    return articleEl;
}

// Create DOM objects and append them to DOM
function renderArticles(articles) {
    
    removeOldArticlesFromDOM();

    // Create and append articles given as parameter
    articles.forEach((articlePart) => {
        const article = createArticleDOMNode(articlePart);

        main.appendChild(article);
    })
}

// Get all articles
getArticlesFromServer();