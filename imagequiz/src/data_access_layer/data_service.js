import flowers from '../temp_data/flowers';
import data from '../temp_data/data';
let data_service= {
    customers: [],
    getFlowers: () => {
        return flowers;
    },
    getQuiz: (name) => {
        let quiz = data.find(x => x.name.toLowerCase() === name.toLowerCase());
        return quiz;
    },
    addCustomer: (name, email, password) => {

    }
}

export default data_service;