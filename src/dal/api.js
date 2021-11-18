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
    postClientData_(clientId, Name=' ', Phone, Email=' ', addressId) {
        return instance.post(`HousingStock/client`, {
            Id: clientId,
            Name,
            Phone,
            Email,
            BindId: addressId,
        })
    },
    bindClient({AddressId, ClientId}) {
        console.log(AddressId,ClientId)
        return instance.put(`HousingStock/bind_client`, {AddressId, ClientId})
    },
    deleteClient(id) {
        return instance.delete(`HousingStock/bind_client/${id}`)
    },

}