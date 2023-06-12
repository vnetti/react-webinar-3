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
import useSelector from "../../hooks/use-selector";
import ProtectedPart from "../protected-part";
import SignInTo from "../../components/sign-in-to";

function Comments() {

  const dispatch = useDispatch();

  const params = useParams();

  const {lang, t} = useTranslate();

  const select = useSelectorRedux(state => ({
    comments: state.comments.list,
    waiting: state.comments.waiting,
    count: state.comments.count,
  }), shallowequal)

  const userName = useSelector(state => state.session.user.profile?.name)

  const [comment, setComment] = useState({_id: params.id, _type: 'article'})
  const [commentText, setCommentText] = useState('')

  const data = {
    comments: useMemo(() => listToTree(select.comments, item => item.parent._type === 'comment', item => ({
      _id: item._id,
      _type: item._type,
      text: item.isDeleted ? `${t('comments.textIsDeleted')} -_-` : item.text,
      authorName: item.author.profile.name,
      dateCreate: format(new Date(item.dateCreate), `dd MMMM yyyy ${lang === 'ru' ? 'в HH:mm' : '\'at\' hh:mm bbbb'}`, {locale: lang === 'ru' ? ru : enUS}),
      isDeleted: item.isDeleted,
      isSelf: item.author.profile.name === userName,
    })), [select.comments, lang])
  }

  const callbacks = {
    onReply: useCallback((_id, _type, ref) => {
      setComment({_id, _type})
      console.log(ref.current)
    }, []),
    onChange: useCallback((value) => setCommentText(value), []),
    onSubmit: useCallback((e) => {
      e.preventDefault()
      const text = commentText.trim()
      if (!text) {
        alert(`Введите ваш текст для ${comment._id === params.id ? 'комментария' : 'ответа'}`)
        setCommentText('') // если это были одни пробелы
      }
      else {
        comment._id !== params.id && setComment({_id: params.id, _type: 'article'})
        dispatch(commentsActions.submit(text, comment._id, comment._type))
        setCommentText('')
      }
    }, [commentText]),
    onClose: useCallback(() => setComment({_id: params.id, _type: 'article'}), [])
  }

  return (
    <Spinner active={select.waiting}>
      <SideLayout paddingX={'big'}>
        <h3>{t('comments.heading')} ({select.count})</h3>
      </SideLayout>
      <ListComments currentCommentToReply={comment}
                    list={data.comments}
                    t={t}
                    lang={lang}
                    commentText={commentText}
                    onClose={callbacks.onClose}
                    onChange={callbacks.onChange}
                    onSubmit={callbacks.onSubmit}
                    onReply={callbacks.onReply}/>

      {comment._id === params.id && <ProtectedPart element={<SignInTo t={t} paddingX={'very-big'} ability={t("comments.toComment")} paddingY={'medium'}/>}>
        <FormComment t={t} commentText={commentText} onSubmit={callbacks.onSubmit} onChange={callbacks.onChange} title={t("comments.newComment")}/>
      </ProtectedPart>}
    </Spinner>
  );
}

export default memo(Comments);
