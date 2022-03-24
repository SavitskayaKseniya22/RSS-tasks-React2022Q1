import React from 'react';
import './searchInput.css';

export class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);

    this.state = {
      input: window.localStorage.getItem('searchValue') || '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: { target: { value: string } }) {
    this.setState({
      input: e.target.value,
    });
  }

  componentWillUnmount() {
    window.localStorage.setItem('searchValue', this.state.input);
  }

  render() {
    return (
      <div>
        <input className="SearchInput" value={this.state.input} onChange={this.handleChange} />
      </div>
    );
  }
}

interface SearchInputState {
  input: string;
}

interface SearchInputProps {
  data?: string;
}
