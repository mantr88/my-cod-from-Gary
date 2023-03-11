const URL = 'https://hn.algolia.com/api/v1';


export const getData = (query, HITS_PER_PAGE, page) => 
    fetch(`${URL}/search?query=${query}&hitsPerPage=${HITS_PER_PAGE}&page=${page}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Cant load the items');
            }
        }
        ) 
    