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
import { WebsiteModel } from "./core/_model";
import { Form } from "./components/form";
import { IconButton } from "../../../../components/inputs/icon-button";
import { Toast } from "../../../../helper/UI/toast";
import {
  useGetAllWebsites,
  useGetWebsiteDetails,
  useUpdateWebsite,
} from "./core/_request";
import { t } from "i18next";
import { queryClient } from "../../../../lib/react-query";

const breadcrumbItems = [
  {
    title: t("page_title.dashboard"),
    href: "/dashboard",
  },
  { title: t("page_title.website") },
];

const Website: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const {
    data: websiteData,
    isPending,
    submitGetAllWebsites,
  } = useGetAllWebsites();
  const { data: websiteInfo, isLoading: detailPending } = useGetWebsiteDetails(
    infoId && infoId,
    !!infoId
  );
  const { submitUpdateWebsite, isPending: updatePending } = useUpdateWebsite({
    onSuccess: () => {
      Toast("success");
      refetchHandler();
      handleCancel();
      setInfoId(0);
      queryClient.removeQueries({ queryKey: ["Website_detail"] });
    },
  });

  useEffect(() => {
    setPageTitle(t("page_title.website"));
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
    if (websiteData?.responseValue.length) {
      const data = websiteData?.responseValue.map(
        (site: WebsiteModel & { psp: { title: string } }) => ({
          id: site.id,
          Title: site.title,
          SiteUrl: site.siteUrl,
          PSP: site.psp.title,
          isDeleted: site.isDeleted,
        })
      );
      setData(data);
    }
  }, [websiteData]);
  useEffect(() => {
    if (websiteInfo) {
      infoId &&
        submitUpdateWebsite({ ...websiteInfo.responseValue, isDeleted: true });
    }
  }, [websiteInfo]);

  const columns = generateColumns([
    {
      name: t("table.title"),
      dataIndex: "Title",
    },
    {
      name: t("table.url"),
      dataIndex: "SiteUrl",
    },
    {
      name: t("table.psp"),
      dataIndex: "PSP",
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
        </div>
      ),
    },
  ]);

  const refetchHandler = () => {
    submitGetAllWebsites(generateDataToSend([], "Psp", pageNumber, pageSize));
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
        totalCount={websiteData?.totalCount}
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

export default Website;
