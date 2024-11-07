// import { FC, useEffect, useState } from "react";
// import { PieChartOutlined } from "@ant-design/icons";
// import { Badge, Popconfirm } from "antd";
// import { MyTable } from "../../../components/table";
// import { generateColumns } from "../../../helper/generate-columns";
// import {
//   useBreadcrumbStore,
//   useContentLoadingStore,
//   usePageTitleStore,
// } from "../../../zustand/stores";
// import {
//   // useApproveUserRequest,
//   useGetAllRoles,
//   useGetTenantUsers,
// } from "./core/_request";
// // import { yupResolver } from "@hookform/resolvers/yup";
// import { useOutletContext } from "react-router-dom";
// import { ButtonContext } from "../../../types/button-context.interface";
// import { CreateUserInfo } from "./components/create-user-info";
// import { CreateTenantProjectUser } from "./components/create-tenant-project-user";
// // import { SubmitHandler, useForm } from "react-hook-form";
// import { MySelect } from "../../../components/inputs/select";
// // import { ApproveUserRequestModel, TenantUserModel } from "./core/_model";
// import { generateDataToSend } from "../../../helper/generate-data-to-send";
// import { convertToSelectOption } from "../../../helper/convert-to-select-option";
// import { SelectOption } from "../../../types/select.type";
// // import { Toast } from "../../../helper/UI/toast";
// // import * as yup from "yup";
// import { t } from "i18next";

// import avatar from "../../../assets/images/avatars/300-23.jpg";

// // type UserType = {
// //   userId: number;
// //   tenantProjectId: number;
// // };

// const breadcrumbItems = [
//   {
//     title: (
//       <span>
//         <PieChartOutlined className="mx-1" />
//         {t("page_title.dashboard")}
//       </span>
//     ),
//     href: "/dashboard",
//   },
//   { title: t("page_title.users") },
// ];

// const User: FC = () => {
//   // const [openPopconfirm, setOpenPopconfirm] = useState<number>();
//   const [data, setData] = useState<[]>();
//   const [userInfoId, setUserInfoId] = useState<number | null>(null);
//   // const [user, setUser] = useState<UserType>();
//   const [step, setStep] = useState(0);
//   const [options, setOptions] = useState<SelectOption[]>([]);

//   const { setButtonProps } = useOutletContext<ButtonContext>();
//   const { setBreadcrumbItems } = useBreadcrumbStore();
//   const { setPageTitle } = usePageTitleStore();
//   const { setIsContentLoading } = useContentLoadingStore();
//   const {
//     data: rolesData,
//     isPending: rolesPending,
//     submitGetAllRoles,
//   } = useGetAllRoles();
//   const { submitGetTenantUsers, isPending, tenantUsersData } =
//     useGetTenantUsers();
//   // const { submitApproveUserRequest, isPending: approvePending } =
//   //   useApproveUserRequest({
//   //     onSuccess: () => {
//   //       Toast("success");
//   //       submitGetTenantUsers();
//   //     },
//   //   });

//   // const schema = yup.object().shape({
//   //   userId: yup.number(),
//   //   tenantProjectId: yup.number(),
//   //   roleId: yup
//   //     .number()
//   //     .required(t("error.is_required", { name: t("input.role.label") })),
//   // });

//   // const {
//   //   handleSubmit,
//   //   reset,
//   //   control,
//   //   formState: { isValid, touchedFields, errors },
//   // } = useForm<ApproveUserRequestModel>({
//   //   resolver: yupResolver(schema),
//   //   mode: "all",
//   // });

//   useEffect(() => {
//     submitGetTenantUsers();
//     setPageTitle(t("page_title.users"));
//     setBreadcrumbItems(breadcrumbItems);
//     setButtonProps({
//       title: t("button.add"),
//       visible: true,
//       clickHandler: () => {
//         setStep(1);
//       },
//     });
//     submitGetAllRoles(
//       generateDataToSend([
//         {
//           property: "ProjectId",
//           operation: 5,
//           values: ["2"],
//         },
//       ])
//     );

