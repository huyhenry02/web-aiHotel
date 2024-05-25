import { IoSearchSharp } from 'react-icons/io5';
import './InputSearch.scss';
import React from 'react';

const InputSearch = () => {
  return (
    <div className="header_search">
      <input
        className="input_search"
        placeholder="Tìm kiếm phòng, danh mục mong muốn..."
      />
      <button className="icon_search">
        <span>
          <IoSearchSharp />
        </span>
      </button>
    </div>
  );
};
export default InputSearch;
