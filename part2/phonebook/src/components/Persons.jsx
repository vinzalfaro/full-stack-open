import Person from './Person';

const Persons = ({ personsToShow, onDelete }) => {
  return (
    <ul>
      {personsToShow.map(person =>
        <Person 
          key={person.id} 
          id={person.id}  
          name={person.name}
          number={person.number}
          onDelete={onDelete} 
        />
      )}
    </ul>
  );
};

export default Persons;
