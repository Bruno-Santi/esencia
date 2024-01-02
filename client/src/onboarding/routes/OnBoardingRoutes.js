import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes, } from "react-router-dom";
import { Welcome, StepOne, StepTwo, } from "../pages";
export const OnBoardingRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { element: _jsx(Welcome, {}), path: "/" }), _jsx(Route, { element: _jsx(StepOne, {}), path: "/stepone" }), _jsx(Route, { element: _jsx(StepTwo, {}), path: "/steptwo" }), _jsx(Route, { path: "/*", element: _jsx(Navigate, { to: "/", replace: true }) })] }));
};
