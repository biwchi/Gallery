import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppFile } from '@/services/types'
import { selectAudioPlayer } from '@/store/audioPlayerSlice'

const initialSound: AppFile = {
  id: 0,
  title: '',
  fileName: '',
  type: 'image',
  size: 0,
  fileUrl: '',
  dateUploaded: '',
  artist: null,
  songName: undefined,
}

export function useCurrentSound() {
  const audioPlayer = useSelector(selectAudioPlayer)

  const [currentSound, setCurrentSound] = useState<AppFile>(initialSound)

  useEffect(() => {
    if (audioPlayer.currentIndex === -1) {
      setCurrentSound(initialSound)
      return
    }

    setCurrentSound(audioPlayer.files[audioPlayer.currentIndex])
  }, [audioPlayer.currentIndex])

  return currentSound
}
