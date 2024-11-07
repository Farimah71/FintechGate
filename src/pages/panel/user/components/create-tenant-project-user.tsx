// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { MyModal } from "../../../../components/modals";
// import { ModalProps } from "../../../../types/modal.type";
// import { MySelect } from "../../../../components/inputs/select";
// import { TenantProjectUserModel } from "../core/_model";
// import { generateDataToSend } from "../../../../helper/generate-data-to-send";
// import { convertToSelectOption } from "../../../../helper/convert-to-select-option";
// import {
//   useCreateTenantProjectUser,
//   useGetTenantProjects,
//   useGetUserDetails,
// } from "../core/_request";
// import { SelectOption } from "../../../../types/select.type";
// import { Toast } from "../../../../helper/UI/toast";
// import { Button } from "antd";
// import * as yup from "yup";
// import { t } from "i18next";

// type OptionsType = {
//   tenantProjects: Array<SelectOption>;
// };
// type CreateTenantProjectUserProps = ModalProps & {
//   userInfoId: number | null;
//   userInfoIdHandler: Dispatch<SetStateAction<number | null>>;
// };

// export const CreateTenantProjectUser = ({
//   userInfoId,
//   isOpen,
//   refetchHandler,
//   onCloseHandler,
//   userInfoIdHandler,
// }: CreateTenantProjectUserProps) => {
//   const [options, setOptions] = useState<OptionsType>({
//     tenantProjects: [],
//   });

//   const tenantId = localStorage.getItem("accounting__sel_tenant");

//   const {
//     submitGetTenantProjects,
//     isPending: tenantProjectsPending,
//     tenantProjectData,
//   } = useGetTenantProjects();
//   const { submitGetUserDetails, data: userDetailsData } = useGetUserDetails();
//   const { submitCreateTenantProjectUser, isPending } =
//     useCreateTenantProjectUser({
//       onSuccess: () => {
//         refetchHandler && refetchHandler();
//         onCloseHandler();
//         Toast("success");
//         userInfoIdHandler(null);
//       },
//     });

//   useEffect(() => {
//     if (isOpen) {
//       reset();
//       submitGetUserDetails(userInfoId!);
//       submitGetTenantProjects(
//         generateDataToSend(
//           [
//             {
//               property: "TenantId",
//               operation: 5,
//               values: [`${tenantId}`],
//             },
//           ],
//           "ProjectPacket.Project"
//         )
//       );
//     }
//   }, [isOpen]);
//   useEffect(() => {
//     if (tenantProjectData?.responseValue) {
//       const formattedTenantProject = tenantProjectData.responseValue.map(
//         (item: {
//           id: number;
//           projectPacket: { project: { title: string } };
//         }) => ({
//           id: item.id,
//           title: item.projectPacket.project.title,
//         })
//       );
//       const tenantProjectsOption = convertToSelectOption(
//         formattedTenantProject
//       );
//       tenantProjectsOption &&
//         setOptions((prev) => ({
//           ...prev,
//           tenantProjects: tenantProjectsOption,
//         }));
//     }
//   }, [tenantProjectData]);

//   const schema = yup.object().shape({
//     userInfoId: yup.number().required().nullable(),
//     tenantProjectId: yup
//       .number()
//       .required(t("error.is_required", { name: t("input.project.label") })),
//     roleId: yup
//       .number()
//       .required(t("error.is_required", { name: t("input.role.label") })),
//     status: yup.number().required(),
//   });

//   const {
//     reset,
//     handleSubmit,
//     control,
//     formState: { errors, touchedFields, isValid },
//   } = useForm<TenantProjectUserModel>({
//     defaultValues: { status: 1, userInfoId: 0, roleId: 0 },
//     resolver: yupResolver(schema),
//     mode: "all",
//   });

//   const onSubmit: SubmitHandler<TenantProjectUserModel> = (data) => {
//     submitCreateTenantProjectUser({ ...data, userInfoId: userInfoId });
//   };
//   const closeHandler = () => {
//     reset();
//     onCloseHandler();
//   };

//   const modalFooter = (
//     <div className="flex gap-x-3 justify-end">
//       <Button onClick={closeHandler}>{t("button.discard")}</Button>
//       <Button
//         type="primary"
//         htmlType="submit"
//         disabled={!isValid}
//         loading={isPending}
//         onClick={handleSubmit(onSubmit)}
//       >
//         {t("button.add")}
//       </Button>
//     </div>
//   );

//   return (
//     <MyModal
//       title={t("page_title.tenant_project_user")}
//       modalOpen={isOpen}
//       okButtonDisabled={!isValid}
//       modalCloseHandler={closeHandler}
//       footer={modalFooter}
//     >
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="md:p-10 mt-10 md:mt-0 mb-10 flex flex-col"
//       >
//         {userDetailsData && userDetailsData.responseValue && (
//           <div className="flex flex-col gap-y-3 md:flex-row gap-x-3 justify-center">
//             <span className="w-fit text-xs md:text-sm rounded-full bg-info/50 text-info-active dark:text-info-light/50 px-2 py-1 md:p-3">
//               <span className="text-gray-300 dark:text-info-light/30">
//                 {t("text.name")}:{" "}
//               </span>
//               {userDetailsData.responseValue.name}{" "}
//               {userDetailsData.responseValue.surname}
//             </span>
//             <span className="w-fit text-xs md:text-sm break-all rounded-full bg-info/50 text-info-active dark:text-info-light/50 px-2 py-1 md:p-3">
//               <span className="text-gray-300 dark:text-info-light/30">
//                 {t("text.email")}:{" "}
//               </span>
//               {userDetailsData.responseValue.email}
//             </span>
//             <span className="w-fit text-xs md:text-sm rounded-full bg-info/50 text-info-active dark:text-info-light/50 px-2 py-1 md:p-3">
//               <span className="text-gray-300 dark:text-info-light/30">
//                 {t("text.phone")}:{" "}
//               </span>
//               {userDetailsData.responseValue.phoneNumber}
//             </span>
//           </div>
//         )}
//         <div className="mt-10 flex sm:flex-row flex-col gap-y-10 gap-x-5">
//           <div className="w-full">
//             <MySelect
//               name="tenantProjectId"
//               label={t("input.project.label")}
//               errors={touchedFields.tenantProjectId && errors.tenantProjectId}
//               control={control}
//               options={options.tenantProjects}
//               loading={tenantProjectsPending}
//               required
//             />
//           </div>
//         </div>
//       </form>
//     </MyModal>
//   );
// };
