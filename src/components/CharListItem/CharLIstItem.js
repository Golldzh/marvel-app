import './CharListItem.scss';
const CharListItem = (props) => {
  const {name, thumbnail, onCharSelected} = props;
  let img;
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
     img = <img src={thumbnail} alt="abyyf" className="char__img_not_found"/>
  } else {
      img = <img src={thumbnail} alt="abyyf" className="char__img"/>
  }
  return (
    <li className="char__item"
        onFocus={onCharSelected}
        tabIndex={0}>
        {img}
        <div className="char__name">{name}</div>
    </li>
  )
}

export default CharListItem;