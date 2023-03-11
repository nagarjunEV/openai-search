import axios from 'axios';
import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage = () => {
  const API_KEY = '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';
  const URL = 'https://api.openai.com/v1/completions';
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');

  const client = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const params = {
    prompt: search,
    model: 'text-davinci-003',
    max_tokens: 200,
    temperature: 0.5,
  };

  const getResult = (e) => {
    e.preventDefault();
    setResult('');
    setSearch('');

    client
      .post(URL, params)
      .then((res) => {
        // console.log(res?.data?.choices[0].text);
        let response = res?.data?.choices[0].text;
        setResult(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={(e) => getResult(e)}>
        <div>Search Box for Open AI</div>
        <input
          placeholder="How can I help you today!"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <p>{result}</p>
    </div>
  );
};

export default SearchPage;
