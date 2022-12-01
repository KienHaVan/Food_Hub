import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const HomeCategoriesSkeleton = () => {
  return (
    <ContentLoader
      width='100%'
      height={156}
      viewBox='0 0 450 150'
      backgroundColor='#f0f0f0'
      foregroundColor='#dedede'
    >
      <Rect x='14' y='15' rx='40' ry='40' width='90' height='140' />
      <Rect x='124' y='15' rx='40' ry='40' width='90' height='140' />
      <Rect x='234' y='15' rx='40' ry='40' width='90' height='140' />
      <Rect x='344' y='15' rx='40' ry='40' width='90' height='140' />
      <Rect x='454' y='15' rx='40' ry='40' width='90' height='140' />
    </ContentLoader>
  );
};

export default HomeCategoriesSkeleton;
