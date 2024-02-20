export class DuplicatedResourceError extends Error {
    constructor(message, entityType) {
      super(message);
      this.entityType = entityType;
      this.name = "DuplicatedResource";
    }
  }

  export class NotFoundError extends Error {
    constructor(message, entityType) {
      super(message);
      this.entityType = entityType;
      this.name = "NotFound";
    }
  }

  export class ValidationError extends Error {
    constructor(message, field) {
      super(message);
      this.field = field;
      this.name = "ValidationError";
    }
  }