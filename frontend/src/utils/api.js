 class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

   _verification(res) { return res.ok ? res.json() : Promise.reject }
   
   _request(url, options) {
     return fetch(`${this._url}${url}`, options)
     .then(this._verification)
   }

  getInfo(token) {
    return this._request('/users/me', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }
   
  getCards(token) {
    return this._request('/cards', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }
  
  setUserInfo(data, token) {
    return this._request('/users/me', {
      method: "PATCH",
      headers: {
        "Content-Type":'application/json', 
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.occupation,
      })
    })
  }

   setUserAvatar(data, token) {
    return this._request('/users/me/avatar', {
      method: "PATCH",
      headers: {
        "Content-Type":'application/json', 
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
  }

  addCard(data, token) {
    return this._request('/cards', {
      method: "POST",
      headers: {
        "Content-Type":'application/json', 
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      })
    })
  }
   
  addLike(idCard,token) {
    return this._request(`/cards/${idCard}/likes`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }
   
  deleteLike(idCard, token) {
    return this._request(`/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }
   
  deleteCard(idCard,token) {
    return this._request(`/cards${idCard}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }
}


const api = new Api({
  baseUrl: "https://api.azhgar.nomoredomainsicu.ru",
})

export default api