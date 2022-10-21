import React from 'react';
import { AdminFormsList } from '../helpers/AdminFormsList';
import FormsItem from '../components/AdminFormsItem';
import '../styles/Forms.css';

function Forms() {
  return (
    <div className="forms">
      <h1 className="formsTitle">Application Forms</h1>
      <div className="formsList">
        {AdminFormsList.map((formsItem, key) => {
          return (
            <FormsItem
              key={key}
              image={formsItem.image}
              name={formsItem.name}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Forms;