import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const HomeFeaturedSkeleton = () => {
  return (
    <ContentLoader
      width='100%'
      height={220}
      viewBox='0 0 266 220'
      backgroundColor='#f0f0f0'
      foregroundColor='#dedede'
    >
      <Rect x='0' y='15' rx='40' ry='40' width='266' height='220' />
      <Rect x='280' y='15' rx='40' ry='40' width='266' height='220' />
    </ContentLoader>
  );
};

export default HomeFeaturedSkeleton;
