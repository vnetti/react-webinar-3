import PropTypes from "prop-types";
import {memo} from "react";
import {cn as bem} from '@bem-react/classname'
import './style.css'

function ItemComment({comment, onReply, t, threadRef}) {

  const cn = bem('ItemComment')

  return (
    <div className={cn({isDeleted: comment.isDeleted})}>
      <div className={cn('header')}>
        <span className={cn('authorName', {self: comment.isSelf})}>{comment.authorName}</span>
        <span className={cn('dateCreate')}>{comment.dateCreate}</span>
      </div>
      <div className={cn('body')}>
        <p className={cn('text')}>{comment.text}</p>
      </div>
      <div className={cn('footer')}>
        {!comment.isDeleted && <button className={cn('reply')} onClick={() => onReply(comment._id, comment._type, threadRef)}>{t('comments.reply')}</button>}
      </div>
    </div>
  )
}


ItemComment.PropTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    _type: PropTypes.string,
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    authorName: PropTypes.string,
    isDeleted: PropTypes.bool,
    level: PropTypes.number,
    isSelf: PropTypes.bool
  }).isRequired,
  onReply: PropTypes.func,
  t: PropTypes.func
}

ItemComment.defaultProps = {
  onclick: () => {},
  t: text => text
}

export default memo(ItemComment)