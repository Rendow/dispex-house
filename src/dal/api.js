import axios from "axios";

const instance = axios.create({
    baseURL:  'https://dispex.org/api/vtest/',
  })


export const addressAPI = {
    getStreets() {
        return instance.get(`Request/streets`)
    },
    getHouses(id) {
        return instance.get(`Request/houses/${id}`)
    },
    getHousesFlats(id) {
        return instance.get(`Request/house_flats/${id}`)
    },

}

export const housingStockAPI = {
    postClientData(data) {
        return instance.post(`HousingStock/client`,data)
    },
    bindClient(data) {
        return instance.put(`HousingStock/bind_client`,{data})
    },

}