
import { useState } from 'react';
import * as SC from '../Searchbar/Searchbar.styled';


export const SearchBar = () => {
  const [value, setValue] = useState('');

  const handleQueryChange = ({ currentTarget: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch(value.trim());

    setValue('');

    return (
      <SC.SearchBarHeader>
        <SC.Form onSubmit={handleSubmit}>
          <SC.Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={handleQueryChange}
          />
          <SC.Button type="submit">
            <SC.Span>Search</SC.Span>
          </SC.Button>
        </SC.Form>
      </SC.SearchBarHeader>
    );
  };
};
