import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {memo} from "react";
import ItemComment from "../item-comment";
import './style.css'
import FormComment from "../form-comment";


function ListComments({list, level = 0, ...props}) {

  const cn = bem('ListComments')

  return (
    <ul className={cn({offset: level < 11, root: level === 0})}>
      {list.map(item =>
        <li key={item._id} className={cn('thread')}>
          <ItemComment comment={item} onReply={props.onReply} />
          {item.children?.length ? <div className={cn('children')}>
            <ListComments list={item.children}
                          level={level + 1}
                          {...props}/>
          </div> : ''}
          {props.currentCommentToReply?._id === item._id ? <FormComment onSubmit={props.onSubmit}
                                                                   onChange={props.onChange}
                                                                   onClose={props.onClose}
                                                                   isReply={level > 0}
                                                                   title={'Новый ответ'} /> : ''}
      </li>)}
    </ul>
  )
}

ListComments.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    _type: PropTypes.string,
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    authorName: PropTypes.string,
    isDeleted: PropTypes.bool,
    level: PropTypes.number
  })),
  onReply: PropTypes.func
}

ListComments.defaultProps = {
  list: [],
}

export default memo(ListComments)