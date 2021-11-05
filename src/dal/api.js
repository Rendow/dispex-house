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
    getFlatClients(id) {
        return instance.get(`HousingStock/clients?addressId=${id}`)
    },
    postClientData(data) {
        return instance.post(`HousingStock/client`, {...data, Id:0, BindId:0})
    },
    bindClient(data) {
        return instance.put(`HousingStock/bind_client`, {AddressId: data.address, ClientId: data.clientID})
    },
    deleteClient(id) {
        return instance.delete(`HousingStock/bind_client/${id}`)
    },

}