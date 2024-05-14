import style from './LoaderLight.module.css'

const LoaderLight = () => {
  return (
    <div className={style.loaderLight}>
      <div className={style.chaoticOrbit}></div>
    </div>
  )
}

export default LoaderLight