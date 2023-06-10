import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {memo, useMemo, useRef} from "react";
import ItemComment from "../item-comment";
import './style.css'
import FormComment from "../form-comment";
import ProtectedPart from "../../containers/protected-part";
import SignInTo from "../sign-in-to";


function ListComments({list, level = 0, ...props}) {

  const cn = bem('ListComments')

  const ability = useMemo(() => <>{props.t('comments.toReply')}. <button onClick={props.onClose} className={cn('cancel')}>{props.t('comments.cancel')}</button></>, [props.lang])

  const threadRef = useRef(null);

  return (
    <ul ref={threadRef} className={cn({offset: level < 11, root: level === 0})}>
      {list.map(item =>
        <li key={item._id} className={cn('thread')} >
          <ItemComment threadRef={threadRef} comment={item} onReply={props.onReply} t={props.t} />

          {item.children?.length ?
            <div className={cn('children')}>
              <ListComments list={item.children} level={level + 1} {...props}/>
            </div> : ''}

          {props.currentCommentToReply?._id === item._id &&
            <ProtectedPart element={<SignInTo paddingX={'big'} t={props.t} ability={ability} paddingY={'medium'}/>}>
              <FormComment onSubmit={props.onSubmit}
                           onChange={props.onChange}
                           onClose={props.onClose}
                           commentText={props.commentText}
                           isReply
                           t={props.t}
                           autoFocus
                           title={props.t("comments.newReply")} />
            </ProtectedPart>}
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
    level: PropTypes.number,
    isSelf: PropTypes.bool
  })),
  onReply: PropTypes.func,
  t: PropTypes.func
}

ListComments.defaultProps = {
  list: [],
  t: text => text
}

export default memo(ListComments)