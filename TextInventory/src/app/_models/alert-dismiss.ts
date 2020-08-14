export class AlertDismiss {
  type: string;
  msg: string;
  timeout: number;

  constructor(type: string, msg: string, timeout: number) {
    this.type = type;
    this.msg = msg;
    this.timeout = timeout;
  }
}
