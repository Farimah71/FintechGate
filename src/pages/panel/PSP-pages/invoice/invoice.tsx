import { FC, useEffect, useState } from "react";
import { Popconfirm, Tag } from "antd";
import { MyTable } from "../../../../components/table";
import { generateColumns } from "../../../../helper/generate-columns";
import {
  useBreadcrumbStore,
  useContentLoadingStore,
  usePageTitleStore,
} from "../../../../zustand/stores";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useOutletContext } from "react-router-dom";
import { ButtonContext } from "../../../../types/button-context.interface";
// import { SubmitHandler, useForm } from "react-hook-form";
import { generateDataToSend } from "../../../../helper/generate-data-to-send";
// import { Toast } from "../../../../helper/UI/toast";
import { useGetAllInvoice } from "./core/_request";
import { InvoiceModel } from "./core/_model";
import { Form } from "./components/form";
import { IconButton } from "../../../../components/inputs/icon-button";
// import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import * as yup from "yup";
import { t } from "i18next";

const breadcrumbItems = [
  {
    title: t("page_title.dashboard"),
    href: "/dashboard",
  },
  { title: t("page_title.invoice") },
];

const Invoice: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPopconfirm, setOpenPopconfirm] = useState<number>();
  // const [editId, setEditId] = useState<number | null>(null);
  const [data, setData] = useState<[]>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { setButtonProps } = useOutletContext<ButtonContext>();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { setPageTitle } = usePageTitleStore();
  const { setIsContentLoading } = useContentLoadingStore();
  const {
    data: InvoiceData,
    isPending,
    submitGetAllInvoice,
  } = useGetAllInvoice();

  useEffect(() => {
    setPageTitle(t("page_title.invoice"));
    setBreadcrumbItems(breadcrumbItems);
    setButtonProps({
      title: t("button.new"),
      visible: true,
      clickHandler: () => setIsModalOpen(true),
    });

    return () => setButtonProps({ title: "", visible: false });
  }, []);
  useEffect(() => {
    setIsContentLoading(isPending);
  }, [isPending]);
  useEffect(() => {
    refetchHandler();
  }, [pageNumber, pageSize]);
  useEffect(() => {
    if (InvoiceData?.responseValue.length) {
      const data = InvoiceData?.responseValue.map(
        (invoice: InvoiceModel & { psp: { title: string } }) => ({
          id: invoice.id,
          invoiceNo: invoice.invoiceNo,
          totalAmount: invoice.totalAmount?.toFixed(2),
          invoiceDate: invoice.invoiceDate,
          status: invoice.status,
          psp: invoice.psp?.title,
        })
      );
      setData(data);
    }
  }, [InvoiceData]);

  const columns = generateColumns([
    {
      name: t("table.invoiceNumber"),
      dataIndex: "invoiceNo",
    },
    {
      name: t("table.totalAmount"),
      dataIndex: "totalAmount",
    },
    {
      name: t("table.invoiceDate"),
      dataIndex: "invoiceDate",
    },
    {
      name: t("table.psp"),
      dataIndex: "psp",
    },
    {
      name: t("table.status"),
      render: (name, record: { status: number }) => {
        {
          name;
        }
        switch (record.status) {
          case 0: {
            return <Tag color="green">Created</Tag>;
          }
          case 1: {
            return <Tag color="orange">Printed</Tag>;
          }
          case 2: {
            return <Tag color="blue">Paid</Tag>;
          }
          case 3: {
            return <Tag color="red">Canceled</Tag>;
          }
        }
      },
    },
    {
      name: t("table.action"),
      render: (name, index) => (
        <div className="flex gap-2 flex-col md:flex-row">
          {name}
          <Popconfirm
            title={t("popconfirm.attention")}
            description={t("popconfirm.cancel")}
            open={openPopconfirm === index}
            // onConfirm={() => console.log("cancel")}
            onCancel={handleCancel}
            okText={t("button.cancel_popconfirm")}
          >
            <IconButton
              iconType="cancel"
              onClick={() => {
                showPopconfirm(index);
              }}
            />
          </Popconfirm>
          <IconButton iconType="print" onClick={() => {}} />
        </div>
      ),
    },
  ]);

  const refetchHandler = () => {
    submitGetAllInvoice(generateDataToSend([], "Psp", pageNumber, pageSize));
  };
  const showPopconfirm = (index: number) => {
    setOpenPopconfirm(index);
  };
  const handleCancel = () => {
    setOpenPopconfirm(-1);
  };
  const onCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Form
          isOpen={isModalOpen}
          onCloseHandler={onCloseHandler}
          refetchHandler={refetchHandler}
        />
      )}

      <MyTable
        columns={columns}
        dataSource={data}
        totalCount={InvoiceData?.totalCount}
        pageSize={pageSize}
        onChangeHandler={(page) => {
          setPageNumber(page?.current!);
          setPageSize(page?.pageSize!);
        }}
        searchColumn={t("table.search.invoice_number")}
      />
    </>
  );
};

export default Invoice;
