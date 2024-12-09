export const dbProvider = {
    async getAPI(type, clss, pattern = {}) {
        console.log(type,clss);
        const url = `http://matuan.online:2422/api/${clss}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            switch (type) {
                case 'get':
                    return this.getAPIfilter(data, pattern, clss);
                case 'search':
                    return this.searchAPIfilter(data, pattern, clss);
                case 'detail':
                    return this.detailAPIfilter(data, pattern);
                default:
                    return 'Unknown type';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    calculateRevenue(boxOffice) {
        const parseAmount = (amount) => parseInt(amount.replace(/[\$,]/g, "")) || 0; // Loại bỏ ký tự $ và , để chuyển thành số
        const gross = parseAmount(boxOffice.cumulativeWorldwideGross);
        if (!gross) return 0;
        return gross;
    },

    async getAPIfilter(data, pattern, clss) {
        const params = new URLSearchParams(pattern);
        console.log(pattern);
        const perPage = parseInt(params.get('per_page') || 10);
        const page = parseInt(params.get('page') || 1);
        const startIndex = perPage * (page - 1);
        const endIndex = perPage * page;
        console.log(clss);
        if (clss == 'Movies'){
            data.forEach(item =>{
                let revenue = 0;
                if (item.boxOffice) {
                    revenue = this.calculateRevenue(item.boxOffice);
                }
                item.revenue = revenue;
            })        
            data.sort((a, b) => b.revenue - a.revenue);
        }
 
        const paginatedItems = data.slice(startIndex, endIndex);
        console.log(data);
        return {
            perPage,
            page,
            totalPages: Math.ceil(data.length / perPage),
            total: data.length,
            items: paginatedItems,
        };
    },

    async searchAPIfilter(data, pattern, clss) {
        const [searchQuery, param] = pattern.split('?');
        const params = new URLSearchParams(param);
        const perPage = parseInt(params.get('per_page') || 10);
        const page = parseInt(params.get('page') || 1);
        let filteredItems = [];
        if (clss == 'Movies'){
            filteredItems = data.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        } else {
            filteredItems = data.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        const startIndex = perPage * (page - 1);
        const endIndex = perPage * page;
        console.log(searchQuery);
        const paginatedItems = filteredItems.slice(startIndex, endIndex);
        console.log(paginatedItems);
        return {
            search: searchQuery,
            perPage,
            page,
            totalPages: Math.ceil(filteredItems.length / perPage),
            total: filteredItems.length,
            items: paginatedItems,
        };
    },

    async detailAPIfilter(data, pattern) {
        const movie = data.find(item => item.id === pattern);
        if (!movie) {
            throw new Error('Movie not found');
        }
        return movie;
    },

    async fetchData(input) {
        const [type, cls, pattern] = input.split('/');
        if (!type || !cls || !pattern) {
            throw new Error('Invalid input format. The format should be <type>/<class>/pattern');
        }

        let clss = '';
        switch (cls) {
            case 'name':
                clss = 'Names';
                break;
            case 'top50':
                clss = 'Top50Movies';
                break;
            case 'mostpopular':
                clss = 'MostPopularMovies';
                break;
            case 'topboxoffice':
                clss = 'Movies';
                break;
            default:
                clss = 'Movies';
        }
        return await this.getAPI(type, clss, pattern);
    },
};
