import { ConfigProvider, Divider, Layout, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import locale from "antd/locale/ru_RU";
import { PropsWithChildren } from "react";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#8950E6",
        },
        components: {
          Card: {
            //colorBgContainer: `rgba(0,0,0, 0.15)`,
            colorBorderBg: `rgba(0,0,0, 0.15)`,
            colorBgSolid: `rgba(0,0,0, 0.15)`,
            colorBorder: `rgba(0,0,0, 0.15)`,
            colorBgSolidHover: `rgba(0,0,0, 0.15)`,
            colorBgBase: `rgba(0,0,0, 0.15)`,
            colorInfoBorder: `rgba(255, 255, 255, 0.15)`,
          },
          Menu: {
            darkItemColor: "rgba(225,225,225,1)",
            darkItemBg: "rgba(0,0,0,0)",
            darkPopupBg: `rgba(0,0,0,0)`,

            horizontalItemBorderRadius: borderRadiusLG,
            horizontalItemHoverBg: "rgba(0,0,0, 0.4)",
            darkItemSelectedBg: `rgba(0,0,0,0.5)`,
          },
          Layout: {
            headerBg: "rgba(0,0,0,0)",
          },
          List: {
            controlItemBgActive: "rgba(0,0,0, 0.15)",
          },
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",

          padding: "0 24px",
          paddingTop: 0,
          //alignItems: "center",
        }}
      >
        <Layout.Header
          style={{ display: "flex", alignItems: "center", marginTop: "2vh" }}
        />
        <Layout.Content
          style={{
            marginTop: "1vh",
            //backgroundColor: `#8950E6`,
            backgroundSize: 400,
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "70vw",
            backgroundPositionY: "40vh",
            backgroundClip: "initial",
          }}
        >
          {children}
        </Layout.Content>

        <Footer
          style={{
            textAlign: "center",
            color: `rgba(225, 225, 225, 1)`,
            fontWeight: "bold",
            maxWidth: "auto",
            backgroundColor: `transparent`,
            borderRadius: "9999px",
            width: "150%",
            alignSelf: "center",
          }}
        >
          Семен Кононец © {new Date().getFullYear()}
          <Divider type="vertical"></Divider>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};
