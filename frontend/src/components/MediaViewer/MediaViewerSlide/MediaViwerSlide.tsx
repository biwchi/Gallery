import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import { breakpointsWidth } from '@/common'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { mediaViewerActions, selectMediaViewer } from '@/store/mediaViewerSlice'

import { Slide } from '../MediaViewer'
import styles from './MediaViwerSlide.module.scss'

type MediaViewerSlideProps = {
  slide: Slide
}

type Position = { x: number; y: number; lastX: number; lastY: number }

const initialMoveable = {
  moveable: false,
  x: false,
  y: false,
}

const initialPosition = {
  x: 0,
  y: 0,
  lastX: 0,
  lastY: 0,
}

export function MediaViewerSlide({ slide }: MediaViewerSlideProps) {
  const mediaViewer = useAppSelector(selectMediaViewer)
  const dispatch = useAppDispatch()

  const mediaPlayerContentRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const isPressed = useRef(false)
  const deltaPosition = useRef<Position>(initialPosition)

  const zoomTransitionDuration = 150

  const { zoom, isMoveable } = mediaViewer
  const { toggleMoveable } = mediaViewerActions
  const { breakpoint, windowSize } = useBreakpoints()

  const checkMoveable = () => {
    if (!mediaPlayerContentRef.current) {
      return initialMoveable
    }

    const { width, height } = mediaPlayerContentRef.current.getBoundingClientRect()

    const isMoveable = {
      moveable: width >= windowSize.width || height >= windowSize.height,
      x: width >= windowSize.width,
      y: height >= windowSize.height,
    }

    return isMoveable
  }

  const imageWidth = () => {
    if (breakpoint.xs) return breakpointsWidth.xs
    if (breakpoint.sm) return breakpointsWidth.sm
    if (breakpoint.md) return breakpointsWidth.md
    if (breakpoint.lg) return breakpointsWidth.lg
    if (breakpoint.xl) return breakpointsWidth.xl

    return breakpointsWidth.lg
  }

  function slideStyle() {
    let { lastX, lastY } = deltaPosition.current

    if (zoom === 1 || !isMoveable.moveable) {
      lastX = 0
      lastY = 0
    }

    if (zoom > 1) {
      lastX /= zoom
      lastY /= zoom
    }

    return {
      transitionDuration: `${zoomTransitionDuration}ms`,
      transform: `translate3d(${lastX}px, ${lastY}px, 0) scale(${zoom})`,
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const checkForMoveable = checkMoveable()
      const toString = JSON.stringify

      if (toString(checkForMoveable) === toString(isMoveable)) return

      dispatch(toggleMoveable(checkForMoveable))
    }, zoomTransitionDuration)
  }, [zoom, breakpoint])

  useEffect(() => {
    const slide = slideRef.current
    const slideContent = mediaPlayerContentRef.current
    if (!slideContent || !slide) return

    function mouseDown(e: MouseEvent) {
      if (isPressed.current) return

      isPressed.current = true

      deltaPosition.current = {
        ...deltaPosition.current,
        x: e.clientX,
        y: e.clientY,
      }
    }

    function mouseMove(e: MouseEvent) {
      if (!isPressed.current || !slideContent || !slide) return

      const newPosition = {
        x: e.clientX - deltaPosition.current.x + deltaPosition.current.lastX,
        y: e.clientY - deltaPosition.current.y + deltaPosition.current.lastY,
      }

      if (!isMoveable.x) newPosition.x = 0
      if (!isMoveable.y) newPosition.y = 0

      slide.style.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0) scale(${zoom})`
      slide.style.transitionDuration = 'none'
    }

    function mouseUp(e: MouseEvent) {
      if (!slide || !isPressed.current) return

      const { lastX, lastY } = deltaPosition.current

      isPressed.current = false
      deltaPosition.current.lastX = e.clientX - deltaPosition.current.x + lastX
      deltaPosition.current.lastY = e.clientY - deltaPosition.current.y + lastY
      slide.style.transitionDuration = `${zoomTransitionDuration}ms`
    }

    if (isMoveable.moveable) {
      slideContent.addEventListener('pointerdown', mouseDown)
      slideContent.addEventListener('pointermove', mouseMove)
      slideContent.addEventListener('pointerup', mouseUp)
      slideContent.addEventListener('pointerleave', mouseUp)
    }

    return () => {
      slideContent.removeEventListener('pointerdown', mouseDown)
      slideContent.removeEventListener('pointermove', mouseMove)
      slideContent.removeEventListener('pointerup', mouseUp)
      slideContent.removeEventListener('pointerleave', mouseUp)
    }
  }, [isMoveable, zoom])

  return (
    <div ref={slideRef} style={slideStyle()} className={styles.slide}>
      {slide && (
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <div
              ref={mediaPlayerContentRef}
              className={clsx(styles.content, isMoveable.moveable && styles.moveable)}
            >
              {slide.type === 'image' && (
                <img
                  draggable="false"
                  className={styles.image}
                  style={{
                    maxWidth: imageWidth(),
                    maxHeight: `${windowSize.height - 160}px`,
                  }}
                  src={slide.fileUrl}
                />
              )}
              {slide.type === 'video' && (
                <video
                  style={{ maxWidth: imageWidth() }}
                  className={styles.video}
                  loop
                  controls
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                ></video>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
