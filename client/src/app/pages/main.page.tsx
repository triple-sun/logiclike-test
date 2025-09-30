import { Card, Col, Empty, Row } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { CSSProperties, ReactNode, useEffect, useState } from "react";

import { API_BASE_URL } from "../../lib/const/const";
import { SerializedError } from "../../lib/interfaces/error.interfaces";
import { Idea } from "../../lib/interfaces/idea.interfaces";
import { ApiResponse } from "../../lib/interfaces/response.interfaces";
import { serializeAxiosError } from "../../lib/utils/common.utils";
import api from "../../services/api";
import { IdeaCard } from "../components/idea-card.component";

export const MainPage = ({
  messageApi,
}: {
  messageApi: NotificationInstance;
}) => {
  const [ideas, setIdeas] = useState<Idea[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<SerializedError>();

  if (error) {
    messageApi.error({
      message: `${error.code}`,
      description: error.message,
    });
  }

  const cardStyle: CSSProperties = {
    backgroundColor: `rgb(255, 255, 255)`,
    borderRadius: 2,
    padding: "2vh",
    marginTop: "1vh",
    marginBottom: "1vh",
    marginLeft: "2vh",
    marginRight: "2vh",
    minHeight: 100,
  };

  useEffect(() => {
    const fetchIdeas = async () =>
      await api.get<ApiResponse<Idea[]>>(API_BASE_URL + "/ideas/");

    setIsLoading(true);

    fetchIdeas()
      .then(({ data: { data } }) => setIdeas(data))
      .catch((err) => setError(serializeAxiosError(err)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Row
      gutter={[16, 24]}
      // style={{ marginLeft: "45vh", marginRight: "45vh" }}
    >
      {ideas && ideas.length > 0 ? (
        ideas?.map((idea): ReactNode | null => (
          <Col span={8} key={idea.id}>
            <IdeaCard
              idea={idea}
              cardProps={{ style: cardStyle }}
              messageApi={messageApi}
            />
          </Col>
        ))
      ) : (
        <>
          <Col span={8} />
          <Col span={8}>
            <Card variant="borderless" loading={isLoading} style={cardStyle}>
              <Empty />
            </Card>
          </Col>
          <Col span={8} />
        </>
      )}
    </Row>
  );
};
