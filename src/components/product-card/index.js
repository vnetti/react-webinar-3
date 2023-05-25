import "./style.css";
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "../../utils";
import PropTypes from "prop-types";

function ProductCard({card, onClick}) {

  const cn = bem('ProductCard');

    return (
      <>
        <ul className={cn()}>
          <li><p className={cn('paragraph')}>
            {card.description}
          </p></li>
          <li><p className={cn('paragraph')}>
            Страна производитель: <span>{card.madeIn.title} ({card.madeIn.code})</span></p></li>
          <li><p className={cn('paragraph')}>
            Категория: <span>{card.category.title}</span>
          </p></li>
          <li><p className={cn('paragraph')}>
            Год выпуска: <span>{card.edition}</span>
          </p></li>
          <li><p className={cn('paragraph') + ' ' +  cn('paragraph_bold')}>
            Цена: {numberFormat(card.price)} ₽
          </p></li>
        </ul>
        <div className={cn('button')}>
          <button onClick={() => onClick(card._id)}>Добавить</button>
        </div>
</>
    )
}

ProductCard.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

ProductCard.defaultProps = {

}

export default ProductCard