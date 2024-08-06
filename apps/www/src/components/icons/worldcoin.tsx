import React, { type ComponentProps } from 'react';

export const WorldCoinLogo = ({
  width,
  height,
  className,
  stroke = '#000',
  ...props
}: ComponentProps<'svg'>) => {
  return (
    <svg
      className={className}
      height={height ?? 800}
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 800 800'
      width={width ?? 800}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      {...props}
    >
      <defs>
        <clipPath id='__lottie_element_2'>
          <rect height='800' width='800' x='0' y='0' />
        </clipPath>
        <clipPath id='__lottie_element_4'>
          <path d='M0,0 L1728,0 L1728,1728 L0,1728z' />
        </clipPath>
      </defs>
      <g clipPath='url(#__lottie_element_2)'>
        <g
          clipPath='url(#__lottie_element_4)'
          opacity='1'
          transform='matrix(1.2367000579833984,0,0,1.2367000579833984,-668.2998046875,-668.5087890625)'
        >
          <g
            opacity='1'
            transform='matrix(1.2994699478149414,0,0,1.2994699478149414,725.31494140625,727.8936767578125)'
          >
            <g
              opacity='1'
              transform='matrix(1,0,0,1,131.17999267578125,104.73999786376953)'
            >
              <path
                d=' M119.06700134277344,-87.47000122070312 C119.06700134277344,-87.47000122070312 -26.440000534057617,-87.23999786376953 -26.440000534057617,-87.23999786376953 C-74.62000274658203,-87.23999786376953 -113.68000030517578,-48.18000030517578 -113.68000030517578,0 C-113.68000030517578,48.18000030517578 -74.62000274658203,87.23999786376953 -26.440000534057617,87.23999786376953 C-26.440000534057617,87.23999786376953 113.68000030517578,87.23999786376953 113.68000030517578,87.23999786376953'
                fillOpacity='0'
                stroke={stroke}
                strokeLinecap='round'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeOpacity='1'
                strokeWidth='35'
              />
            </g>
          </g>
          <g
            opacity='1'
            transform='matrix(1.2994699478149414,0,0,1.2994699478149414,643.7398681640625,841.25927734375)'
          >
            <g opacity='1' transform='matrix(1,0,0,1,0,0)'>
              <path
                d=' M2.309000015258789,17.5 C2.309000015258789,17.5 338.4200134277344,17.5 338.4200134277344,17.5'
                fillOpacity='0'
                stroke={stroke}
                strokeLinecap='round'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeOpacity='1'
                strokeWidth='35'
              />
            </g>
          </g>
          <g
            opacity='1'
            transform='matrix(1.2994699478149414,0,0,1.2994699478149414,620.9991455078125,621.3760986328125)'
          >
            <g
              opacity='1'
              transform='matrix(1,0,0,1,186.7100067138672,186.7100067138672)'
            >
              <path
                d=' M0,-169.2100067138672 C93.4520034790039,-169.2100067138672 169.2100067138672,-93.4520034790039 169.2100067138672,0 C169.2100067138672,93.4520034790039 93.4520034790039,169.2100067138672 0,169.2100067138672 C-93.4520034790039,169.2100067138672 -169.2100067138672,93.4520034790039 -169.2100067138672,0 C-169.2100067138672,-93.4520034790039 -93.4520034790039,-169.2100067138672 0,-169.2100067138672z'
                fillOpacity='0'
                stroke={stroke}
                strokeLinecap='round'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeOpacity='1'
                strokeWidth='35'
              />
            </g>
          </g>
          <g
            opacity='1'
            transform='matrix(1.2994699478149414,0,0,1.2994699478149414,621.4991455078125,621.3760986328125)'
          >
            <g
              opacity='1'
              transform='matrix(1,0,0,1,186.7100067138672,186.7100067138672)'
            >
              <path
                d='M0 0'
                fillOpacity='0'
                stroke={stroke}
                strokeLinecap='round'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeOpacity='1'
                strokeWidth='35'
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
