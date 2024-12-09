const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const TemplateEngine = require('./TemplateEngine'); // Đường dẫn đến file TemplateEngine.js

const app = express();
const port = 3000;

// Static routes
app.use('/public', express.static(path.join(__dirname, 'public')));

// Đọc các partials
const partials = {
    header: fs.readFileSync(path.join(__dirname, 'views', 'partials', 'header.20319'), 'utf8'),
    nav: fs.readFileSync(path.join(__dirname, 'views', 'partials', 'nav.20319'), 'utf8'),
    footer: fs.readFileSync(path.join(__dirname, 'views', 'partials', 'footer.20319'), 'utf8')
};

// Tạo instance của TemplateEngine với partials
const engine = new TemplateEngine(partials);

// Middleware để xử lý render template
app.engine('20319', (filePath, options, callback) => {
    // Đọc file template
    fs.readFile(filePath, 'utf8', (err, template) => {
        if (err) return callback(err);

        // Render template bằng TemplateEngine
        const rendered = engine.render(template, options);
        return callback(null, rendered);
    });
});

// Cấu hình Express sử dụng engine tùy chỉnh
app.set('views', path.join(__dirname, 'views')); // Đường dẫn đến thư mục views
app.set('view engine', '20319'); // Sử dụng đuôi file 20319 làm template engine

// Import routes
const movieRoutes = require('./routes/routes');

// Sử dụng các routes
app.use('/', movieRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
