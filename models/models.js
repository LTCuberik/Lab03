const TemplateEngine = require('../20319');
const data = {
    title: "Sách hay",
    books: [
        { name: "Sách 1", authors: ["Tác giả A", "Tác giả B"] },
        { name: "Sách 2", authors: ["Tác giả C"] },
    ],
    showBooks: true,
};

const partials = {
    header: `
    <!-- Header -->
    <div class="d-flex align-items-center rounded header">
        <!--jQuery-->
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://code.jquery.com/ui/1.14.0/jquery-ui.min.js"></script>

        <!--Bootstrap-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

        <!--VueJS-->
        <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>

        <!--Fontawesome-->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

        <link rel="stylesheet" type="text/css" href="../public/styles/styles.css">   
        <script type="module" defer src="../public/script/scripts.js"></script>
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
        </div>
    </div>
    `,
    nav:` `,

    footer: `
        <!-- Footer -->
        <div class="rounded footer">Copyright by Ⓒ LTCuberik</div>`,
};

const engine = new TemplateEngine(partials);
const template = `
20319{+header}
20319{+nav}
<div> 
    <h1>20319{title}</h1>
    20319{if showBooks}
    <div>     
    </div>
    {else}
        <p>Không có sách nào để hiển thị.</p>
    {/if}
</div>
20319{+footer}
`;

const testHtml = () =>{
    const html = engine.render(template, data);
    return html;
}

module.exports = { testHtml };


