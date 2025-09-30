import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import axios from "axios";
import { debounce } from "lodash";
import { useState } from "react";

import { API_BASE_URL } from "../../lib/const/const";
import { Idea } from "../../lib/interfaces/idea.interfaces";
import { ApiResponse } from "../../lib/interfaces/response.interfaces";
import { serializeAxiosError } from "../../lib/utils/common.utils";

type Props = {
  idea: Idea;
  messageApi: NotificationInstance;
};

export const IdeaCard = ({ idea, messageApi }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canVote, setCanVote] = useState<boolean>(idea.canVote);

  const voteForIdea = async () =>
    await axios.post<ApiResponse<Idea>>(
      API_BASE_URL + `/ideas/${idea.id}/vote`
    );

  const debouncedSave = debounce(() => {
    voteForIdea()
      .then(() => {
        setCanVote(false);
      })
      .catch((err) => {
        const error = serializeAxiosError(err);
        messageApi.error({
          message: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 1000);

  return (
    <>
      <Card
        key={idea.id}
        //title={item.label}
        variant="borderless"
        actions={[
          canVote ? (
            <div style={{ minHeight: 50, width: "100%", marginTop: "1vh" }}>
              <Button
                block
                size="large"
                loading={isLoading}
                variant="text"
                color="orange"
                onClick={() => {
                  setIsLoading(true);

                  debouncedSave();
                }}
                style={{
                  width: "45%",
                  borderRadius: "9999px",
                }}
              >
                <CheckCircleOutlined />
                <br /> Голосовать
              </Button>
            </div>
          ) : (
            <div
              style={{
                minHeight: 50,
                width: "100%",
                marginTop: "1vh",
                cursor: "not-allowed",         
              }}
            >
              <CheckCircleOutlined />
              <br /> Голос учтен
            </div>
          ),
        ]}
      >
        <Card.Meta
          style={{ color: "white" }}
          title={<>{idea.title} </>}
          description={idea.text}
        />
      </Card>
    </>
  );
};
