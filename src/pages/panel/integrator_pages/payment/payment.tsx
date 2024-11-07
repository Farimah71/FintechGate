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
import { useGetAllPayment } from "./core/_request";
import { PaymentModel } from "./core/_model";
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
  { title: t("page_title.payment") },
];

const Payment: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPopconfirm, setOpenPopconfirm] = useState<number>();
  const [editId, setEditId] = useState<number | null>(null);
  const [data, setData] = useState<[]>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { setButtonProps } = useOutletContext<ButtonContext>();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { setPageTitle } = usePageTitleStore();
  const { setIsContentLoading } = useContentLoadingStore();
  const {
    data: paymentData,
    isPending,
    submitGetAllPayment,
  } = useGetAllPayment();

  useEffect(() => {
    setPageTitle(t("page_title.payment"));
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
    if (paymentData?.responseValue.length) {
      const data = paymentData?.responseValue.map(
        (payment: PaymentModel & { integrator: { title: string } }) => ({
          id: payment.id,
          paymentNo: payment.paymentNo,
          totalAmount: payment.totalAmount?.toFixed(2),
          paymentDate: payment.paymentDate,
          status: payment.status,
          integrator: payment.integrator.title,
        })
      );
      setData(data);
    }
  }, [paymentData]);

  const columns = generateColumns([
    {
      name: t("table.paymentNumber"),
      dataIndex: "paymentNo",
    },
    {
      name: t("table.totalAmount"),
      dataIndex: "totalAmount",
    },
    {
      name: t("table.paymentDate"),
      dataIndex: "paymentDate",
    },
    {
      name: t("table.integrator"),
      dataIndex: "integrator",
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
            onConfirm={() => console.log("cancel")}
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
    submitGetAllPayment(
      generateDataToSend([], "Integrator", pageNumber, pageSize)
    );
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
          editId={editId}
          resetEditId={setEditId}
        />
      )}

      <MyTable
        columns={columns}
        dataSource={data}
        totalCount={paymentData?.totalCount}
        pageSize={pageSize}
        onChangeHandler={(page) => {
          setPageNumber(page?.current!);
          setPageSize(page?.pageSize!);
        }}
        searchColumn={t("table.search.payment_number")}
      />
    </>
  );
};

export default Payment;
