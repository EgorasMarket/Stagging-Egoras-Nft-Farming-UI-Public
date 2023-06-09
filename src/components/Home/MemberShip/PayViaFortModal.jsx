import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { GENERATE_QR_CODE_LINK } from "../../../services/generalServices";
import { socket } from "../../../socket";

const PayViaFortModal = ({
  togglePayViaFortDiv,
  message,
  code,
  data,
  account,
}) => {
  const [loading, setLoading] = useState(true);
  const [qr_link, setQrLink] = useState("");
  const [status, setStatus] = useState("");

  const listener = () => {
    const payload = {
      initiator: "web-app",
      user: account,
    };

    if (data.type === "membership") {
      socket.emit("subscribe_membership", payload);
      return;
    }
    if (data.type === "product") {
      socket.emit("make_payment", payload);
      return;
    }
  };
  const fetchShortCode = async () => {
    const res = await GENERATE_QR_CODE_LINK(data);
    console.log(res, "nabb");

    if (res.success) {
      setQrLink(res.data);
      setLoading(false);

      return;
    }
  };
  useEffect(() => {
    listener();
    if (data.type === "membership") {
      socket.on("membership", (data) => {
        // alert(data);
        if (data === 1) {
          alert("Payment made");
          setStatus("Payment made");
        } else {
          alert("Payment incompletee");
          setStatus("Payment failed couldn't complete payment");
        }
      });
    }

    if (data.type === "product") {
      socket.on("purchase-status", (data) => {
        // alert(data);
        if (data === 1) {
          alert("Payment made");
          setStatus("Payment made");
        } else {
          alert("Payment incompletee");
          setStatus("Payment failed couldn't complete payment");
        }
      });
    }

    // alert(JSON.stringify(data));
    //  call the api and generate a qr data
    fetchShortCode();
  }, []);
  const copyText = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied Code ";
    tooltip.style.display = "block";
  };
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
    tooltip.style.display = "none";
  }
  return (
    <div className="payViaFortDiv">
      <div
        className="payViaFortDiv_close_div"
        onClick={togglePayViaFortDiv}
      ></div>
      <div className="payViaFortDiv_area">
        <div className="payViaFortDiv_area_1">
          <QRCode quietZone={10} value={`${JSON.stringify(data)}`} />
          {/* <img
            src="/img/dummy_qrcode.png"
            alt=""
            className="payViaFortDiv_area_1_img"
          /> */}
        </div>
        <div className="payViaFortDiv_area_2">{message}</div>
        <div className="payViaFortDiv_area_3_input_div">
          <div className="payViaFortDiv_area_3">Or copy this code.</div>
          <div className="payViaFortDiv_area_3_input_cont">
            <input
              type="text"
              value={qr_link}
              className="payViaFortDiv_area_3_input_div_input"
              id="myInput"
            />
            <button
              className="payViaFortDiv_area_3_input_cont_btn"
              onClick={copyText}
              onMouseOut={outFunc}
            >
              Copy
              <span className="tooltiptext2" id="myTooltip"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayViaFortModal;
