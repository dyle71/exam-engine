import React, { useContext } from 'react'
import { getNumericAttribute } from '../dom-utils'
import { ExamAttachmentsContext } from './ExamAttachmentsContext'
import ResponsiveMediaContainer from './ResponsiveMediaContainer'
import { ExamComponentProps } from './types'

function Video({ element, className }: ExamComponentProps) {
  const src = element.getAttribute('src')!
  const width = getNumericAttribute(element, 'width')!
  const height = getNumericAttribute(element, 'height')!
  const { resolveAttachment } = useContext(ExamAttachmentsContext)

  return (
    <ResponsiveMediaContainer {...{ className, width, height }}>
      <video className="video" preload="metadata" controls>
        <source src={resolveAttachment(src)} />
      </video>
    </ResponsiveMediaContainer>
  )
}

export default React.memo(Video)