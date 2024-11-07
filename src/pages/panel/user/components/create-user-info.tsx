// import {
//   Dispatch,
//   SetStateAction,
//   useCallback,
//   useEffect,
//   useState,
// } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { MyModal } from "../../../../components/modals";
// import { ModalProps } from "../../../../types/modal.type";
// import { TextInput } from "../../../../components/form-inputs/text-input";
// // import { useCreateUserInfo, useGetAllUserInfos } from "../core/_request";
// import { Loading } from "../../../../components/UI/loading";
// import { generateDataToSend } from "../../../../helper/generate-data-to-send";
// import { queryClient } from "../../../../lib/react-query";
// import { UserInfoInputs } from "../core/_model";
// import { debounce } from "lodash";
// import { Button } from "antd";
// import * as yup from "yup";
// import { t } from "i18next";

// type CreateUserInfoProps = ModalProps & {
//   userInfoIdHandler: Dispatch<SetStateAction<number | null>>;
//   stepHandler: Dispatch<SetStateAction<number>>;
// };

// export const CreateUserInfo = ({
//   isOpen,
//   onCloseHandler,
//   userInfoIdHandler,
//   stepHandler,
// }: CreateUserInfoProps) => {
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [phoneValue, setPhoneValue] = useState("");

//   // const {
//   //   submitGetAllUserInfos,
//   //   data: userInfoData,
//   //   isPending: searchPhonePending,
//   // } = useGetAllUserInfos();
//   // const { submitCreateUserInfo, isPending: createUserInfoPending } =
//   //   useCreateUserInfo({
//   //     // onSuccess: (response) => {
//   //     //   userInfoIdHandler(response.entity);
//   //     //   closeHandler();
//   //     //   stepHandler(2);
//   //     // },
//   //   });

//   const debouncedPhoneSearch = useCallback(
//     debounce((phone) => {
//       submitGetAllUserInfos(
//         generateDataToSend([
//           {
//             property: "PhoneNumber",
//             operation: 7,
//             values: [phone],
//           },
//         ])
//       );
//     }, 2000),
//     []
//   );

//   useEffect(() => {
//     if (isOpen) {
//       reset();
//       setIsDisabled(true);
//     }
//     !isOpen && reset({phoneNumber:""})
//   }, [isOpen]);
//   useEffect(() => {
//     if (isOpen && phoneValue?.length >= 7) {
//       debouncedPhoneSearch(phoneValue);
//     }
//     setIsDisabled(true);
//   }, [phoneValue, debouncedPhoneSearch]);
//   useEffect(() => {
//     if (userInfoData?.responseValue.length) {
//       reset(userInfoData.responseValue[0]);
//       setIsDisabled(true);
//     } else if (!userInfoData?.responseValue.length) {
//       reset({
//         phoneNumber: phoneValue,
//         name: "",
//         surname: "",
//         email: "",
//         isActive: true,
//         isOwner: false,
//         otpcode: "",
//         avatar: "",
//         userKey: "6fd97eb9-d638-4a40-8e8f-9feb8efddd39",
//         password: "",
//       });
//       setIsDisabled(false);
//     }
//   }, [userInfoData]);

//   const schema = yup.object().shape({
//     phoneNumber: yup
//       .string()
//       .matches(/^\+?(0?)([1-9]{1})([0-9]{1,2})?([0-9]{9})$/, {
//         message: t("error.valid_phone"),
//         excludeEmptyString: false,
//       })
//       .required(t("error.is_required", { name: t("input.phone.label") })),
//     email: yup
//       .string()
//       .matches(
//         /^(?=.{8,50}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
//         t("error.email_format")
//       )
//       .required(t("error.is_required", { name: t("input.email.label") })),
//     name: yup
//       .string()
//       .min(3, `${t("error.min")} 3 ${t("error.symbols")}`)
//       .max(50, `${t("error.max")} 50 ${t("error.symbols")}`)
//       .required(t("error.is_required", { name: t("input.firstName.label") })),
//     surname: yup
//       .string()
//       .min(3, `${t("error.min")} 3 ${t("error.symbols")}`)
//       .max(50, `${t("error.max")} 50 ${t("error.symbols")}`)
//       .required(t("error.is_required", { name: t("input.surname.label") })),
//     userKey: yup.string(),
//     isActive: yup.boolean(),
//     isOwner: yup.boolean(),
//     password: yup.string(),
//     otpcode: yup.string(),
//     avatar: yup.string(),
//   });

