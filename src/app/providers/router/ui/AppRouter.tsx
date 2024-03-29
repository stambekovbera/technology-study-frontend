import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

const AppRouterComponent = () => {

    const isAuth = useSelector( getUserAuthData );

    const routes = useMemo( () => {
        return Object.values( routeConfig ).filter( (route) => !( route.authOnly && !isAuth ) );
    }, [ isAuth ] );

    return (
        <React.Suspense fallback={ <PageLoader/> }>
            <Routes>
                { routes.map( ({ path, element }) => (
                    <Route key={ path } path={ path } element={ ( <div className="page-wrapper">{ element }</div> ) }/>
                ) ) }
            </Routes>
        </React.Suspense>
    );
};

const AppRouter = React.memo( AppRouterComponent );

export default AppRouter;
