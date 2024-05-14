import style from './Home.module.css'
import { useSelector } from 'react-redux'
import mp from '../../../public/images/mp.png'
import tarjetas from '../../../public/images/tarjetas.png'
import seguridad from '../../../public/images/seguridad.png'
import garantia from '../../../public/images/garantia.png'
import devolucion from '../../../public/images/devolucion.png'
import servicio from '../../../public/images/servicio.png'
import Categories from '../../components/categories/Categories';
import FeaturedProducts from '../../components/featuredProducts/FeaturedProducts'
import Header from '../../components/header/Header'
import LoaderLight from '../../components/loaderLight/LoaderLight'


const Home = () => {
  const products = useSelector((state) => state.product.products)

  return (
    <div>
      <Header />
      <Categories />
      <section className={style.aboutUs}>
        <div>
          <p>
            <span>Somos el distribuidor de Apple</span>
          </p>
          <p>más importante del país.</p>
        </div>
      </section>

      <section className={style.policies}>
        <div>
          <img src={seguridad} alt="seguridad" />
          <h4>Seguridad</h4>
          <p>Protección de base de datos</p>
        </div>

        <div>
          <img src={garantia} alt="garantia" />
          <h4>Garantía</h4>
          <p>Apple oficial 1 año</p>
        </div>

        <div>
          <img src={devolucion} alt="devolucion" />
          <h4>Devolución</h4>
          <p>10 días posteriores a la compra</p>
        </div>

        <div>
          <img src={servicio} alt="servicio" />
          <h4>Servicio</h4>
          <p>Asesoramiento personalizado</p>
        </div>
      </section>

      <section className={style.sectionPayment}>
        <div>
          <h4>Compra segura</h4>
        </div>
        <div>
          <img className={style.paymentMp} src={mp} alt="payment" />
          <img className={style.paymentCards} src={tarjetas} alt="payment" />
        </div>
      </section>

      <section className={style.productsFeatured}>
        <h3>Productos Destacados</h3>
        <FeaturedProducts />
      </section>
    </div>
  );
}

export default Home