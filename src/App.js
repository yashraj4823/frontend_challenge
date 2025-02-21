import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the updated CSS file

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonInput = JSON.parse(input);
            const res = await axios.post('https://bfhl-backend-cyan-nine.vercel.app/', { data: jsonInput.data });
            setResponse(res.data);
        } catch (error) {
            alert('Invalid JSON input');
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setSelectedFilters(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const renderFilteredResponse = () => {
        if (!response) return null;

        let filteredResponse = {};
        if (selectedFilters.includes('numbers')) {
            filteredResponse.numbers = response.numbers;
        }
        if (selectedFilters.includes('alphabets')) {
            filteredResponse.alphabets = response.alphabets;
        }
        if (selectedFilters.includes('highest_alphabet')) {
            filteredResponse.highest_alphabet = response.highest_alphabet;
        }

        return (
            <div className="response">
                <h2>Filtered Response</h2>
                {filteredResponse.numbers && <p>Numbers: {filteredResponse.numbers.join(', ')}</p>}
                {filteredResponse.alphabets && <p>Alphabets: {filteredResponse.alphabets.join(', ')}</p>}
                {filteredResponse.highest_alphabet && <p>Highest Alphabet: {filteredResponse.highest_alphabet.join(', ')}</p>}
            </div>
        );
    };

    return (
        <div className="container">
            <h1>API INPUT</h1> {/* Replace with your roll number */}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter JSON input (e.g., { 'data': ['A', '1', 'B'] })"
                />
                <button type="submit">Submit</button>
            </form>

            {response && (
                <div>
                    <div className="filters">
                        <h2>Multi Filter</h2>
                        <label>
                            <input type="checkbox" value="numbers" onChange={handleFilterChange} /> Numbers
                        </label>
                        <label>
                            <input type="checkbox" value="alphabets" onChange={handleFilterChange} /> Alphabets
                        </label>
                        <label>
                            <input type="checkbox" value="highest_alphabet" onChange={handleFilterChange} /> Highest Alphabet
                        </label>
                    </div>

                    {renderFilteredResponse()}
                </div>
            )}
        </div>
    );
}

export default App;