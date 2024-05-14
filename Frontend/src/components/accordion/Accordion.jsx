import style from './Accordion.module.css'
import { useState } from 'react';

const Accordion = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.productAccordion}>
      <div className={style.accordionHeader} onClick={toggleAccordion}>
        <span className={style.toggleIcon}>{isOpen ? <h3 className={style.accordionTitle}>Descripción -</h3> : <h3 className={style.accordionTitle}>Descripción +</h3>}</span>
      </div>
      {isOpen && (
        <section className={style.accordionHeader}>
          <p>{description}</p>
        </section>
      )}
    </div>
  );
};

export default Accordion;