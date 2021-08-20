import React, { useState } from 'react';

import api from './config/configApi';

function App() {
  const [image, setImage] = useState('');
  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  const uploadImage = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    const headers = {
      headers: {
        'Content-Type': 'multipart/json',
      },
    };

    const url = '/images';
    await api
      .post(url, formData, headers)
      .then((response) => {
        setStatus({
          type: 'success',
          message: response.data.message,
        });
      })
      .catch((error) => {
        if (error.response) {
          setStatus({
            type: 'error',
            message: error.response.data.message,
          });
        } else {
          setStatus({
            type: 'error',
            message: 'Tente novamente mais tarde!',
          });
        }
      });
  };

  return (
    <div>
      <h1>Upload</h1>
      {status.type === 'success' ? (
        <p style={{ color: 'green' }}>{status.message}</p>
      ) : (
        <p style={{ color: 'red' }}>{status.message}</p>
      )}
      <form onSubmit={uploadImage}>
        <label>Imagem: </label>
        <input
          type='file'
          name='image'
          onChange={(event) => setImage(event.target.files[0])}
        />
        <br />
        <br />
        <button type='submit'>Salvar</button>
      </form>
    </div>
  );
}

export default App;
