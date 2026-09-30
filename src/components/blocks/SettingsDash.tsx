"use client";

import { Tabs, Tab, Card } from "@heroui/react";
import Profile from "./settings/Profile";
import Password from "./settings/Password";
// import NotificationsSettings from "./settings/NotificationsSettings";
// import TeamSettings from "./settings/TeamSettings";

const tabs = [
  { key: "profile", title: "Profile", component: <Profile /> },
  { key: "password", title: "Password", component: <Password /> },
  // {
  //   key: "notification",
  //   title: "Notifications settings",
  //   component: <NotificationsSettings />,
  // },
  // { key: "teams", title: "Team settings", component: <TeamSettings /> },
];

export default function App() {
  return (
    <div className="flex flex-col px-4 w-[90%] mx-auto mt-4">
      <div className="flex w-full flex-col">
        <Tabs aria-label="settings-otions">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              {tabs.map((tab) => (
                <Tabs.Tab id={tab.key} key={tab.key}>
                  {tab.title}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
          {tabs.map((tab) => (
            <Tabs.Panel id={tab.key} key={tab.key}>
              <Card>
                <Card.Content>{tab.component}</Card.Content>
              </Card>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
