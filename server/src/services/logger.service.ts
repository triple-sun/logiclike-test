import { logger } from "../config/logger.config";

export class LoggerService {
  private readonly name?: string;

  constructor(name?: string) {
    this.name = name;
  }

  private format(msg: unknown) {
    if (msg) {
      if (typeof msg === "string") {
        return msg;
      } else if (typeof msg === "object" && "msg" in msg) {
        return [
          "statusCode" in msg && `[${msg.statusCode}]`,
          "error" in msg && `[${msg.error}]`,
          msg.msg,
        ]
          .filter((el) => !!el)
          .join(` `);
      } else return JSON.stringify(msg);
    }
  }

  public info(msg: any) {
    return logger.info(
      `${this.name ? `[${this.name}]` : ``}` + `: ${this.format(msg)}`
    );
  }
  public warn(msg: any) {
    return logger.warn(
      `${this.name ? `[${this.name}]` : ``}` + `: ${this.format(msg)}`
    );
  }
  public debug(msg: any) {
    return logger.debug(
      `${this.name ? `[${this.name}]` : ``}` + `: ${this.format(msg)}`
    );
  }
  public error(msg: any) {
    return logger.error(
      `${this.name ? `[${this.name}]` : ``}` + `: ${this.format(msg)}`
    );
  }
  public verbose(msg: any) {
    return logger.verbose(
      `${this.name ? `[${this.name}]` : ``}` + `: ${this.format(msg)}`
    );
  }
}
