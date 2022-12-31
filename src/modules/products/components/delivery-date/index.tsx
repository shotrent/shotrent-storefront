import { faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faShield, faBagShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons'

const DeliveryDate: React.FC<any> = () => {
    const today = new Date();
    const numberOfDaysToAdd = 5;
    const deliveryDate = new Date(today.setDate(today.getDate() + numberOfDaysToAdd));
    const options = { day: 'numeric', month: 'short' } as any;
    return(
        <div className="mb-2">
        <span className="text-xs text-white bg-black px-2 py-1"><FontAwesomeIcon icon={faTruckFast} /> Delivery by {deliveryDate.toLocaleDateString("en-US", options)}</span>
      </div>
    )
}

export default DeliveryDate;