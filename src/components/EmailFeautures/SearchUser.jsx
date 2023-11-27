import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from './diffusionListModal'; // You need to create the Modal component

import './SearchUser.css'; // Add your CSS file path here

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [diffusionLists, setDiffusionLists] = useState([]);

  useEffect(() => {
    // Implement your search logic here
    const fetchSearchResults = async () => {
      try {
        const response = await axios.post(/*besh nabaathu ll api */
          'http://localhost:8082/api/search',
          { elementOfSearch: searchQuery },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setSearchResults(response.data);/*o resulta nhotu fi tableau */
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();/*ken maabya besh envoyer ll methode fetchSearchResults*/
    } else {
      // Clear the search results if the search query is empty
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setShowModal(true);

    // Fetch diffusion lists for the selected user
    try {
      const response = await axios.get('http://localhost:8082/api/diffusionList', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setDiffusionLists(response.data);
    } catch (error) {
      console.error('Error fetching diffusion lists:', error);
    }
  };

  return (
    <div className="search-user">
      <h1><strong>Rechercher un utilisateur :</strong></h1>
      <form>
        <input
          type="text"
          placeholder="rechercher avec le nom ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}/*ken searchQuery maabia declanchi methode fetchSearchResults ken fergha aateha tabl feragh*/
        />
      </form>
      <ul>
        {searchResults.map((user) => ( /*resultat eli rajatna mel back */
          <li key={user.id}>
            {user.prenom + " " + user.nom + " " + "("+ user.email+")"}
            <button className="plus-icon-button" onClick={() => handleUserClick(user)}>
              <AddCircleOutlineIcon className="plus-icon" />
            </button>
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal
          user={selectedUser}/*baathna parametre user fi selecteduser*/
          diffusionLists={diffusionLists}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default SearchUser;
