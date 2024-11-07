import { FC, useEffect, useState } from "react";
import { Popconfirm, Popover } from "antd";
import { MyTable } from "../../../../components/table";
import { generateColumns } from "../../../../helper/generate-columns";
import {
  useBreadcrumbStore,
  useContentLoadingStore,
  usePageTitleStore,
} from "../../../../zustand/stores";
import { useOutletContext } from "react-router-dom";
import { ButtonContext } from "../../../../types/button-context.interface";
import { generateDataToSend } from "../../../../helper/generate-data-to-send";
import { useGetAllPSPs, useGetPSPDetails, useUpdatePSP } from "./core/_request";
import { PSPModel } from "./core/_model";
import { Form } from "./components/form";
import { IconButton } from "../../../../components/inputs/icon-button";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Toast } from "../../../../helper/UI/toast";
import { t } from "i18next";
import { queryClient } from "../../../../lib/react-query";

const breadcrumbItems = [
  {
    title: t("page_title.dashboard"),
    href: "/dashboard",
  },
  { title: t("page_title.psp") },
];

const PSP: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommission, setIsCommission] = useState(false);
  const [openPopconfirm, setOpenPopconfirm] = useState<number>();
  const [editId, setEditId] = useState<number | null>(null);
  const [infoId, setInfoId] = useState<number>(0);
  const [data, setData] = useState<[]>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { setButtonProps } = useOutletContext<ButtonContext>();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { setPageTitle } = usePageTitleStore();
  const { setIsContentLoading } = useContentLoadingStore();
  const { data: PSPData, isPending, submitGetAllPSPs } = useGetAllPSPs();
  const { data: PSPInfo, isLoading: detailPending } = useGetPSPDetails(
    infoId && infoId,
    !!infoId
  );
  const { submitUpdatePSP, isPending: updatePending } = useUpdatePSP({
    onSuccess: () => {
      Toast("success");
      refetchHandler();
      handleCancel();
      setInfoId(0);
      queryClient.removeQueries({ queryKey: ["PSP_detail"] });
    },
  });

  useEffect(() => {
    setPageTitle(t("page_title.psp"));
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
    if (PSPData?.responseValue.length) {
      const data = PSPData?.responseValue.map(
        (
          psp: PSPModel & {
            taxOffice: { title: string };
          }
        ) => ({
          id: psp.id,
          Title: psp.title,
          Code: psp.code,
          Commission: psp.commission,
          taxId: psp.taxId,
          Address: psp.address,
          taxOffice: psp.taxOffice.title,
          isDeleted: psp.isDeleted,
        })
      );
      setData(data);
    }
  }, [PSPData]);
  useEffect(() => {
    if (PSPInfo) {
      infoId && submitUpdatePSP({ ...PSPInfo.responseValue, isDeleted: true });
    }
  }, [PSPInfo]);

  const columns = generateColumns([
    {
      name: t("table.title"),
      dataIndex: "Title",
    },
    {
      name: t("table.code"),
      dataIndex: "Code",
    },
    {
      name: t("table.commission"),
      dataIndex: "Commission",
    },
    {
      name: t("table.tax_id"),
      dataIndex: "taxId",
    },
    {
      name: t("table.tax_office"),
      dataIndex: "taxOffice",
      ellipsis: true,
    },
    {
      name: t("table.address"),
      dataIndex: "Address",
      ellipsis: true,
    },
    {
      name: t("table.action"),
      render: (name, record: { id: number; isDeleted: boolean }, index) => (
        <div className="flex gap-2 flex-col md:flex-row">
          {name}
          <IconButton
            iconType="edit"
            onClick={() => {
              setEditId(record.id);
              setIsModalOpen(true);
            }}
          />
          <Popover content={t("popover.deactivate")}>
            {""}
            <Popconfirm
              title={t("popconfirm.attention")}
              description={t("popconfirm.deactive")}
              open={openPopconfirm === index}
              onConfirm={() => setInfoId(record.id)}
              onCancel={handleCancel}
              okButtonProps={{ loading: detailPending || updatePending }}
              okText={t("button.deactivate")}
            >
              <IconButton
                iconType="deactivate"
                onClick={() => showPopconfirm(index)}
                disabled={record.isDeleted}
              />
            </Popconfirm>
          </Popover>
          <Popover content={t("popover.commission_set")}>
            {""}
            <IconButton
              icon={<RiMoneyDollarCircleLine size={22} />}
              onClick={() => {
                setIsCommission(true);
                setEditId(record.id);
                setIsModalOpen(true);
              }}
            />
          </Popover>
        </div>
      ),
    },
  ]);

  const refetchHandler = () => {
    submitGetAllPSPs(generateDataToSend([], "TaxOffice", pageNumber, pageSize));
  };
  const showPopconfirm = (index: number) => {
    setOpenPopconfirm(index);
  };
  const handleCancel = () => {
    setOpenPopconfirm(-1);
  };
  const onCloseHandler = () => {
    isCommission && setIsCommission(false);
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
          isCommission={isCommission}
          setCommission={setIsCommission}
        />
      )}

      <MyTable
        columns={columns}
        dataSource={data}
        totalCount={PSPData?.totalCount}
        pageSize={pageSize}
        onChangeHandler={(page) => {
          setPageNumber(page?.current!);
          setPageSize(page?.pageSize!);
        }}
        searchColumn={t("table.title")}
      />
    </>
  );
};

export default PSP;
