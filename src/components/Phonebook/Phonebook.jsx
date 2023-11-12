export const Phonebook = () => {
  return (
    <div>
      <h3>Name</h3>
      <input type="text" name="name" required />
      <h3>Number</h3>
      <input type="tel" name="number" required />
      <button>Add contact</button>
    </div>
  );
};
