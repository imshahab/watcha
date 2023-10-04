

document.addEventListener('DOMContentLoaded', () => {
    const mainContainerEl = document.querySelector('.main-container')
    const succesfulIcon = '<i class="fa-solid fa-circle-check"></i>'
    const failedIcon = '<i class="fa-solid fa-circle-xmark"></i>'
    let favMovies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []
    
    document.addEventListener('click', e => {
        if (e.target.className == 'remove-btn' || e.target.parentElement.className == 'remove-btn') {
            const id = e.target.dataset.id
            favMovies = favMovies.filter(movie => movie.imdbID != id)
            localStorage.setItem('movies', JSON.stringify(favMovies))
            renderData()
            launchToast(succesfulIcon, 'Movie removed successfully!')

        }
    })


    function renderData() {
        if (favMovies.length != 0) {
        const moviesArr = JSON.parse(localStorage.getItem('movies')).reverse()
        let moviesHtml = ''
        moviesArr.forEach(movie => {
            moviesHtml += `<div class="movie-card">
            <img id="movie-poster" src=${movie.Poster}>
            <div class="details-container">
                <div class="name-rating">
                    <h5 id="movie-title">${movie.Title}</h5>
                    <div class="rating-container">
                        <i class="fa-solid fa-star"></i>
                        <small id="score-text">${movie.imdbRating}</small>
                </div>
            </div>
            <div class="length-genre-watchlist">
                <small id="length-text">${movie.Runtime}</small>
                <small id="genre-text">${movie.Genre}</small>
                <button class="plot-btn" data-id=${movie.imdbID}>
                    <i class="fa-solid fa-file-lines" data-id=${movie.imdbID}></i>
                    <small id="genre-text" data-id=${movie.imdbID}>Plot</small>
                </button>
                <button class="remove-btn" data-id=${movie.imdbID}>
                    <i class="fa-solid fa-circle-minus" data-id=${movie.imdbID}></i>
                    <small id="genre-text" data-id=${movie.imdbID}>Remove</small>
                </button>
            </div>
            <div class="description-box">
                <p>${movie.Plot}</p>
           </div>
           </div>
        </div>
    `
        })
        mainContainerEl.innerHTML = moviesHtml
    }
    else {
        mainContainerEl.innerHTML = `<div class="center-placeholder">
        <small>Your watchlist is looking a little empty...</small>
        <a href="index.html">
            <i class="fa-solid fa-circle-plus"></i>
            <small id="genre-text">Let's add some movies!</small>
        </a>
    </div>`
    }
    }

    function launchToast(icon, text) {
        const toastEl = document.querySelector('.toast')
        const toastDescEl = document.querySelector('.toast #desc')
        const toastImgEl = document.querySelector('.toast #img')
        toastDescEl.textContent = text
        toastImgEl.innerHTML = icon
        toastEl.classList.toggle('show')
        setTimeout(() => { toastEl.classList.toggle('show') }, 5000);
    }
    
   
    renderData()
    
    

})