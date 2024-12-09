class TemplateEngine {
    constructor(partials = {}) {
        this.partials = partials; // Template con
    }

    // Thêm phương thức convertListToString
    convertListToString(list, key) {
        return list.map((item) => item[key]).join(", ");
    }
    render(template, data) {
        // Xử lý template con
        template = template.replace(/20319\{\+(\w+)\}/g, (_match, partName) => {
            return this.partials[partName] || '';
        });
    
        // Xử lý chức năng convertListToString
        template = template.replace(
            /20319{convertListToString\((\w+), "(\w+)"\)}/g,
            (_match, listName, key) => {
                const list = data[listName];
                if (!Array.isArray(list)) return "";
                return this.convertListToString(list, key);
            }
        );
    
        // Xử lý vòng lặp {for}
        template = template.replace(
            /20319{for (\w+) in (\w+)}([\s\S]*?){\/for}/g,
            (_match, item, arrayName, content) => {
                const array = data[arrayName];
                if (!Array.isArray(array)) return '';
                return array
                    .map((element) => {
                        const extendedData = { ...data, [item]: element };
                        return this.render(content, extendedData);
                    })
                    .join('');
            }
        );
    
        // Xử lý điều kiện {if} với {else}
        template = template.replace(
            /20319{if (\w+)}([\s\S]*?){\/if}{else}([\s\S]*?){\/if}/g,
            (_match, variable, truePart, falsePart) => {
                return data[variable] ? this.render(truePart, data) : this.render(falsePart, data);
            }
        );
    
        // Xử lý điều kiện {if} không có {else}
        template = template.replace(
            /20319{if (\w+)}([\s\S]*?){\/if}/g,
            (_match, variable, truePart) => {
                return data[variable] ? this.render(truePart, data) : '';
            }
        );
    
        // Xử lý biến {biến hoặc object.property}
        template = template.replace(/20319{([\w.]+)}/g, (_match, path) => {
            const keys = path.split('.');
            let value = data;
            for (const key of keys) {
                value = value?.[key];
                if (value === undefined) break;
            }
            return value || '';
        });
    
        // Kiểm tra và xử lý layout
        const layoutMatch = template.match(/20319{layout (.+)}/);
        if (layoutMatch) {
            const layoutPath = layoutMatch[1].trim(); // Đường dẫn của layout
            const fs = require('fs');
            const path = require('path');
    
            // Đọc nội dung layout từ file
            const layoutFullPath = path.join(__dirname, 'views', layoutPath);
            const layoutContent = fs.readFileSync(layoutFullPath, 'utf8');
    
            // Xóa directive {layout ...} khỏi template
            template = template.replace(/20319{layout .+}/, '');
    
            // Thay thế {content} trong layout bằng nội dung template hiện tại
            template = layoutContent.replace('20319{content}', template);
    
            // Xử lý các partials trong layout sau khi chèn nội dung
            template = this.render(template, data);
        }
    
        return template; // Trả về kết quả cuối cùng
    }
    
    
    
}

module.exports = TemplateEngine;
