import React from "react";

const PhoneBookFilter = ({handleFilter, filterValue}) => {

    return (
        <div>Filter shown with: <input value={filterValue} onChange={handleFilter} /></div>
    );
};

export default PhoneBookFilter;