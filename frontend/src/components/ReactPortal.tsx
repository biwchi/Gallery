import { createPortal } from 'react-dom'

import { createWrapperAndAppendToBody } from '@/utils'

type ReactPortalProps = {
  children: JSX.Element
  wrapperId: string
}

export default function ReactPortal({ children, wrapperId }: ReactPortalProps) {
  let nodeElement = document.getElementById(wrapperId)

  if (!nodeElement) {
    nodeElement = createWrapperAndAppendToBody(wrapperId)
  }

  return createPortal(children, nodeElement)
}
