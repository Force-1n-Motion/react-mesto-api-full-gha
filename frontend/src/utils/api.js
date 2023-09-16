 class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _verification(res) { return res.ok ? res.json() : Promise.reject }

  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._verification);
  }
  getCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._verification);
  }
  
  setUserInfo(data,token) {
    return fetch(`${this._url}/users/me`, {
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
      .then(this._verification);
  }

  setUserAvatar(data,token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type":'application/json', 
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._verification)
  }

  addCard(data,token) {
    return fetch(`${this._url}/cards`, {
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
    .then(this._verification)
  }
  addLike(idCard,token) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(this._verification);
  }
  deleteLike(idCard,token) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(this._verification);
  }
  deletecard(idCard,token) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(this._verification);
  }
}


const api = new Api({
  baseUrl: "https://api.azhgar.nomoredomainsicu.ru",
})

export default api