var app = new Vue({
    el: '#app',
    data: {
        province: '',
        cities: [],
        provincesOptions: [],
        cityOptions: [],
        rawData: [],
        totalCities: [],
        citiesString: ''
    },
    mounted() {
        this.loadCities();
    },
    methods: {
        loadCities() {
            const url = './assets/ChineseCities.json';
            console.log("loading " + url);
            axios.get(url).then(res => {
                this.rawData = res.data.provinces;
                console.log("load " + url + " successfully");
                this.initProvincesOptions();
            }, () => {
                console.log('Load ' + url + ' Error!');
            });
        },
        initProvincesOptions() {
            this.rawData.forEach((data) => {
                let item = {};
                item.value = data.provinceName;
                item.label = data.provinceName;
                this.provincesOptions.push(item);
            });
        },
        initCityOptions() {
            let province = this.province;
            if (province == '') {
                return;
            }
            this.cities = [];
            this.cityOptions = [];
            let cities = this.rawData.find(item => item.provinceName === province).citys;
            console.log(cities);
            cities.forEach((city) => {
                let item = {};
                item.value = city.cityName;
                item.label = city.cityName;
                this.cityOptions.push(item);
            });
        },
        addCities() {
            this.cities.forEach((city) => {
                if (this.province != city) {
                    city = this.province + city;
                }
                this.totalCities.push(city);
            })
            this.province = '';
            this.cities = [];
            this.cityOptions = [];
            this.updateCitiesString();
        },
        updateCitiesString() {
            this.totalCities = Array.from(new Set(this.totalCities))
            this.totalCities.sort((a, b) => a.localeCompare(b));
            this.citiesString = '';
            this.totalCities.forEach((item) => {
                if (this.citiesString.length > 0) {
                    this.citiesString += ',';
                }
                this.citiesString += item;
            });
        }


    }

});