import React from 'react';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/system';

const RectangularChip = styled(Chip)({
    borderRadius: '8px', // Adjust the border radius as needed
    paddingLeft: '16px',
    paddingRight: '16px',
    backgroundColor: '#f0f0f0', // Customize the background color
    color: '#333', // Customize the text color
});

export default RectangularChip;