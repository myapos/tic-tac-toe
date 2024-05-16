import { playModes } from '@/constants'

const getPlayMode = (mode: string) => {
  switch (mode) {
    case playModes.SINGLE_PLAYER:
      return { singlePlayer: true, autoPlayer: false, twoPlayer: false }
    case playModes.AUTO_PLAYER:
      return { singlePlayer: false, autoPlayer: true, twoPlayer: false }
    case playModes.TWO_PLAYER:
      return { singlePlayer: false, autoPlayer: false, twoPlayer: true }
    default:
      return { singlePlayer: false, autoPlayer: false, twoPlayer: false }
  }
}

export default getPlayMode
