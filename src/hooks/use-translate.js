import {useCallback, useState, useMemo, useLayoutEffect} from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {

  // Сервис мультиязычности
  const i18n = useServices().i18n

  // Текущая локаль (lang)
  const [lang, setLangState] = useState(() => i18n.lang);

  // Функция для смены локали
  const setLang = useCallback(lang => i18n.lang = lang, [])

  // Функция для локализации текстов
  const t = useCallback((text, number) => i18n.translate(text, {lang: lang, plural: number}), [lang]);

  const unsubscribe = useMemo(() => {
    // Подписка. Возрат функции для отписки
    return i18n.subscribe(() => {
      const language = i18n.lang // Получение языка с сервиса мультиязычности
      setLangState(language) // Установка локального стейта, из-за чего будет перерендер компоненты
    })
  }, [])

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe])

  return {lang, setLang, t};
}
