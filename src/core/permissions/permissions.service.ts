export class PermissionsService {
  static add(mask: bigint, perm: bigint) {
    return mask | perm;
  }
  static remove(mask: bigint, perm: bigint) {
    return mask & ~perm;
  }
  static has(mask: bigint, perm: bigint) {
    return (mask & perm) !== 0n;
  }
  static hasAll(mask: bigint, perm: bigint) {
    return (mask & perm) === perm;
  }
}