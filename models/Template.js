const partials = {
    header: `
    <div id="app">
        <div class="d-flex align-items-center rounded header">
            <h4>20120319</h4>
            <h2>Movies Info</h2>
            <div class="form-check form-switch d-flex justify-content-center">
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="darkModeSwitch">
                <label 
                    class="form-check-label" 
                    for="darkModeSwitch">
                    <i class='fa-solid fa-moon'></i>
                </label>
            </div>
        </div>
    </div>
    `,
    nav: `
    <nav class="d-flex justify-content-between rounded">
        <span class="d-flex align-items-center">
            <a href="localhost:3000">Home</a>
        </span>
        <div class="inputGroup">
            <input 
                type="text" 
                class="rounded formControl" 
                id="inputSearch" 
                placeholder="Search...">
            <a 
                class="rounded inputGroupSearchIcon" 
                id="searchIcon" 
                href="localhost:3000/search/query?page=1">
                Search
            </a>
        </div>
    </nav>
    `,
    moviesSection: `
    <div class="movies-section">
        <div class="position-relative">
            <div id="movieSlider" class="row">
                {{#each revenueMovies}}
                <div class="col-4 slider-item text-center">
                    <a href="localhost:3000/movie/{{this.id}}">
                        <div class="card h-100 justify-content-center">
                            <img src="{{this.image}}" alt="Movie Poster" class="card-img-top rounded">
                            <div class="card-movie-body">
                                <h5 class="card-title">{{this.fullTitle}}</h5>
                                <h6 class="card-title">
                                    IMDb: {{this.ratings.imDb}} - Revenue: {{this.revenue}}
                                </h6>
                            </div>
                        </div>
                    </a>
                </div>
                {{/each}}
            </div>
        </div>
    </div>
    `,
    
    pagination: `
    <nav class="pagination-container mt-4">
        <ul class="pagination justify-content-center">
            <li class="page-item {{#if (eq currentPage 1)}}disabled{{/if}}">
                <a class="page-link" href="localhost:3000/search/query?page={{subtract currentPage 1}}">Previous</a>
            </li>
            {{#each totalPages}}
            <li class="page-item {{#if (eq this ../currentPage)}}active{{/if}}">
                <a class="page-link" href="localhost:3000/search/query?page={{this}}">{{this}}</a>
            </li>
            {{/each}}
            <li class="page-item {{#if (eq currentPage totalPages)}}disabled{{/if}}">
                <a class="page-link" href="localhost:3000/search/query?page={{add currentPage 1}}">Next</a>
            </li>
        </ul>
    </nav>
    `,
    footer: `
    <div class="rounded footer">
        Copyright by Ⓒ LTCuberik
    </div>
    `
};
