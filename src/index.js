// ------------Load more/ Infinity scroll--------------------
import { getData } from './api';
import './css/common.css'

const HITS_PER_PAGE = 40;
let page = 0;
let query = '';
let pages = 0;
let items = [];


const refs = {
    form: document.querySelector('.form'),
    list: document.querySelector('.list'),
    loadMore: document.querySelector('.load-more'),
};

const render = () => {
    const list = items.map(({ title, url }) => `<li>
        <a href="${url}" target="_blank">${title}</a></li>`).join('');
    if (!page) {
        refs.list.innerHTML = '';
    }
    refs.list.insertAdjacentHTML('beforeend', list);
};



const fetchNews = () => {
    getData(query, HITS_PER_PAGE, page)
        .then((data) => {
            items = data.hits;
            pages = data.nbPages;

            render();
        })
        .catch((error) => { console.log('error:', error) });
};

const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget.elements.query;
    
    // перевірка для повернення на першу сорінку при наступному запиті
    if (query === value || !value) {
        return
    };
    query = value;
    page = 0;
    fetchNews();
};

const handleLoadMore = () => {
   if (items.length && page < pages) {
        page += 1;
        fetchNews();

    }
};

refs.form.addEventListener('submit', handleSubmit);
refs.loadMore.addEventListener('click', handleLoadMore);

const onButtonIntersect = (entities) => {
    const [button] = entities;

    if (button.isIntersecting) {
        handleLoadMore();        
    }
};

const observer = new IntersectionObserver(onButtonIntersect);

observer.observe(refs.loadMore);

// ------------Пагінація--------------------
// import { getData } from './api';
// import './css/common.css'

// const HITS_PER_PAGE = 5;
// let page = 0;
// let query = '';
// let pages = 0;
// let items = [];


// const refs = {
//     form: document.querySelector('.form'),
//     list: document.querySelector('.list'),
//     buttons: document.querySelector('.buttons'),
// };

// const render = () => {
//     const list = items.map(({ title, url }) => `<li>
//         <a href="${url}" target="_blank">${title}</a></li>`).join('');

//     refs.list.innerHTML = '';
//     refs.list.insertAdjacentHTML('beforeend', list);
// };

// const renderButtons = () => {
//     refs.buttons.innerHTML = '';
//     const buttons = Array(pages)
//     .fill()
//     .map(
//       (_, idx) =>
//         `<button ${
//             idx === page ? 'class="page active"' : 'class="page"'} 
//           data-page=${idx}>${idx + 1}</button>`,
//     )
//         .join('');
    
//     refs.buttons.insertAdjacentHTML('beforeend', buttons);
    
// };

// const fetchNews = () => {
//     getData(query, HITS_PER_PAGE, page)
//         .then((data) => {
//             items = data.hits;
//             pages = data.nbPages;

//             render();
//             renderButtons();
//         })
//         .catch((error) => { console.log('error:', error) });
// };

// const handleSubmit = (e) => {
//     e.preventDefault();
//     const { value } = e.currentTarget.elements.query;
    
//     // перевірка для повернення на першу сорінку при наступному запиті
//     if (query === value || !value) {
//         return
//     };
//     query = value;
//     page = 0;
//     fetchNews();
// };

// const handlePageClick = (e) => { 
//     page = Number(e.target.dataset.page);
    
//     fetchNews();
// };

// refs.form.addEventListener('submit', handleSubmit);
// refs.buttons.addEventListener('click', handlePageClick);