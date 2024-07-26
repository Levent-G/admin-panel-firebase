import React from 'react';
import PropTypes from 'prop-types';
import CustomPaper from '../components/CustomPaper';
import { DataGrid } from '@gib-ui/core';

const ListComponent = ({ columns, staticData,title }) => {
  return (
    <CustomPaper title={title} sx={{padding:7}}>
      <DataGrid
        columns={columns}
        rows={staticData}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </CustomPaper>
  );
};

// PropTypes ile tip denetimi ekleyelim
ListComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number,
    })
  ).isRequired,
  staticData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Diğer satır verilerini burada tanımlayabilirsiniz
    })
  ).isRequired,
};

export default ListComponent;
