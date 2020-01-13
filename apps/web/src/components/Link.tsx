import React from 'react';
import { Link as ReachLink } from '@reach/router';

interface LinkProps {
  to: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return <ReachLink ref={ref as any} {...props} />;
});

export default Link;
