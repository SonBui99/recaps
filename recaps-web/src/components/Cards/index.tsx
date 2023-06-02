import React, { FC, Ref } from 'react';
import cx from 'classnames';

const Card: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, className, ...other } = props;

  return (
    <div className={cx('app-card', className)} {...other}>
      {children}
    </div>
  );
};

export default Card;
