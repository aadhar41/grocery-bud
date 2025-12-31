import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items, removeItem, editItem }) => {
  return (
    <section className="container card col-lg-12 col-md-12 col-sm-12 col-12 p-3">
      <h3>grocery list</h3>
      <div className="grocery-container">
        {items.map((item) => {
          const { id, name } = item;
          return (
            <div className="grocery-item" key={id}>
              <p className="title" id={id}>{name}</p>
              <div className="btn-container">
                <button type="button" className="edit-btn">
                  <FaEdit onClick={() => editItem(id)} />
                </button>
                <button type="button" className="delete-btn">
                  <FaTrash onClick={() => removeItem(id)} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}

export default List
