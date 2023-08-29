import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function LikeItems({ likes, idDeveloper, idCard }) {
  const [isLike, setIsLike] = useState(false)
  const [count, setCount] = useState(likes.length)

  useEffect(() => {
    setIsLike(likes.some((item) => idDeveloper === item._id))
  }, [likes, idDeveloper])

  function buttonLike() {
    if (isLike) {
      api.deleteLike(idCard)
        .then((res) => {
          setIsLike(false)
          setCount(res.likes.length)
        })
        .catch((error) => console.error(`Ошибка снятия лайка ${error}`));
    } else {
      api.addLike(idCard)
      .then((res) => {
        setIsLike(true)
        setCount(res.likes.length)
      })
      .catch((error) => console.error(`Ошибка установки лайка ${error}`));
    }
  }

  return (
    <>
      <button
        type="button"
        className={`element__button-like ${isLike ? "element__button-like_active" : ""}`}
        onClick={buttonLike}
      />
      <span className="elements__counter">{count}</span>
    </>
  );
}
