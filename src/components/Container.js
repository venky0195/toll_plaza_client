import { useState } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HasTicket from "./HasTicket";
import Pay from "./Pay";

const content = [<Pay />, <HasTicket />];
const Container = () => {
    const [currentTab, setTab] = useState(0);
    return (
        <div >
            <Tabs value={currentTab} indicatorColor="primary"
                textColor="primary" centered>
                <Tab label="Pay Toll" onClick={() => setTab(0)}>
                </Tab>
                <Tab label="Has Ticket" onClick={() => setTab(1)}>
                </Tab>
            </Tabs>
            <div>{content[currentTab]}</div>
        </div>
    );
};
export default Container;
