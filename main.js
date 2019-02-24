// #1
const promise = new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open('GET', './data.json');
    request.onload = function () {
        this.status === 200 ? resolve(JSON.parse(this.response)) : reject(this.statusText)
    };
    request.onerror = function () {
        reject(new Error("Network Error"));
    }
    request.send();
});
promise.then(
    response => console.log(response),
    error => console.log(error)
);
// #2
let state = {
    data: null,
    getDataLastCall: null
}

function getData() {
    return new Promise(resolve => {
        setTimeout(() => resolve(42), 1000)
    })
}

function addNewData(data) {
    state = {
        data,
        getDataLastCall: new Date().getTime()
    }
    console.log('1st call', state);

}

function returnData(data) {
    state = {
        ...state,
        getDataLastCall: new Date().getTime()
    }
    console.log('<5s', state.data);
    return data


}

document.querySelector('button').addEventListener('click', () => {
    if (!state.data) {
        getData().then(res => {
            addNewData(res);
        })

    } else if (new Date().getTime() - state.getDataLastCall < 5000) {
        returnData(state.data)
    }
    else {
        getData().then(res => {
            addNewData(res);
        })
    }
})






