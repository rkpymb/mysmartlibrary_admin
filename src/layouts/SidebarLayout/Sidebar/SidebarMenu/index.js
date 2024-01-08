import { useContext } from 'react';
import { useRouter } from 'next/router';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import NextLink from 'next/link';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { BsFillPersonLinesFill, BsFillGeoAltFill, BsFillLaptopFill, BsFillMortarboardFill, BsFillPeopleFill, BsCreditCard2BackFill, BsCurrencyRupee, BsFillGearFill } from "react-icons/bs";



const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    'transform',
    'opacity'
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <MenuWrapper>

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Main Dashboards
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/dashboards/main" passHref>
                  <Button
                    className={
                      currentRoute === '/dashboards/main' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BsFillLaptopFill />}
                  >
                    Dashboard
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/Academics/main" passHref>
                  <Button
                    className={
                      currentRoute === '/Academics/main' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BsFillMortarboardFill />}
                  >
                    Academics
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/Users/main" passHref>
                  <Button
                    className={
                      currentRoute === '/Users/main' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BsFillPeopleFill />}
                  >
                    Users
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/Educators/main" passHref>
                  <Button
                    className={
                      currentRoute === '/Educators/main' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BsFillPersonLinesFill />}
                  >
                    Educators
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/Library/main" passHref>
                  <Button
                    className={
                      currentRoute === '/Library/main' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BsFillGeoAltFill />}
                  >
                    Library & Study Center
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/Settings/main" passHref>
                  <Button
                    className={
                      currentRoute === '/Settings/main' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BsFillGearFill />}
                  >
                    Settings
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Reports
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/Wallet" passHref>
                  <Button
                    className={
                      currentRoute === '/Wallet' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BsCreditCard2BackFill />}
                  >
                    Wallet
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/AllOrders" passHref>
                  <Button
                    className={
                      currentRoute === '/AllOrders' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BsCurrencyRupee />}
                  >
                    Manage Orders
                  </Button>
                </NextLink>
              </ListItem>

            </List>
          </SubMenuWrapper>
        </List>


      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
