/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';

PaginationProduct.propTypes = {
    totalProducts: PropTypes.number.isRequired,
    productsPerPage: PropTypes.number.isRequired, 
    setCurrentPage: PropTypes.func.isRequired,
    nextPage: PropTypes.number.isRequired,
    previousPage: PropTypes.number.isRequired,
  };

export default function PaginationProduct ({totalProducts, productsPerPage, setCurrentPage, previousPage, nextPage}) {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalProducts/productsPerPage); i+= 1) {
        pages.push(i)
    }
    return (<>
            <ul>
                <li onClick = {previousPage}> Prev</li>
                {pages.map((index) => (
                    <li key = {index} onClick = {() => setCurrentPage(index)}>  {index} </li>
                ))}
                <li onClick = {nextPage}> Next </li>
            </ul>
            </>
    )
}
