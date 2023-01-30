export enum MessageType {
  SUCCESS = "Success",
  WARNING = "Warning",
  ERR0R = "Error",
}

export type Variant = "Success" | "Warning" | "Error";

export const ValidationColors = {
  SUCCESS: "#04AA6D",
  WARNING: "#2196F3",
  ERROR: "#f44336",
};

export const validationMessage = (type: Variant, name: string): string => {
  if (type === MessageType.SUCCESS) {
    return `${name} was created successfully`;
  }
  if (type === MessageType.ERR0R) {
    return `Please enter a value`;
  }
  return "Sorry, something went wrong. Please try again";
};

export const httpStatusError = (type: Variant, error: string) => {
  return `${type}: ${error}`;
};
