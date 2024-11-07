// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { MyModal } from "../../../../../components/modals";
// import { ModalProps } from "../../../../../types/modal.type";
// import { TextInput } from "../../../../../components/form-inputs/text-input";
// import { Toast } from "../../../../../helper/UI/toast";
// import { MySelect } from "../../../../../components/inputs/select";
// import { SelectOption } from "../../../../../types/select.type";
// import { generateDataToSend } from "../../../../../helper/generate-data-to-send";
// import { convertToSelectOption } from "../../../../../helper/convert-to-select-option";
// import { Spinner } from "../../../../../components/UI/spinner";
// import { Button } from "antd";
// import { queryClient } from "../../../../../lib/react-query";
// import * as yup from "yup";
// import { t } from "i18next";
// import {
//   useCreateWebsite,
//   useGetAllPSPs,
//   useGetWebsiteDetails,
//   useUpdateWebsite,
// } from "../core/_request";
// import { WebsiteInputs } from "../core/_model";

// type CreateProps = ModalProps & {
//   editId?: number | null;
//   resetEditId?: Dispatch<SetStateAction<number | null>>;
// };

// export const Form = ({
//   isOpen,
//   editId,
//   resetEditId,
//   onCloseHandler,
//   refetchHandler,
// }: CreateProps) => {
//   const [options, setOptions] = useState<SelectOption[]>([]);

//   const {
//     submitGetAllPSPs,
//     isPending: PSPPending,
//     data: PSPData,
//   } = useGetAllPSPs();
//   const { submitCreateWebsite, isPending: createPending } = useCreateWebsite({
//     onSuccess: () => {
//       Toast("success");
//       onCloseHandler();
//       refetchHandler && refetchHandler();
//     },
//   });
//   const { submitUpdateWebsite, isPending: updatePending } = useUpdateWebsite({
//     onSuccess: () => {
//       Toast("success");
//       resetEditId && resetEditId(null);
//       onCloseHandler();
//       refetchHandler && refetchHandler();
//     },
//   });
//   const { data: editData, isPending: fetchPending } = useGetWebsiteDetails(
//     editId ? editId : 0,
//     !!editId
//   );

//   useEffect(() => {
//     return () => {
//       queryClient.removeQueries({ queryKey: ["Website_detail"] });
//       reset();
//     };
//   }, []);
//   useEffect(() => {
//     if (isOpen) {
//       reset();
//       submitGetAllPSPs(generateDataToSend(null));
//     }
//   }, [isOpen]);
//   useEffect(() => {
//     if (PSPData?.totalCount) {
//       const options = convertToSelectOption(PSPData.responseValue);
//       options && setOptions(options);
//     }
//   }, [PSPData]);
//   useEffect(() => {
//     if (editData?.responseValue) {
//       reset(editData.responseValue);
//     }
//   }, [editData]);

//   const schema = yup.object().shape({
//     id: yup.number(),
//     pspid: yup
//       .number()
//       .required(t("error.is_required", { name: t("input.psp.label") })),
//     title: yup
//       .string()
//       .required(t("error.is_required", { name: t("input.title.label") })),
//     siteUrl: yup
//       .string()
//       .required(t("error.is_required", { name: t("input.url.label") })),
//   });

//   const {
//     register,
//     reset,
//     handleSubmit,
//     control,
//     formState: { errors, touchedFields, isValid },
//   } = useForm<WebsiteInputs>({
//     defaultValues: {
//       id: editId ? editId : undefined,
//     },
//     resolver: yupResolver(schema),
//     mode: "all",
//   });

//   const onSubmit: SubmitHandler<WebsiteInputs> = (data) => {
//     editId ? submitUpdateWebsite(data) : submitCreateWebsite(data);
//   };
//   const closeHandler = () => {
//     resetEditId && resetEditId(null);
//     onCloseHandler();
//   };

//   const modalFooter = (
//     <div className="flex gap-x-3 justify-end">
//       <Button title={t("button.discard")} onClick={closeHandler}>
//         {t("button.discard")}
//       </Button>
//       <Button
//         type="primary"
//         htmlType="submit"
//         onClick={handleSubmit(onSubmit)}
//         loading={createPending || updatePending}
//         disabled={!isValid}
//       >
//         {editId ? t("button.save") : t("button.create")}
//       </Button>
//     </div>
//   );

//   return (
//     <MyModal
//       title={t("page_title.psp")}
//       modalOpen={isOpen}
//       modalCloseHandler={closeHandler}
//       footer={modalFooter}
//     >
//       {editId && fetchPending && (
//         <div className="text-center">
//           <Spinner />
//         </div>
//       )}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="md:p-10 mb-10 flex flex-col"
//       >
//         <div className="mt-4 flex sm:flex-row flex-col gap-y-4 gap-x-5">
//           <div className="sm:w-1/2">
//             <TextInput<WebsiteInputs>
//               name="title"
//               label={t("input.title.label")}
//               placeholder={t("input.title.placeholder")}
//               register={register}
//               errors={touchedFields.title && errors.title}
//               control={control}
//               required
//             />
//           </div>

//           <div className="sm:w-1/2">
//             <TextInput<WebsiteInputs>
//               name="siteUrl"
//               label={t("input.url.label")}
//               placeholder={t("input.url.placeholder")}
//               register={register}
//               errors={touchedFields.siteUrl && errors.siteUrl}
//               control={control}
//               required
//             />
//           </div>
//         </div>

//         <div className="mt-4 flex sm:flex-row flex-col gap-y-4 gap-x-5">
//           <div className="sm:w-1/2">
//             <MySelect
//               name="pspid"
//               label={t("input.psp.label")}
//               errors={touchedFields.pspid && errors.pspid}
//               control={control}
//               options={options}
//               loading={PSPPending}
//               required
//             />
//           </div>
//         </div>
//       </form>
//     </MyModal>
//   );
// };
