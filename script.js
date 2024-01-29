// document.addEventListener('DOMContentLoaded', function () {
//     fetchMovies();
//     // updateDynamoDB();
// });

// async function fetchMovies() {
//     try {
//         const response = await fetch('https://zvhf8xbej5.execute-api.us-east-1.amazonaws.com/suvi-webapp');
//         const data = await response.json();

//         // Display movies data
//         const moviesList = document.getElementById('moviesList');
//         const moviesHTML = data.map(movie => {
//             return `<div>
//                         <h2>${movie.Title}</h2>
//                         <p>Type: ${movie.Type}</p>
//                         <p>Release Year: ${movie['Release Year']}</p>
//                         <p>Director/Author: ${movie['Director/Author']}</p>
//                     </div>`;
//         }).join('');

//         moviesList.innerHTML = moviesHTML;
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//     }
// }
// // async function updateDynamoDB() {
// //     // Trigger Lambda function to update DynamoDB
// //     await fetch('Yhttps://zvhf8xbej5.execute-api.us-east-1.amazonaws.com/suvi-webapp');
// // }

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchQuery = document.getElementById('searchQuery').value;
        fetchMovies(searchQuery);
    });

    // Initial load with an empty query to display all movies
    fetchMovies('');
});

async function fetchMovies(query) {
    try {
        const response = await fetch(`https://zvhf8xbej5.execute-api.us-east-1.amazonaws.com/suvi-webapp?query=${query}`);
        const data = await response.json();

        // Display movies data
        const moviesList = document.getElementById('moviesList');
        const moviesHTML = data.map(movie => {
            return `<div>
                        <h2>${movie.Title}</h2>
                        <p>Type: ${movie.Type}</p>
                        <p>Release Year: ${movie['Release Year']}</p>
                        <p>Director/Author: ${movie['Director/Author']}</p>
                    </div>`;
        }).join('');

        moviesList.innerHTML = moviesHTML;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

