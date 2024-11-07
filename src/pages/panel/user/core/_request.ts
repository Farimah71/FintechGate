// import { useMutation } from "@tanstack/react-query";
// import { createData, readData } from "../../../../core/http-service";
// import { CustomResponse } from "../../../../types/http-response.interface";
// import {
//   APPROVE_USER_REQUEST,
//   CREATE_TENANT_PROJECT_USER,
//   CREATE_USER_INFO,
//   GET_ALL_ROLES,
//   GET_ALL_TENANT_PROJECTS,
//   GET_ALL_USER_INFOS,
//   GET_PROJECT_TENANT_USERS,
//   GET_USER_INFO_DETAILS,
// } from "./_api";
// import {
//   GetAllOptions,
//   RequestOptions,
// } from "../../../../types/react-query.type";
// import {
//   ApproveUserRequestModel,
//   TenantProjectUserModel,
//   UserInfoInputs,
// } from "./_model";

// const getTenantUsers = () => readData<CustomResponse>(GET_PROJECT_TENANT_USERS);

// export const useGetTenantUsers = () => {
//   const {
//     mutate: submitGetTenantUsers,
//     data: tenantUsersData,
//     isPending,
//   } = useMutation({
//     mutationFn: getTenantUsers,
//     mutationKey: ["tenant_users"],
//   });

//   return { submitGetTenantUsers, tenantUsersData, isPending };
// };

// // ******************************************************
// // ******************************************************

// const getAllUserInfos = (options: GetAllOptions) =>
//   createData<GetAllOptions, CustomResponse>(GET_ALL_USER_INFOS, options);

// export const useGetAllUserInfos = () => {
//   const {
//     mutate: submitGetAllUserInfos,
//     data,
//     isPending,
//   } = useMutation({
//     mutationKey: ["user_info"],
//     mutationFn: getAllUserInfos,
//   });

//   return { submitGetAllUserInfos, data, isPending };
// };

// // ******************************************************
// // ******************************************************

// const createUserInfo = (model: UserInfoInputs) =>
//   createData<UserInfoInputs, CustomResponse>(CREATE_USER_INFO, model);

// export const useCreateUserInfo = ({ onSuccess }: RequestOptions) => {
//   const { mutate: submitCreateUserInfo, isPending } = useMutation({
//     mutationFn: createUserInfo,
//     onSuccess: onSuccess,
//   });

//   return { submitCreateUserInfo, isPending };
// };

// // ******************************************************
// // ******************************************************

// const getTenantProjects = (options: GetAllOptions) =>
//   createData<GetAllOptions, CustomResponse>(GET_ALL_TENANT_PROJECTS, options);

// export const useGetTenantProjects = () => {
//   const {
//     data: tenantProjectData,
//     mutate: submitGetTenantProjects,
//     isPending,
//   } = useMutation({
//     mutationFn: getTenantProjects,
//   });

//   return { tenantProjectData, submitGetTenantProjects, isPending };
// };

// // ******************************************************
// // ******************************************************

// const createTenantProjectUser = (model: TenantProjectUserModel) =>
//   createData<TenantProjectUserModel, CustomResponse>(
//     CREATE_TENANT_PROJECT_USER,
//     model
//   );

// export const useCreateTenantProjectUser = ({ onSuccess }: RequestOptions) => {
//   const { mutate: submitCreateTenantProjectUser, isPending } = useMutation({
//     mutationFn: createTenantProjectUser,
//     onSuccess: onSuccess,
//   });

//   return { submitCreateTenantProjectUser, isPending };
// };

// // ******************************************************
// // ******************************************************

// const getUserDetails = (id: number) =>
//   readData<CustomResponse>(`${GET_USER_INFO_DETAILS}?id=${id}`);

// export const useGetUserDetails = () => {
//   const {
//     mutate: submitGetUserDetails,
//     isPending,
//     data,
//   } = useMutation({
//     mutationFn: getUserDetails,
//     mutationKey: ["user_detail"],
//   });

//   return { submitGetUserDetails, isPending, data };
// };

// // ******************************************************
// // ******************************************************

// const approveUserRequest = (model: ApproveUserRequestModel) =>
//   createData<ApproveUserRequestModel, CustomResponse>(
//     APPROVE_USER_REQUEST,
//     model
//   );

// export const useApproveUserRequest = ({ onSuccess }: RequestOptions) => {
//   const { mutate: submitApproveUserRequest, isPending } = useMutation({
//     mutationFn: approveUserRequest,
//     onSuccess: onSuccess,
//   });

//   return { submitApproveUserRequest, isPending };
// };

// // ******************************************************
// // ******************************************************

// const getAllRoles = (options: GetAllOptions) =>
//   createData<GetAllOptions, CustomResponse>(GET_ALL_ROLES, options);

// export const useGetAllRoles = () => {
//   const {
//     mutate: submitGetAllRoles,
//     isPending,
//     data,
//   } = useMutation({
//     mutationFn: getAllRoles,
//     mutationKey: ["roles"],
//   });

//   return { submitGetAllRoles, isPending, data };
// };
