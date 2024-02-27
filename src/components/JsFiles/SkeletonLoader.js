// SkeletonLoader.js

import React from 'react';
import '../styling/SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
    </div>
  );
};

export default SkeletonLoader;
