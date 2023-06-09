import {memo, useCallback, useMemo, useState} from "react";
import {useSelector as useSelectorRedux, useDispatch} from "react-redux";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import shallowequal from "shallowequal";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import commentsActions from "../../store-redux/comments/actions";
import listToTree from "../../utils/list-to-tree";
import ListComments from "../../components/list-comments";
import {format} from "date-fns";
import {enUS, ru} from "date-fns/locale";
import SideLayout from "../../components/side-layout";
import FormComment from "../../components/form-comment";

function Comments() {

  const dispatch = useDispatch();

  const params = useParams();
  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    comments: state.comments.list,
    waiting: state.comments.waiting,
    count: state.comments.count
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const {lang, t} = useTranslate();

  const data = {
    comments: useMemo(() => listToTree(select.comments, item => item.parent._type === 'comment', item => ({
      _id: item._id,
      _type: item._type,
      text: item.isDeleted ? 'Комментарий удален -_-' : item.text,
      authorName: item.author.profile.name,
      dateCreate: format(new Date(item.dateCreate), `dd MMMM yyyy в ${lang === 'ru' ? 'HH:mm' : 'hh:mm bbbb'}`, {locale: lang === 'ru' ? ru : enUS}),
      isDeleted: item.isDeleted
    })), [select.comments, lang]),
  }

  const [comment, setComment] = useState({_id: params.id, _type: 'article'})
  const [commentText, setCommentText] = useState('')

  const callbacks = {
    onReply: useCallback((_id, _type) => setComment({_id, _type}), []),
    onChange: useCallback((value) => setCommentText(value), []),
    onSubmit: useCallback((e) => {
      e.preventDefault()
      dispatch(commentsActions.submit(commentText, comment._id, comment._type))
    }, [commentText]),
    onClose: useCallback(() => setComment({_id: params.id, _type: 'article'}), [])
  }

  return (
    <Spinner active={select.waiting}>
      <SideLayout paddingX={'big'}>
        <h3>Комментарии ({select.count})</h3>
      </SideLayout>
      <ListComments currentCommentToReply={comment}
                    list={data.comments}
                    onClose={callbacks.onClose}
                    onChange={callbacks.onChange}
                    onSubmit={callbacks.onSubmit}
                    onReply={callbacks.onReply}/>
      {comment._id === params.id  && <FormComment onSubmit={callbacks.onSubmit}
                                onClose={callbacks.onClose}
                                onChange={callbacks.onChange}
                                title={'Новый комментарий'}/>}
    </Spinner>
  );
}

export default memo(Comments);
