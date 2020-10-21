import React from "react";
import { Switch } from "react-router-dom";
import _ from "lodash";
import routes from "./Routes";
import PrivateRoute from "./Components/RouteManagment/PrivateRoute";
import PublicRoute from "./Components/RouteManagment/PublicRoute";

function App() {
    return (
        <div>
            <Switch>
                {_.map(routes, (route, idx) => {
                    return route.isProtected ? (
                        <PrivateRoute key={idx} {...route} />
                    ) : (
                        <PublicRoute key={idx} {...route} />
                    );
                })}
            </Switch>
        </div>
    );
}

export default App;
