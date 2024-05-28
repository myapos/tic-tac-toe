const isPlaywright = () => {
  return import.meta.env.VITE_PLAYWRIGHT === 'true'
}

export default isPlaywright
