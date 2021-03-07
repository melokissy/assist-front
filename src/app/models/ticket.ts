import { timeStamp } from "console";

export class Ticket {

    subject = '';
    description = '';
    requester = '';
    type = '';
    priority = '';
    status='';
    project = '';
    reponsible = '';
    createdAt = '';
    editedAt = '';

    constructor({ subject, description, requester, type, priority, status, project, reponsible, createdAt, editedAt}) {
      this.subject = subject;
      this.description = description;
      this.requester = requester;
      this.type = type;
      this.priority = priority;
      this.status = status;
      this.project = project;
      this.reponsible = reponsible;
      this.createdAt = createdAt;
      this.editedAt = editedAt;
    }
  }