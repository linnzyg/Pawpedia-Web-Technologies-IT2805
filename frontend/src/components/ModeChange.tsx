import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FlareIcon from '@mui/icons-material/Flare';
import { useColorScheme, useTheme } from '@mui/material/styles';

export default function ModeChange() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const { setMode } = useColorScheme();

  const handleToggle = () => {
    if (mode === 'dark') {
      setMode('light');
    } else {
      setMode('dark');
    }
  };

  const otherMode = mode === 'dark' ? 'Light' : 'Dark';
  return (
    <Tooltip title={`Change To ${otherMode}-mode`}>
      <IconButton
        size="large"
        onClick={handleToggle}
      >
        {mode === 'dark' ? <FlareIcon/> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}