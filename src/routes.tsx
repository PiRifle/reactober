import React, { Fragment } from 'react'
import { Route, Routes as DOMRoutes } from 'react-router-dom'
const PRESERVED = (() => {
    //@ts-ignore
    const context = require.context('/src/pages', false, /(_app|404)\.tsx$/);
    return Object.fromEntries(context.keys().map((a: any)=>[a.slice(2), context(a)]));
})();
const ROUTES = (context => {
    return Object.fromEntries(context.keys().map((a: any)=>[a.slice(1), context(a)]));
    //@ts-ignore  
})(require.context('/src/pages', true, /[a-z]*.tsx$/));

const preserved: any = Object.keys(PRESERVED).reduce((preserved, file) => {
    const key = file.replace(/\/src\/pages\/|\.tsx$/g, '')
    return { ...preserved, [key]: PRESERVED[file].default }
}, {})

const routes = Object.keys(ROUTES).map((route) => {
    const path = route
        .replace(/\/src\/pages|index|\.tsx$/g, '')
        .replace(/\[\.{3}.+\]/, '*')
        .replace(/\[(.+)\]/, ':$1')

    return { path, component: ROUTES[route].default }
})

export const Routes = () => {
    console.log(routes)
    const App = preserved['_app'] || Fragment
    const NotFound = preserved['404'] || Fragment
    return (
        <App>
            <DOMRoutes>
                {routes.map(({ path, component: Component = Fragment }) => (
                    <Route key={path} path={path} element={<Component/>} />
                ))}
                <Route path="*" element={<NotFound/>} />
            </DOMRoutes>
        </App>
    )
}