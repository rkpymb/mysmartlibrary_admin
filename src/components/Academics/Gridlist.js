import {
    Button,
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Avatar,
    alpha,
   
    styled
} from '@mui/material';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import MYS from '../../../Styles/mystyle.module.css'
const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${theme.palette.mode === 'dark'
            ? theme.colors.alpha.trueWhite[30]
            : alpha(theme.colors.alpha.black[100], 0.07)
        };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

const AvatarAddWrapper = styled(Avatar)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
    ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

function Wallets() {
    const router = useRouter();
    const currentRoute = router.pathname;
    return (
        <div className={MYS.min100vh}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    pb: 3, mt:5
                }}
            >
                <Typography variant="h3">SuperMarks Academics</Typography>
                {/* <Button
                    size="small"
                    variant="outlined"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                >
                    Add new wallet
                </Button> */}
            </Box>
            <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={3} item >
                    {/* <NextLink href="/Academics/FreeContents" passHref>
                        <Card
                            sx={{
                                px: 1
                            }}
                            className={MYS.Catgrid}
                        >
                            <CardContent
                               
                               >
                                <AvatarWrapper>
                                    <img
                                        alt="BTC"
                                        src="https://fmenew.sgp1.cdn.digitaloceanspaces.com/Supermarks/content/free.png"
                                    />
                                </AvatarWrapper>
                                <Typography variant="h5" noWrap>
                                    Free Contents
                                </Typography>

                               
                            </CardContent>
                        </Card>   
                    </NextLink> */}
                 
                </Grid>
                <Grid xs={12} sm={6} md={3} item >
                    <NextLink href="/Academics/Categories" passHref>
                        <Card
                            sx={{
                                px: 1
                            }}
                            className={MYS.Catgrid}
                        >
                            <CardContent
                               
                               >
                                <AvatarWrapper>
                                    <img
                                        alt="BTC"
                                        src="https://fmenew.sgp1.cdn.digitaloceanspaces.com/Supermarks/content/checklist.png"
                                    />
                                </AvatarWrapper>
                                <Typography variant="h5" noWrap>
                                    Categories
                                </Typography>

                               
                            </CardContent>
                        </Card>   
                    </NextLink>
                 
                </Grid>
                {/* <Grid xs={12} sm={6} md={3} item >
                    <NextLink href="/Academics/Courses" passHref>
                        <Card
                            sx={{
                                px: 1
                            }}
                            className={MYS.Catgrid}
                        >
                            <CardContent
                               
                               >
                                <AvatarWrapper>
                                    <img
                                        alt="BTC"
                                        src="https://fmenew.sgp1.cdn.digitaloceanspaces.com/Supermarks/content/survey.png"
                                    />
                                </AvatarWrapper>
                                <Typography variant="h5" noWrap>
                                    Courses
                                </Typography>

                               
                            </CardContent>
                        </Card>   
                    </NextLink>
                 
                </Grid> */}
                <Grid xs={12} sm={6} md={3} item >
                    <NextLink href="/Academics/TestSeries" passHref>
                        <Card
                            sx={{
                                px: 1
                            }}
                            className={MYS.Catgrid}
                        >
                            <CardContent
                               
                               >
                                <AvatarWrapper>
                                    <img
                                        alt="BTC"
                                        src="https://fmenew.sgp1.cdn.digitaloceanspaces.com/Supermarks/content/list.png"
                                    />
                                </AvatarWrapper>
                                <Typography variant="h5" noWrap>
                                    Test Series
                                </Typography>

                               
                            </CardContent>
                        </Card>   
                    </NextLink>
                 
                </Grid>
               
                
            </Grid>
        </div>
    );
}

export default Wallets;
