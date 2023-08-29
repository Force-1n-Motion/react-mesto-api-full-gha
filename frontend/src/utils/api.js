 class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _verification(res) { return res.ok ? res.json() : Promise.reject }

  getInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._verification);
  }
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      }
    })
      .then(this._verification);
  }
  
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.occupation,
      })
    })
      .then(this._verification);
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._verification)
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      })
    })
    .then(this._verification)
  }
  addLike(idCard) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._verification);
  }
  deleteLike(idCard) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._verification);
  }
  deletecard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._verification);
  }
}


const api = new Api({ //Экземпляр класса Api
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "e953470f-7b3a-4696-9a09-3ba0a29b5fee",
    "Content-Type": "application/json"
  }
})

export default api