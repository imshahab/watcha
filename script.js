document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '679774f8'
    const succesfulIcon = '<i class="fa-solid fa-circle-check"></i>'
    const failedIcon = '<i class="fa-solid fa-circle-xmark"></i>'
    let favMovies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []
    



    const mainContainerEl = document.querySelector('.main-container')
    const searchBtnEl = document.querySelector('#search-btn')
    const searchTextEl = document.querySelector('#search-text')
    const detailsPopupEl = document.querySelector('.details-popup')
    const darkTintEl = document.querySelector('.background-dark-tint')
    const loadingEl = document.querySelector('.loading-ring')
    



    document.addEventListener('click', async e => {
        if (e.target.className == 'plot-btn' || e.target.parentElement.className == 'plot-btn') {
            loadingEl.style.visibility = 'visible'
            const id = e.target.dataset.id
            const movie = await getDetails(id)
            detailsPopupEl.innerHTML = `
            <i class="fa-regular fa-circle-xmark" id="close-popup-btn"></i>
                <h4>${movie.Title}</h4>
                <div class="description-popup">
                    <p>${movie.Plot}</p>
            </div>`
            loadingEl.style.visibility = 'hidden'
            detailsPopupEl.style.visibility = 'visible'
            darkTintEl.style.visibility = 'visible'

            document.querySelector('#close-popup-btn').addEventListener('click', () => {
                closePopup()
            })

            darkTintEl.addEventListener('click', () => {
                closePopup()
            })
    
            
        }

        else if (e.target.className == 'add-btn' || e.target.parentElement.className == 'add-btn') {
            const id = e.target.dataset.id
            if (!favMovies.map(movie => movie.imdbID).includes(id)) {
                const movie = await getDetails(id)
                favMovies.push(movie)
                localStorage.setItem('movies', JSON.stringify(favMovies))
                launchToast(succesfulIcon, 'Movie added to your List!')
            }
            else {
                launchToast(failedIcon, 'Movie already exists!')
            }
        }
    }
    )


    function closePopup() {
        detailsPopupEl.style.visibility = 'hidden'
        darkTintEl.style.visibility = 'hidden'
    }

    async function getIds(){
        let result = []
        if (searchTextEl.value) {
            const response = await fetch(`https://www.omdbapi.com/?apiKey=${apiKey}&s=${searchTextEl.value}&plot=full`)
            const data = await response.json()
            if (data['Response'] === "True") {
                data['Search'].forEach(movie => {
                    result.push(movie['imdbID'])
                })
                return result
            }
            else {
                return false
            }
        }
    }

    async function getDetails(id) {
        const response = await fetch(`https://www.omdbapi.com/?apiKey=${apiKey}&i=${id}`)
        const movieObj = await response.json()
        return movieObj
    }



    async function renderData() {
        const ids = await getIds()
        if (ids) {
            mainContainerEl.innerHTML = ''
            ids.forEach(async id => {
                const movie = await getDetails(id)
                mainContainerEl.innerHTML += `<div class="movie-card">
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
                        <button class="add-btn" data-id=${movie.imdbID}>
                            <i class="fa-solid fa-circle-plus" data-id=${movie.imdbID}></i>
                            <small id="genre-text" data-id=${movie.imdbID}>Watchlist</small>
                        </button>
                    </div>
                    <div class="description-box">
                        <p>${movie.Plot}</p>
                   </div>
                   </div>
                </div>
            `
                }
            )
            
        }
        else {
            mainContainerEl.innerHTML = `            
                <div class="center-placeholder">
                    <small>Unable to find what you’re looking for. Please try another search.</small>
                </div>
            `
        }
        searchTextEl.value = ''
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


    searchBtnEl.addEventListener('click', renderData)


    

})

