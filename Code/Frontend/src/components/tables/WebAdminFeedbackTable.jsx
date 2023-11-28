// Import React library
import React from 'react';
import { useTable } from 'react-table';
import { Table, Button, Modal, Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define table component
export default function WebAdminFeedbackTable({ columns, data, authToken}) {
    // Use the useTable hook to create an instance of the table
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });
  
    // Render the table
    return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
    );
}