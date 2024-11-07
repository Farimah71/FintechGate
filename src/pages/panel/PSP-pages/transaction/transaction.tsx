import { FC, useEffect, useState } from "react";
// import { Popconfirm, Popover } from "antd";
import { MyTable } from "../../../../components/table";
import { generateColumns } from "../../../../helper/generate-columns";
import {
  useBreadcrumbStore,
  useContentLoadingStore,
  usePageTitleStore,
} from "../../../../zustand/stores";
import { generateDataToSend } from "../../../../helper/generate-data-to-send";
// import { IconButton } from "../../../../components/inputs/icon-button";
// import { Toast } from "../../../../helper/UI/toast";
import { useGetAllTransactions } from "./core/_request";
import { t } from "i18next";
import { TransactionModel } from "./core/_model";

const breadcrumbItems = [
  {
    title: t("page_title.dashboard"),
    href: "/dashboard",
  },
  { title: t("page_title.transaction") },
];

const Transaction: FC = () => {
  const [data, setData] = useState<[]>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { setPageTitle } = usePageTitleStore();
  const { setIsContentLoading } = useContentLoadingStore();
  const {
    data: transactionData,
    isPending,
    submitGetAllTransactions,
  } = useGetAllTransactions();

  useEffect(() => {
    setPageTitle(t("page_title.transaction"));
    setBreadcrumbItems(breadcrumbItems);
  }, []);
  useEffect(() => {
    setIsContentLoading(isPending);
  }, [isPending]);
  useEffect(() => {
    refetchHandler();
  }, [pageNumber, pageSize]);
  useEffect(() => {
    if (transactionData?.responseValue.length) {
      const data = transactionData?.responseValue.map(
        (
          transaction: TransactionModel & {
            psp: { title: string };
            integrator: { title: string };
            webSite: { title: string };
          }
        ) => ({
          id: transaction.id,
          psp: transaction.psp?.title,
          integrator: transaction.integrator?.title,
          website: transaction.webSite?.title,
          amount: transaction.amount,
          resultDetail: transaction.resultDetail,
        })
      );
      setData(data);
    }
  }, [transactionData]);

  const columns = generateColumns([
    {
      name: t("table.psp"),
      dataIndex: "psp",
    },
    {
      name: t("table.integrator"),
      dataIndex: "integrator",
    },
    {
      name: t("table.website"),
      dataIndex: "website",
    },
    {
      name: t("table.amount"),
      dataIndex: "amount",
    },
    {
      name: t("table.result_detail"),
      dataIndex: "resultDetail",
    },
    // {
    //   name: t("table.action"),
    //   render: (name, record: { id: number; isDeleted: boolean }, index) => (
    //     <div className="flex gap-2 flex-col md:flex-row">
    //       {name}
    //       {/* <IconButton
    //         iconType="edit"
    //         onClick={() => {
    //           setEditId(record.id);
    //           setIsModalOpen(true);
    //         }}
    //       />
    //       <Popover content={t("popover.deactivate")}>
    //         {""}
    //         <Popconfirm
    //           title={t("popconfirm.attention")}
    //           description={t("popconfirm.deactive")}
    //           open={openPopconfirm === index}
    //           onConfirm={() => setInfoId(record.id)}
    //           onCancel={handleCancel}
    //           okButtonProps={{ loading: detailPending || updatePending }}
    //           okText={t("button.deactivate")}
    //         >
    //           <IconButton
    //             iconType="deactivate"
    //             onClick={() => showPopconfirm(index)}
    //             disabled={record.isDeleted}
    //           />
    //         </Popconfirm>
    //       </Popover> */}
    //     </div>
    //   ),
    // },
  ]);

  const refetchHandler = () => {
    submitGetAllTransactions(
      generateDataToSend([], "Psp,Integrator,WebSite", pageNumber, pageSize)
    );
  };
  // const showPopconfirm = (index: number) => {
  //   setOpenPopconfirm(index);
  // };
  // const handleCancel = () => {
  //   setOpenPopconfirm(-1);
  // };

  return (
    <MyTable
      columns={columns}
      dataSource={data}
      totalCount={transactionData?.totalCount}
      pageSize={pageSize}
      onChangeHandler={(page) => {
        setPageNumber(page?.current!);
        setPageSize(page?.pageSize!);
      }}
      searchColumn={t("table.integrator")}
    />
  );
};

export default Transaction;
