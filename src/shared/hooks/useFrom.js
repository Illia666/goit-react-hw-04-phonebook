import { useState } from 'react';

export const useForm = ({ initialState, onSubmit }) => {
  const [state, setState] = useState(initialState);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (onSubmit(state)) {
      setState(initialState);
    }
  };

  const handleOnChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return { state, handleSubmit, handleOnChange };
};