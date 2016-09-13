export class ValidationErrors extends Array<string> {
  messages :Array<string> = [];

  add(key: string, message: string) {
    this.push(key);
    this.messages.push(message);
  }
}