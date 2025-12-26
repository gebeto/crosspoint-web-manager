/* eslint-disable react-refresh/only-export-components */

import React from "react";

type Route = "files" | "status";
const RouterContext = React.createContext<{
  route: Route;
  setRoute: React.Dispatch<React.SetStateAction<Route>>;
} | null>(null);

export const RouterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [route, setRoute] = React.useState<Route>("status");
  return (
    <RouterContext.Provider value={{ route, setRoute }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = React.useContext(RouterContext);

  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }

  return context;
};

export const Route: React.FC<React.PropsWithChildren<{ route: Route }>> = ({
  route,
  children,
}) => {
  const { route: currentRoute } = useRouter();

  if (route === currentRoute) {
    return <>{children}</>;
  }

  return null;
};
