import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'

/*
<div className="top-bar">
            <h1>Planner.com</h1>
        </div>*/

function TopBar() {
    return (
        <div className="top-bar">
            <AppBar position="fixed" sx={{height: "50px"}}>
                <Toolbar>
                    <h1>Planner.com</h1>
                </Toolbar>
            </AppBar>
        </div>
    );

}

export default TopBar;