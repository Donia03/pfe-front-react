import React, { useState } from 'react';

const SearchUser = () => {
    const [users, setUsers] = useState([
        { name: 'John Doe', sex: 'Male', age: 25, profession: 'Engineer', address: '123 Main St', province: 'ABC' },
        { name: 'Jane Smith', sex: 'Female', age: 30, profession: 'Teacher', address: '456 Elm St', province: 'DEF' },
        { name: 'Alice Johnson', sex: 'Female', age: 35, profession: 'Doctor', address: '789 Oak St', province: 'GHI' },
        { name: 'Bob Thompson', sex: 'Male', age: 40, profession: 'Artist', address: '321 Pine St', province: 'JKL' },
        { name: 'Emily Wilson', sex: 'Female', age: 27, profession: 'Writer', address: '654 Maple St', province: 'MNO' },
        // Add more user objects as needed
    ]);

    const [searchResults, setSearchResults] = useState([]);
    const [selectedSex, setSelectedSex] = useState('');

    const handleInputChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();

        const filteredResults = users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm) && user.sex === selectedSex
        );

        setSearchResults(filteredResults);
    };

    const handleSexChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSex(selectedValue);
    };

    return (
        <div>
             Rechercher utilisateur

            <form>
                <input
                    type="text"
                    placeholder="Search by name"
                    onChange={handleInputChange}
                />

                <div>
                    <input
                        type="radio"
                        id="male"
                        name="sex"
                        value="Male"
                        checked={selectedSex === 'Male'}
                        onChange={handleSexChange}
                    />
                    <label htmlFor="male">Male</label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="female"
                        name="sex"
                        value="Female"
                        checked={selectedSex === 'Female'}
                        onChange={handleSexChange}
                    />
                    <label htmlFor="female">Female</label>
                </div>
            </form>

            <h2>Search Results</h2>
            {searchResults.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul>
                    {searchResults.map((user, index) => (
                        <li key={index}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchUser;
