// NavigationControls.js
import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import './NavigationControls.css';


const NavigationControls = ({ onPrevClick, onNextClick }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 100,
        left: 100,
        right: 100,
        display: 'flex',
        justifyContent: 'space-between',
        p: 1,
      }}
    >
      <Button
        variant="contained"
        className="arrowButton"
        startIcon={<ArrowBackIosNewIcon className='arrowIcon'/>}
        onClick={onPrevClick}
      />
      <Button
        variant="contained"
        className="arrowButton"
        startIcon={<ArrowForwardIosIcon className='arrowIcon'/>}
        onClick={onNextClick}
      />
    </Box>
  );
};

export default NavigationControls;
