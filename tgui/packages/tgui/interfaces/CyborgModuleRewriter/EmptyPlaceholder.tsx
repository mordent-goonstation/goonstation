/**
 * @file
 * @copyright 2020
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { InfernoNode } from 'inferno';
import { classes, pureComponentHooks } from 'common/react';
import * as styles from './styles';

interface EmptyPlaceholderProps {
  children: InfernoNode,
  className?: string,
}

export const EmptyPlaceholder = (props: EmptyPlaceholderProps) => {
  const {
    children,
    className,
  } = props;
  const cn = classes([
    styles.EmptyPlaceholder,
    className,
  ]);
  return (
    <div className={cn}>{children}</div>
  );
};

EmptyPlaceholder.defaultHooks = pureComponentHooks;
