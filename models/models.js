const dbProvider = require('../public/script/DBprovider');
const TemplateEngine = require('../20319'); // Đường dẫn tương đối đến 20319.js
        // Fetch Most Top Revenue Movies

// Dữ liệu mẫu
const data = {
    revenueMovies: [],
    totalSlides: 3, // Số lượng slide
    currentRevenueMoviePage: 2, // Slide hiện tại (đang active)
  };
  
  async function fetchRevenueMovies(page) {
    try {
        const data = await dbProvider.fetchData(`get/movie/?per_page=${this.perRevenueMoviePage}&page=${page}`);
        data.revenueMovies = data.items;
        console.log( data.revenueMovies[0])
        this.totalSlides = 5;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

fetchRevenueMovies(1);

// Các template con (partials)
const partials = {
    header: `
    <!-- Header -->
    <div class="d-flex align-items-center rounded header">
        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://code.jquery.com/ui/1.14.0/jquery-ui.min.js"></script>

        <!-- Bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

        <!-- VueJS -->
        <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>

        <!-- Fontawesome -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

        <link rel="stylesheet" type="text/css" href="../public/styles/styles.css"> 
        <script type="module" src="../public/script/DBprovider.js"></script>     
        <h4>20120319</h4>
        <h2>Movies Info</h2>
        <div class="form-check form-switch d-flex justify-content-center">
            <input 
                class="form-check-input" 
                type="checkbox" 
                id="darkModeSwitch" 
                v-model="isDarkMode" 
                @change="toggleTheme">
            <label 
                class="form-check-label" 
                for="darkModeSwitch" 
                v-html="isDarkMode ? '<i class=\'fa-solid fa-moon\'></i>' : '<i class=\'fa-regular fa-sun\'></i>'">
            </label>
        </div>
    </div>
    `,
    nav: `
    <!-- Nav -->
    <nav class="d-flex justify-content-between rounded">
      <span class="d-flex align-items-center" @click="backToHome"><i class="fa-solid fa-house"></i></span>
      <div class="inputGroup">
        <input 
          type="text" 
          class="rounded formControl" 
          id="inputSearch" 
          placeholder="Search..."
          v-model="searchText" />
        <button class="rounded inputGroupSearchIcon" id="searchIcon" @click="handleSearchInput">Search</button>
      </div>
    </nav> `,
    footer: `
        <!-- Footer -->
        <div class="rounded footer">Copyright by Ⓒ LTCuberik</div>`,
};

// Template chính
const template = `
20319{+header}
20319{+nav}
<div> 
    <div class="movies-section">
        <div class="position-relative">
            <!-- Movie Slider Container -->
            <div id="movieSlider" class="row">
                20319{for movie in revenueMovies}
                <div class="col-4 slider-item text-center">
                    <div class="card h-100 justify-content-center">
                        <img src="20319{movie.image}" alt="Movie Poster" class="card-img-top rounded">
                        <div class="card-movie-body position-absolute bottom-0 start-0 w-100 text-black p-2">
                            <h5 class="card-title">20319{movie.fullTitle}</h5>
                            <h6 class="card-title">ImDb: 20319{movie.ratings.imDb} - Revenue: 20319{movie.revenue}</h6>
                            <h6 class="card-title bonus">
                                Directors: 20319{convertListToString(movie.directorList, "name")} <br> 
                                Genre: 20319{convertListToString(movie.genreList, "value")}
                            </h6>
                        </div>
                    </div>
                </div>
                {/for}
            </div>
        </div>
    </div>
</div>
20319{+footer}
`;

// Hàm test render
const testHtml = () => {
    const engine = new TemplateEngine(partials);
    const html = engine.render(template, data);
    return html;
};

module.exports = { testHtml };
