/**
 * @file
 * @copyright 2026
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { PropsWithChildren, useContext } from 'react';
import { Box, Button } from 'tgui-core/components';

import { DriveContext } from '../../../common/drives';

interface ModuleProps {
  color: string;
  tooltip?: string;
}

export function Module(props: PropsWithChildren<ModuleProps>) {
  const { children, color, tooltip } = props;
  const { onContentClick: onClick } = useContext(DriveContext);
  const style = onClick ? { cursor: 'grab' } : undefined;
  return (
    <Button
      fluid
      onClick={onClick}
      style={style}
      tooltip={tooltip ?? (typeof children === 'string' ? children : undefined)}
      backgroundColor={color}
      align="center"
      height="100%"
    >
      {typeof children === 'string' ? (
        <Box
          backgroundColor="white"
          px={1}
          mx={2}
          bold
          textAlign="center"
          style={{
            borderColor: '#cccccc',
            borderWidth: '3px',
            borderStyle: 'ridge',
            borderTop: 'none',
            borderRadius: '10px',
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          textColor="black"
        >
          {children}
        </Box>
      ) : (
        children
      )}
    </Button>
  );
}
