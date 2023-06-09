import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {memo} from "react";
import ItemComment from "../item-comment";
import './style.css'


function ListComments({list, level = 0}) {

  const cn = bem('ListComments')

  return (
    <ul className={cn({offset: level < 11, root: level === 0})}>
      {list.map(item =>
        <li key={item._id} className={cn('thread')}>
          <ItemComment comment={item} />
          {item.children?.length ? <div className={cn('children')}><ListComments list={item.children} level={level + 1}/></div> : ''}
      </li>)}
    </ul>
  )
}

ListComments.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    authorName: PropTypes.string,
    isDeleted: PropTypes.bool,
    level: PropTypes.number
  }))
}

ListComments.defaultProps = {
  list: []
}

export default memo(ListComments)