const backendAddress = 'https://cdugger-imagequiz-backend.herokuapp.com';

let apiAccess = {
    addCustomer: (name, email, password) => {
        return fetch(`${backendAddress}/register`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });
    },
    login: (email, password) => {
        return fetch(`${backendAddress}/login`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ email, password })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });
    }, logout: () => {
        return fetch(`${backendAddress}/logout`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });
    },
    getFlowers: () => {
        return fetch(`${backendAddress}/flowers`, {
            method: 'Get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x.result;
            });
    },
    getQuiz: (id) => {
        return fetch(`${backendAddress}/quiz/${id}`, {
            method: 'Get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x.result;
            })
    },
    addScore: (quizTaker, quizName, score) => {
        return fetch(`${backendAddress}/score`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quizTaker, quizName, score })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            })
    }

}

export default apiAccess;