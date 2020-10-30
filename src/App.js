import React, { useState,useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  
  useEffect(()=>{
    api.get('repositories').then( response => {
      setRepositories(response.data);
    });
  },[]);


  async function handleAddRepository() {

    const repository = {
      title: `repository ${Date.now()}`,
    }


    const response = await api.post('repositories',repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    console.log(response)
      const result = repositories.findIndex(repository => repository.id ===id);
      
      const addNewRepositories = [...repositories];
      addNewRepositories.splice(result);

      setRepositories(addNewRepositories) ;
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}        
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
export default App;