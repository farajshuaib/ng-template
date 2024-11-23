export interface CoreResponseDto<T> {
  message: string;
  content: T;
  success: boolean;
}
