import React from 'react';
import { Banner } from 'exoclick-react';

const ExoClickVideoAd = ({placementId}) => {
  return (
    <div>
      <Banner zoneId={placementId}/>
    </div>
  );
};

export default ExoClickVideoAd;
