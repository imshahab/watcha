const apiKey = '679774f8'

document.addEventListener('DOMContentLoaded', () => {
    const mainContainerEl = document.querySelector('.main-container')
    const searchBtnEl = document.getElementById('search-btn')
    const searchTextEl = document.getElementById('search-text')

    async function getData(){
        if (searchTextEl.value) {
            const response = await fetch(`https://www.omdbapi.com/?apiKey=${apiKey}&s=${searchTextEl.value}&plot=full`)
            const data = await response.json()
            return data['Response'] === "True" ?  data : false
        }

    }

    async function renderData() {
        const data = await getData()
        console.log(data)
        if (data) {
            mainContainerEl.innerHTML = ''
            data['Search'].forEach(movie => {
                mainContainerEl.innerHTML += `
                <div class="movie-card">
                    <img id="movie-poster" src=${movie.Poster}>   
                    <div class="details-container">
                    <h5 id="movie-title">${movie.Title}</h5>
                    <div class="length-genre-watchlist">
                        <small id="year-text">${movie.Year}</small>
                        <button>
                            <i class="fa-solid fa-circle-plus"></i>
                            <small id="genre-text">Watchlist</small>
                        </button>
                    </div>
                </div>
                `
            })
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
    searchBtnEl.addEventListener('click', renderData)

    

})