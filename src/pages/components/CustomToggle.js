import React, { useState, useContext, useEffect } from 'react';
import { Accordion, useAccordionButton, AccordionContext } from 'react-bootstrap';

import { GrDatabase } from "react-icons/gr";
import { FaChevronDown } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';

function CustomToggle({ children, eventKey, isActive }) {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey);
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(activeEventKey === eventKey);
  }, [activeEventKey, eventKey]);

  return (
    <div
      onClick={decoratedOnClick}
      className={`flex justify-between items-center cursor-pointer py-2 px-3 border-l-2 ${
        isActive ? 'text-white border-blue-500' : 'border-transparent'
      } hover:text-white ${active ? 'text-white borde' : 'border-transparent'}`}
    >
      <div className='flex gap-2 items-center'>
        <GrDatabase className='w-4 h-4' />
        <p style={{ margin: 0 }}>{children}</p>
      </div>
      <span className={`transition-transform duration-300 ${active ? 'rotate-180' : ''}`}>
        <FaChevronDown />
      </span>
    </div>
  );
}

export default CustomToggle;
