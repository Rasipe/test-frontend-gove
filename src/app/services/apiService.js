const apiURL = "http://localhost:5000"
const endpoint = "cities"

function urlBuilder(...paramList) {
    return [apiURL, endpoint, ...paramList].join("/")
}

export const getAll = async () => {
    const response = await fetch(urlBuilder())
    return response.json();
}

export const getById = async (id) => {
    const response = await fetch(urlBuilder(id))
    return response.json();
}

export const createOrEdit = async (data) => {
    const response = await fetch(urlBuilder(data.id), {
        method: data.id? "PUT" : "POST",
        body: JSON.stringify(data)
    })
    return response.json();
}

export const deleteById = async (id) => {
    const response = await fetch(urlBuilder(id), { method: "DELETE" })
    return response.json();
}