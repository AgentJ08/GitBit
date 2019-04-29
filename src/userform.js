import React from 'react';

const UserForm = (props) => {
  return(
    <form onSubmit={props.getUser}>
        <input type="text" name="username"></input>
        <br />
        <button>Submit</button>
      </form>
  );
}

export default UserForm;