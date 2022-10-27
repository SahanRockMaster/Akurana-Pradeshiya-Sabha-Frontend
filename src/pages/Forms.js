import React from 'react';
import { FormsList } from '../helpers/FormsList';
import FormsItem from '../components/FormsItem';
import '../styles/Forms.css';

function Forms() {
  return (
    <div className="forms">
      <h1 className="formsTitle">Application Forms</h1>
      <div className="formsList">
        {FormsList.map((formsItem, key) => {
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

