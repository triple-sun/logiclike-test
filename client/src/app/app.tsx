import { notification } from "antd";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";

import { AppLayout } from "./components/app-layout.component";
import { GenericErrorElement } from "./elements/generic-error-result.element";
import { MainPage } from "./pages/main.page";

const App: React.FC = () => {
  const [messageApi, contextHolder] = notification.useNotification();

  return (
    <ErrorBoundary
      onError={(err) => {
        messageApi.error({
          message: `Ошибка ${err.name}`,
          description: JSON.stringify(err.message),
        });
      }}
      fallbackRender={({ error }) => {
        return (
          <>
            {contextHolder}
            <AppLayout>
              <GenericErrorElement error={error} />
            </AppLayout>
          </>
        );
      }}
    >
      {contextHolder}
      <AppLayout>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage messageApi={messageApi} />} />
          </Route>
        </Routes>
      </AppLayout>
    </ErrorBoundary>
  );
};

export default App;