//   const {
//     register,
//     reset,
//     handleSubmit,
//     control,
//     formState: { errors, touchedFields, isValid },
//   } = useForm<UserInfoInputs>({
//     defaultValues: {
//       isActive: true,
//       isOwner: false,
//       otpcode: "",
//       avatar: "",
//       userKey: "6fd97eb9-d638-4a40-8e8f-9feb8efddd39",
//       password: "",
//     },
//     resolver: yupResolver(schema),
//     mode: "all",
//   });

//   const onSubmit: SubmitHandler<UserInfoInputs> = (data) => {
//     submitCreateUserInfo(data);
//   };
//   const nextStepHandler = () => {
//     if (userInfoData?.responseValue.length) {
//       stepHandler(2);
//       userInfoIdHandler(userInfoData.responseValue[0].id);
//     }
//   };
//   const closeHandler = () => {
//     reset({ phoneNumber: "", name: "", surname: "", email: "" });
//     setPhoneValue("");
//     queryClient.clear();
//     onCloseHandler();
//   };

//   const modalFooter = (
//     <div className="flex gap-x-3 justify-end">
//       <Button onClick={closeHandler}>{t("button.discard")}</Button>
//       <Button
//         type="primary"
//         htmlType={userInfoData?.responseValue.length ? "button" : "submit"}
//         disabled={userInfoData?.responseValue.length === 1 ? false : !isValid}
//         loading={createUserInfoPending}
//         onClick={() =>
//           userInfoData?.responseValue.length === 1
//             ? nextStepHandler()
//             : userInfoData?.responseValue.length === 0
//             ? handleSubmit(onSubmit)()
//             : undefined
//         }
//       >
//         {t("button.add")}
//       </Button>
//     </div>
//   );

//   return (
//     <MyModal
//       title={t("page_title.user")}
//       modalOpen={isOpen}
//       okButtonDisabled={!isValid}
//       modalCloseHandler={closeHandler}
//       footer={modalFooter}
//     >
//       {searchPhonePending && (
//         <div className="w-fit mx-auto">
//           <Loading />
//         </div>
//       )}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="p-10 mb-10 flex flex-col"
//       >
//         <div className="mt-10 flex sm:flex-row flex-col gap-y-10 gap-x-5">
//           <div className="w-full">
//             <TextInput<UserInfoInputs>
//               name="phoneNumber"
//               label={t("input.phone_number.label")}
//               placeholder={t("input.phone_number.placeholder")}
//               register={register}
//               errors={touchedFields.phoneNumber && errors.phoneNumber}
//               control={control}
//               required
//               onChangeHandler={(e) => setPhoneValue(e.target.value)}
//             />
//           </div>

//           <div className="w-full">
//             <TextInput<UserInfoInputs>
//               name="email"
//               label={t("input.email.label")}
//               placeholder={t("input.email.label")}
//               register={register}
//               errors={touchedFields.email && errors.email}
//               control={control}
//               disabled={isDisabled}
//               required
//             />
//           </div>
//         </div>

//         <div className="my-10 flex sm:flex-row gap-x-5 flex-col gap-y-10">
//           <div className="w-full">
//             <TextInput<UserInfoInputs>
//               name="name"
//               label={t("input.firstName.label")}
//               placeholder={t("input.firstName.placeholder")}
//               register={register}
//               errors={touchedFields.name && errors.name}
//               control={control}
//               disabled={isDisabled}
//               required
//             />
//           </div>
//           <div className="w-full">
//             <TextInput<UserInfoInputs>
//               name="surname"
//               label={t("input.surname.label")}
//               placeholder={t("input.surname.placeholder")}
//               register={register}
//               errors={touchedFields.surname && errors.surname}
//               control={control}
//               disabled={isDisabled}
//               required
//             />
//           </div>
//         </div>
//       </form>
//     </MyModal>
//   );
// };
