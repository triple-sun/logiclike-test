import { Button, Result } from "antd";

import { SerializedError } from "../../lib/interfaces/error.interfaces";

type Props = {
  error: SerializedError;
};

export const GenericErrorElement = ({ error }: Props) => {
  return (
    <Result
      status={500}
      title={`Произошла ошибка`}
      subTitle={error.message}
      extra={
        <Button
          color="primary"
          variant="filled"
          onClick={() => {
            location.reload();
          }}
        >
          Обновить
        </Button>
      }
    />
  );
};
