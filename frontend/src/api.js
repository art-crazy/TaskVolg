import axios from 'axios';
import axiosRetry from 'axios-retry';
import 'regenerator-runtime/runtime';
import {actionGetUserCards} from "./store/actions";

let BASE_URL = "http://localhost:5000";

function isDebug() {
    return process.env.NODE_ENV !== 'production';
}

/* При ошибке HTTP запроса (ответ не 200 и не 502) axios делает повторные запросы */
axiosRetry(axios, {
    retries: isDebug() ? 3 : 5,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        return error.response.status !== 200 && error.response.status !== 502 && error.response.status !== 901 && error.response.status !== 520
    },
});

const getData = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(BASE_URL + "/getdata");
            return dispatch(actionGetUserCards(res.data));
        } catch (err) {
            console.log(err);
        }
    };
};

export {
    getData
};
