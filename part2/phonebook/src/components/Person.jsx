import React from 'react';

const Person = ({ id, name, number, onDelete }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <li>
      {name} {number}  
      <button onClick={handleDelete}>delete</button>
    </li>
  );
};

export default Person;
