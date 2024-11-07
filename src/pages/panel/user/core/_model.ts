export interface TenantUserModel {
  tenantProjectId: number;
  userId: number;
  fullName: string;
  userAvatar: string;
  userStatus: string | number;
  email: string;
  roleName: string;
}

export interface UserInfoInputs {
  userKey?: string;
  email: string;
  phoneNumber: string;
  name: string;
  surname: string;
  isActive?: boolean;
  password?: string;
  otpcode?: string;
  avatar?: string;
  isOwner?: boolean;
}

export interface TenantProjectUserModel {
  tenantProjectId: number;
  userInfoId: number | null;
  status: number;
  roleId: number;
}

export interface ApproveUserRequestModel {
  userId?: number;
  tenantProjectId?: number;
  roleId: number;
}
