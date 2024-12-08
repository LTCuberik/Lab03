class TemplateEngine {
    constructor(partials = {}) {
        this.partials = partials; // Template con
    }

    render(template, data) {
        // Xử lý template con
        template = template.replace(/20319\{\+(\w+)\}/g, (_match, partName) => {
            return this.partials[partName] || '';
        });


        // Xử lý điều kiện {if} với {else}
        template = template.replace(
            /20319{if (\w+)}([\s\S]*?){else}([\s\S]*?){\/if}/g,
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

        // Xử lý biến {biến}
        template = template.replace(/20319{(\w+)}/g, (_match, variable) => {
            console.log(variable);
            return data[variable] || '';
        });

        return template;
    }
}

module.exports = TemplateEngine;
