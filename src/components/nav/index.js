import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import BasketTool from "../basket-tool";
import {NavLink} from "react-router-dom";

function Nav({...props}) {

  const cn = bem('Nav');

  const PAGES = [{
    id: 1,
    path: '/',
    title: 'Главная'
  }]
  return (
    <nav className={cn()}>
      <div>
        {PAGES.map(page => <NavLink to={page.path} key={page.id}>{page.title}</NavLink>)}
      </div>
      <BasketTool onOpen={props.openModalBasket} amount={props.basketAmount}
                  sum={props.basketSum}/>
    </nav>
  );
}

Nav.propTypes = {
  openModalBasket: PropTypes.func.isRequired,
  basketSum: PropTypes.number,
  basketAmount: PropTypes.number
};

Nav.defaultProps = {
  openModalBasket: () => {},
  basketSum: 0,
  basketAmount: 0
}

export default memo(Nav);
