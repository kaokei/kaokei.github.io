export function isValidBase64(str: string): boolean {
  // 检查字符串长度是否为4的倍数
  if (
    !str.match(
      /^([A-Za-z0-9+/=]{4})*([A-Za-z0-9+/=]{2}==|[A-Za-z0-9+/=]{3}=)?$/,
    )
  ) {
    return false;
  }
  return true;
}
