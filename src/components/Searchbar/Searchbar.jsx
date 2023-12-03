
import { useState } from 'react';
import * as SC from '../Searchbar/Searchbar.styled';
import { toast } from 'react-toastify';


export const SearchBar = ({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = ({ currentTarget: { value } }) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimSearchQuery = searchQuery.trim();

    if (trimSearchQuery === '') {
      toast.info('Please, enter search word!');
      return;
    }

    onSubmit(trimSearchQuery);
    setSearchQuery('');
  };
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
