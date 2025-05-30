import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CopyIcon, QrCodeIcon } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useClipboard } from "@custom-react-hooks/use-clipboard";
import QrCode from "@/components/qrcode";
import { extractNameFromConfigURL } from "@/lib/utils";
import { TypeNumber } from "styled-qr-code";

interface ConfigsTabProps {
  data: string;
}

const ConfigsTab = ({ data }: ConfigsTabProps) => {
  const { t } = useTranslation();

  const { copyToClipboard } = useClipboard();

  const handleCopyToClipboard = async (config: string) => {
    await copyToClipboard(config);
    toast.success(t("linkCopied"));
  };

  return (
    <TabsContent value="configs">
      <ScrollArea className="h-[270px] overflow-y-auto">
        {data?.split("\n")?.map((config, index) => (
          <div
            className="my-3 flex cursor-default flex-row justify-between rounded-2xl bg-neutral-100 px-3 py-2 hover:bg-neutral-100 dark:bg-neutral-800 hover:dark:bg-neutral-600"
            key={config + index}
          >
            <h4 className="flex max-w-50 items-center truncate font-normal text-wrap md:max-w-60 lg:max-w-80">
              {extractNameFromConfigURL(config) || "Unknown"}
            </h4>
            <div className="me-1 flex items-center">
              <Button
                className="cursor-pointer"
                size="icon"
                onClick={() => handleCopyToClipboard(config)}
              >
                <CopyIcon />
              </Button>
              <QrCode
                link={config}
                title={extractNameFromConfigURL(config) ?? "Unknown"}
                trigger={
                  <Button className="ms-2 cursor-pointer" size="icon">
                    <QrCodeIcon />
                  </Button>
                }
                typeNumber={
                  Math.max(
                    15,
                    Math.ceil(config?.length / 100 + 11)
                  ) as TypeNumber
                }
              />
            </div>
          </div>
        ))}
      </ScrollArea>
    </TabsContent>
  );
};

export default ConfigsTab;