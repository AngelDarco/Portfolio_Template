export default class UuidChecker {
  static isValid(uuid: string | undefined): boolean {
    if (!uuid) return false;
    return uuid
      ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          uuid
        )
      : false;
  }
}
