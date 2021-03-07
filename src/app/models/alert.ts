export class Alert {
    private messages: string[] = [];
    private error = false;
    private statusCode: any;
  
    constructor(values = {}) {
      Object.assign(this, values);
    }
  
    public setMessage(message: string) {
      this.messages.push(message);
    }
  
    public getMessages() {
      return this.messages;
    }
  
    public setError(error = false) {
      this.error = error;
    }
  
    public isError() {
      return this.error;
    }
  
    public setStatusCode(statusCode: any) {
      this.statusCode = statusCode;
    }
  
    public getStatusCode() {
      return this.statusCode;
    }
  }
  