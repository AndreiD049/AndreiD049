import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
    return axios
        .get(baseUrl)
            .then(response => response.data);
}

const create = (newPerson) => {
    return axios
            .post(baseUrl, newPerson)
                .then(response => response.data);
}

const update = (id, updatedPerson) => {
    return axios
            .put(`${baseUrl}/${id}`, updatedPerson)
                .then(response => response.data);
}

const remove = (id) => {
    const url = `${baseUrl}/${id}`;
    return axios
            .delete(url);
}

export default { getAll, create, update, remove }