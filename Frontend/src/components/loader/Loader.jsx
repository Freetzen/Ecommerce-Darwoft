import style from './Loader.module.css'

const Loader = () => {
  return (
    <div className={style.loader}>
      <div className={style.loaderInner}>
        <div className={style.loaderBlock}></div>
        <div className={style.loaderBlock}></div>
        <div className={style.loaderBlock}></div>
        <div className={style.loaderBlock}></div>
      </div>
    </div>
  );
}

export default Loader