//     return () => setButtonProps({ title: "", visible: false });
//   }, []);
//   useEffect(() => {
//     setIsContentLoading(isPending);
//   }, [isPending]);
//   useEffect(() => {
//     if (tenantUsersData?.responseValue.length) {
//       const data = tenantUsersData?.responseValue.map(
//         (user: TenantUserModel) => ({
//           userId: user.userId,
//           tenantProjectId: user.tenantProjectId,
//           avatar: user.userAvatar,
//           name: user.fullName,
//           status: user.userStatus,
//           role: user.roleName,
//           email: user.email,
//         })
//       );
//       setData(data);
//     }
//   }, [tenantUsersData]);
//   useEffect(() => {
//     if (rolesData?.responseValue.length) {
//       const options = convertToSelectOption(rolesData.responseValue);
//       options && setOptions(options);
//     }
//   }, [rolesData]);

//   const columns = generateColumns([
//     {
//       name: t("table.name"),
//       render: (name, record) => (
//         <span className="flex items-center gap-x-3">
//           {record.avatar ? (
//             record.avatar
//           ) : (
//             <img className="w-10 rounded-full" src={avatar} />
//           )}
//           <span>{name}</span>
//         </span>
//       ),
//     },
//     {
//       name: t("table.role"),
//     },
//     {
//       name: t("table.email"),
//       ellipsis: true,
//     },
//     {
//       name: t("table.status"),
//       render: (status: string | number) => (
//         <Badge
//           color={+status === 1 ? "green" : "red"}
//           text={+status === 1 ? t("badge.active") : t("badge.inactive")}
//         />
//       ),
//     },
//     {
//       name: "",
//       render: () => (
//         <Popconfirm
//           title={t("page_title.role")}
//           description={
//             <div>
//               <span>{t("text.select_role")}:</span>
//               <MySelect
//                 options={options}
//                 name="roleId"
//                 control={control}
//                 errors={touchedFields.roleId && errors.roleId}
//                 loading={rolesPending}
//               />
//             </div>
//           }
//           // open={openPopconfirm === index}
//           // onConfirm={handleSubmit(onSubmit)}
//           onCancel={handleCancel}
//           okButtonProps={{ loading: approvePending, disabled: !isValid }}
//           okText={t("button.submit")}
//         >
//           {/* <Button
//             type="link"
//             size="small"
//             className="disabled:text-primary-light dark:disabled:text-gray-700"
//             disabled={+record.status === 0 ? false : true}
//             onClick={() =>
//               onAcceptHandler(record.userId, record.tenantProjectId, index)
//             }
//           >
//             {t("button.accept")}
//           </Button> */}
//         </Popconfirm>
//       ),
//     },
//   ]);

//   // const showPopconfirm = (index: number) => {
//   //   setOpenPopconfirm(index);
//   // };
//   // const onAcceptHandler = (
//   //   userId: number,
//   //   tenantProjectId: number,
//   //   index: number
//   // ) => {
//   //   reset();
//   //   showPopconfirm(index);
//   //   setUser({ userId: userId, tenantProjectId: tenantProjectId });
//   // };
//   const handleCancel = () => {
//     // setOpenPopconfirm(-1);
//   };
//   const onCloseHandler = () => {
//     setStep(0);
//   };
//   // const onSubmit: SubmitHandler<ApproveUserRequestModel> = (data) => {
//     // submitApproveUserRequest({
//     //   userId: user?.userId,
//     //   tenantProjectId: user?.tenantProjectId,
//     //   roleId: data.roleId,
//     // });
//   // };

//   return (
//     <>
//       <CreateUserInfo
//         isOpen={step === 1}
//         onCloseHandler={onCloseHandler}
//         refetchHandler={() => submitGetTenantUsers()}
//         userInfoIdHandler={setUserInfoId}
//         stepHandler={setStep}
//       />

//       <CreateTenantProjectUser
//         userInfoId={userInfoId ? userInfoId : null}
//         isOpen={step === 2}
//         onCloseHandler={onCloseHandler}
//         refetchHandler={() => submitGetTenantUsers()}
//         userInfoIdHandler={setUserInfoId}
//       />

//       <MyTable
//         columns={columns}
//         dataSource={data}
//         totalCount={data?.length}
//         pageSize={10}
//       />
//     </>
//   );
// };

// export default User;
