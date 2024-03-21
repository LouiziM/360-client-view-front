//you need to fix this????

import {
  GridColumnMenuContainer,
  
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;
