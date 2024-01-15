import { Box, Flex, ProgressBar, Tooltip } from '../../components';
import type { RoboticAnalysisDataFileHolderData } from './type';

interface DiskDisplayProps extends RoboticAnalysisDataFileHolderData {}

export const DiskDisplay = (props: DiskDisplayProps) => {
  const { space_used, space_total, rad_files } = props;
  const totalRadFileSpaceUsed = rad_files.reduce((acc, cur) => acc + cur.space_used, 0);
  const nonRadFileSpaceUsed = space_used - totalRadFileSpaceUsed;
  const spareSpace = space_total - space_used;
  return (
    <Flex align="center">
      {nonRadFileSpaceUsed > 0 && (
        <Flex.Item key="other-files" grow={nonRadFileSpaceUsed} basis={0}>
          <FixedFileDisplay name="Other Files" color="label" />
        </Flex.Item>
      )}
      {rad_files.map((rad_file, rad_file_index) => (
        <Flex.Item key={rad_file_index} grow={rad_file.space_used} basis={0}>
          <FileDisplay name={rad_file.name} fill={rad_file.data / rad_file.maximum_data} />
        </Flex.Item>
      ))}
      {spareSpace > 0 && (
        <Flex.Item key="Empty" grow={spareSpace} basis={0}>
          <FixedFileDisplay name="Empty Space" color="black" />
        </Flex.Item>
      )}
    </Flex>
  );
};

interface FileDisplayProps {
  fill: number;
  name: string;
}

const FileDisplay = (props: FileDisplayProps) => {
  const { fill, name } = props;
  return (
    <Tooltip content={name}>
      <ProgressBar
        position="relative"
        value={fill}
        ranges={{ good: [1, Infinity], average: [0.5, 1], bad: [-Infinity, 0.5] }}>
        {fill < 1 ? `${Math.floor(fill * 100)}%` : <>&#8203;</>}
      </ProgressBar>
    </Tooltip>
  );
};

interface FixedFileDisplayProps {
  color: string;
  name: string;
}

const FixedFileDisplay = (props: FixedFileDisplayProps) => {
  const { color, name } = props;
  return (
    <Tooltip content={name}>
      <Box backgroundColor={color}>&#8203;</Box>
    </Tooltip>
  );
};
