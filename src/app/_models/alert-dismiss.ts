export class AlertDismiss {
  type: string;
  msg: string;
  timeout: number;

  constructor(type, msg, timeout) {
    this.type = type;
    this.msg = msg;
    this.timeout = timeout;
  }
}
