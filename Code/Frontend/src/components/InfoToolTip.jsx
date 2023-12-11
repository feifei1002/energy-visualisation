import React from 'react';
import { Tooltip } from 'react-tooltip'
import '../css/Tooltip.css'

// Info tooltip used to show the user the dataset the current graph page is using.
export default function InfoToolTip({dataset}) {

  const tooltipContent = `Current page: ${dataset}`; 

  return (
    <>
       <a data-tooltip-id="my-tooltip" data-tooltip-content={tooltipContent} className="toolTip">
            ℹ
       </a>
       <Tooltip id="my-tooltip" />
    </>
  );
}