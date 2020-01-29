import classNames from 'classnames'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { findChildrenAnswers, getNumericAttribute } from '../../dom-utils'
import { ResultsState } from '../../store/index'
import { QuestionContext, withQuestionContext } from '../QuestionContext'
import { ExamAnswer, ExamComponentProps } from '../types'

function ResultsExamQuestion({ element, renderChildNodes }: ExamComponentProps) {
  const answers = useSelector((state: ResultsState) => state.answers.answersById)
  const hasAnswers: boolean = questionHasAnswers(element, answers)
  const { displayNumber, level } = useContext(QuestionContext)

  return !hasAnswers ? null : (
    <div
      className={classNames('exam-question', {
        'e-mrg-b-8 e-clearfix': level === 0,
        'e-mrg-l-8 e-mrg-y-4': level > 0
      })}
      id={displayNumber}
    >
      {renderChildNodes(element)}
    </div>
  )
}

function questionHasAnswers(element: Element, answers: Record<number, ExamAnswer>): boolean {
  const answerElems = findChildrenAnswers(element)
  return answerElems.some(e => answers[getNumericAttribute(e, 'question-id')!])
}

export default React.memo(withQuestionContext(ResultsExamQuestion))