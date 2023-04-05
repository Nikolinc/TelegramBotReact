import { useUnit } from "effector-react";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Params, useNavigate, useParams } from "react-router-dom";
import LoaderTransation from "../component/loaderTransation";
import { useTelegram } from "../hooks/useTelegram";
import { GlobalStore } from "../store";
import { ITransation, statusTransation } from "../types/transaction";

export default function Trancsation() {
  const { id } = useParams();
  const { Transaction, AddressStore } = GlobalStore();

  const wallet = useUnit(AddressStore.store);
  const tran: ITransation = useUnit(Transaction.store);
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onBack = useCallback(() => {
    navigate("/");
  }, []);

  let walet: any;
  let WalletHeader: string;
  let header: string;
  let color: string;
  let value: string;
  let FromTo: string = "";
  let myWallet: string;

  async function copyPageUrl(myWallet: string) {
    try {
      await navigator.clipboard.writeText(FromTo);
      tg.showAlert("Address copied");
    } catch (err) {
      tg.showAlert("Не удалось скопировать: " + err);
    }
  }

  if (tran.status === statusTransation.send) {
    walet = require("../assets/Send.svg");
    header = t("TransactionPage.SendTo");
    color = "#FF3A3A";
    value = `- ${tran.value}`;
    FromTo = tran.to;
    myWallet = tran.from;
    WalletHeader = t("TransactionPage.Recipient");
  } else {
    walet = require("../assets/Receiving.svg");
    header = t("TransactionPage.ReceivingFrom");
    color = "#00FCDE";
    value = `+ ${tran.value}`;
    FromTo = tran.from;
    myWallet = tran.to;
    WalletHeader = t("TransactionPage.SenderWallet");
  }

  useEffect(() => {
    tg.BackButton.show();
    AddressStore.event();
  }, []);

  useEffect(() => {
    Transaction.event({ id, wallet });
  }, [wallet]);

  useEffect(() => {
    tg.onEvent("backButtonClicked", onBack);
    return () => {
      tg.offEvent("backButtonClicked", onBack);
    };
  }, [onBack]);

  if (useUnit(Transaction.loader)) {
    return <LoaderTransation />;
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-col-1 mt-10 gap-6 w-[90%]">
        <div className=" h-[180px] bg-[var(--tg-theme-bg-color)] rounded-xl shadow-lg pb-8 w-full ">
          <div className="m-8 text-lg  font-medium leading-4 ">
            {tran.status === statusTransation.send ? (
              <svg
                width="67"
                height="50"
                viewBox="0 0 47 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.1875 32.0833V32.5833H3.6875H40.5625H41.0625V32.0833V27.0903H42.2833C42.8032 27.0903 43.2929 27.0474 43.75 26.9593V32.0833C43.75 32.676 43.479 33.2223 42.8336 33.7328C42.1886 34.243 41.4388 34.5 40.5625 34.5H3.6875C2.85723 34.5 2.11389 34.2459 1.44193 33.7288L1.13698 34.125L1.44192 33.7288C0.777275 33.2172 0.501414 32.673 0.500005 32.0878L0.821764 15.2968H3.1875V29.5069V32.0833ZM19 2.41667V0.5H40.5625C41.4353 0.5 42.1833 0.762883 42.8284 1.28728C43.484 1.82024 43.75 2.36167 43.75 2.91667V8.08629C43.2929 8.00018 42.8032 7.95833 42.2833 7.95833H41.0625V2.91667V2.41667H40.5625H30.3313H21.3313H19ZM44.75 9.45874C44.9483 9.55913 45.1303 9.67385 45.2967 9.80219C45.9845 10.3326 46.3313 11.0485 46.3313 12.0069V23.0417C46.3313 23.9625 45.9882 24.6752 45.2919 25.2259C45.1268 25.3565 44.9464 25.4733 44.75 25.5756V25.1181H44.25H40.5625H40.0625V25.6181V26.0903H34.3313H25.7027L25.2865 26.0685L24.8812 26.0473L24.4262 25.9796L23.9692 25.8708L23.6102 25.7499L23.2686 25.5985L22.9798 25.4358L22.6811 25.2251L22.4264 25.0007L22.2006 24.75L22.0179 24.4881L21.8691 24.2021L21.7601 23.9035L21.6834 23.5671L21.6662 23.4119L21.6484 23.2519L21.6417 22.8431V17.4514V12.0188L21.659 11.655L21.6812 11.5037L21.7031 11.3541L21.78 11.0544L21.8307 10.9215L21.8835 10.7831L21.9501 10.6466L22.0456 10.4828L22.237 10.2218L22.4364 10.0089L22.6765 9.80282L22.9667 9.60259L23.2614 9.44007L23.6079 9.29022L23.9406 9.17996L24.4046 9.07002L24.8234 9.00637L25.2764 8.96881L25.6958 8.95833H40.0625V9.43056V9.93056H40.5625H44.25H44.75V9.45874ZM43.1437 24.1736H43.6437V23.6736V11.375V10.875H43.1437H24.8292H24.3292V11.375V23.6736V24.1736H24.8292H43.1437ZM35.1205 19.271C34.4104 19.8327 33.6082 20.1111 32.6958 20.1111C31.7835 20.1111 30.9812 19.8327 30.2711 19.271C29.5642 18.7119 29.2625 18.1088 29.2625 17.4514C29.2625 16.8339 29.5568 16.2552 30.2662 15.7085C30.9762 15.1613 31.7801 14.8889 32.6958 14.8889C33.6115 14.8889 34.4155 15.1613 35.1255 15.7085C35.8349 16.2552 36.1292 16.8339 36.1292 17.4514C36.1292 18.1088 35.8274 18.7119 35.1205 19.271Z"
                  fill="#FF3A3A"
                  stroke="#FF3A3A"
                />
                <path d="M4 12L10.5 3L17 12H4Z" fill="#FF3A3A" />
              </svg>
            ) : (
              <svg
                width="67"
                height="50"
                viewBox="0 0 47 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.1875 33V33.5H3.6875H40.5625H41.0625V33V27.85H42.2833C42.8032 27.85 43.2929 27.806 43.75 27.7155V33C43.75 33.6206 43.4734 34.1872 42.8282 34.7121C42.1831 35.2369 41.4352 35.5 40.5625 35.5H3.6875C2.86091 35.5 2.11943 35.24 1.44731 34.708C0.782989 34.1821 0.501344 33.6177 0.500005 33.0044L0.822025 15.7196H3.1875V30.35V33ZM19 2.5V0.5H40.5625C41.4315 0.5 42.1777 0.768983 42.823 1.30858C43.4783 1.85646 43.75 2.41795 43.75 3V8.33136C43.2929 8.24298 42.8032 8.2 42.2833 8.2H41.0625V3V2.5H40.5625H30.3313H21.3313H19ZM44.75 10.2V9.71629C44.9462 9.81883 45.1264 9.93587 45.2914 10.0667C45.9802 10.6131 46.3313 11.3547 46.3313 12.35V23.7C46.3313 24.6567 45.9838 25.3949 45.2865 25.9621C45.1229 26.0953 44.9442 26.2145 44.75 26.319V25.85H44.25H40.5625H40.0625V26.35V26.85H34.3313H25.703L25.2873 26.8276L24.8826 26.8059L24.4287 26.7364L23.9729 26.6247L23.6146 26.5006L23.2737 26.3452L22.9851 26.1781L22.6865 25.9613L22.4314 25.7301L22.2047 25.4714L22.021 25.2005L21.8711 24.9041L21.7611 24.5941L21.6837 24.2451L21.6663 24.0839L21.6484 23.918L21.6417 23.496V17.95V12.3615L21.659 11.9853L21.6814 11.8283L21.7036 11.6731L21.7812 11.3621L21.8323 11.2241L21.8854 11.0809L21.9528 10.9389L22.0491 10.7691L22.2413 10.4994L22.4414 10.2797L22.6819 10.0674L22.972 9.86144L23.2664 9.69448L23.6124 9.5406L23.9442 9.42748L24.4072 9.31463L24.8251 9.24932L25.2771 9.21076L25.696 9.2H40.0625V9.7V10.2H40.5625H44.25H44.75ZM43.1437 24.85H43.6437V24.35V11.7V11.2H43.1437H24.8292H24.3292V11.7V24.35V24.85H24.8292H43.1437ZM35.1152 19.8371C34.4049 20.415 33.6045 20.7 32.6958 20.7C31.7872 20.7 30.9868 20.415 30.2765 19.8371C29.5698 19.2622 29.2625 18.6373 29.2625 17.95C29.2625 17.3035 29.5627 16.7038 30.2715 16.1418C30.9817 15.5789 31.7837 15.3 32.6958 15.3C33.6079 15.3 34.41 15.5789 35.1201 16.1418C35.829 16.7038 36.1292 17.3035 36.1292 17.95C36.1292 18.6373 35.8219 19.2622 35.1152 19.8371Z"
                  fill="#00FCDE"
                  stroke="#00FCDE"
                />
                <path d="M17 3L10.5 12L4 3L17 3Z" fill="#00FCDE" />
              </svg>
            )}

            <p className="my-4">{header}</p>
            <div className="text-sm font-light items-end text-[var(--tg-theme-hint-color)] ">
              {FromTo}
            </div>
          </div>
        </div>
        <div className="h-[130px] bg-[var(--tg-theme-bg-color)] rounded-xl shadow-lg  w-full">
          <div className="m-8 text-lg font-medium leading-4">
            <p className="text-[#D7D7D7] text-sm font-normal">
              {t("TransactionPage.NumberOfCoins")}
            </p>
            <p className="my-4">{value}</p>
          </div>
        </div>
        <div className="w-full h-[130px] bg-[var(--tg-theme-bg-color)] rounded-xl shadow-lg">
          <div className="m-8 text-lg font-medium leading-4">
            <p className="text-[#D7D7D7] text-sm font-normal">
              {t("TransactionPage.DataTime")}
            </p>
            <p className="my-4">{tran.timeStamp}</p>
          </div>
        </div>
        <div className=" w-full h-[130px] bg-[var(--tg-theme-bg-color)] rounded-xl shadow-lg">
          <div className="m-8 text-lg font-medium leading-4">
            <p className="text-[#D7D7D7] text-sm font-normal">
              {WalletHeader}:
            </p>
            <button
              className="font-normal text-[11.5px]  text-[var(--tg-theme-link-color)] my-4 "
              onClick={() => copyPageUrl(myWallet)}
            >
              {FromTo}
            </button>
          </div>
        </div>
        <div className=" w-full h-[130px] bg-[var(--tg-theme-bg-color)] rounded-xl shadow-lg">
          <div className="m-8 text-lg font-medium leading-4">
            <p className="text-[#D7D7D7] text-sm font-normal">
              {t("TransactionPage.Commission")}:
            </p>
            <p className="my-4">{tran.gas}</p>
          </div>
        </div>
        <div className=" w-full h-[130px] bg-[var(--tg-theme-bg-color)] rounded-xl shadow-lg">
          <div className="m-8 text-lg font-medium leading-4">
            <p className="text-[#D7D7D7] text-sm font-normal">
              {" "}
              {t("TransactionPage.NumberBlock")}
            </p>
            <p className="my-4">{tran.blockNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
