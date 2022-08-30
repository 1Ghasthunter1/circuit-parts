export interface NotificationState {
  type: "success" | "error" | "info" | "warn";
  header: string;
  subtitle: string;
  timeout: string;
}
